<script setup lang="ts">
import type { Ref } from 'vue';
import { type PropType, reactive, ref, watchEffect } from 'vue';

import 'leaflet/dist/leaflet.css';

import { LGeoJson, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';

import { swissBorderGeoJson } from '@/assets/swiss.border.geo.json';
import LineComponent from '@/components/Line.vue';
import MarkerComponent from '@/components/Marker.vue';
import Loading from '@/components/Loading.vue';
import type { Language, Situation, TextSize } from '@/models/situation';
import { SiriService } from '@/services/siri.service';
import { Marker } from '@/models/marker';
import { DidokService } from '@/services/didok.service';
import type { DiDokRecord } from '@/models/didok';
import { OsmService } from '@/services/osm.service';
import { Line } from '@/models/line';
import { OperatorService } from '@/services/operator.service';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Timer } from '@/services/timer';

const props = defineProps({
  language: {
    type: String as PropType<Language>,
    required: true,
  },
  textSize: {
    type: String as PropType<TextSize>,
    required: true,
  },
  ownerRefs: {
    type: Object as PropType<Array<string>>,
    required: true,
  },
  perspective: {
    type: String,
    required: true,
  },
  zoom: {
    type: Number,
    required: true,
  },
  center: {
    type: Object as PropType<[number, number]>,
    required: true,
  },
  onlyActive: {
    type: Boolean,
    required: true,
  },
  onlyUnplanned: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits<{
  (event: 'update:center', center: PropType<[number, number]>): void;
  (event: 'update:zoom', zoom: number): void;
}>();

const timer = new Timer(() => loadMap(), 60 * 1000);

let stopPlaces = new Map<string, DiDokRecord>();
let cachedLines = new Map<string, FeatureCollection<Geometry, GeoJsonProperties>>();

const lines = reactive(new Map<string, Line>());
const markers = reactive(new Map<string, Marker>());

let situations: Ref<Situation[]> = ref([]);

const loading = ref(false);
let loadCall = 0;

async function loadMap() {
  loadCall++;
  let loadCallWhenStarted = loadCall;

  timer.stop();
  loading.value = true;

  try {
    situations.value = await SiriService.getSituations(props.language, props.textSize, props.ownerRefs, props.perspective, props.onlyActive, props.onlyUnplanned);
    if (situations.value.some((s) => s.affects.stopPlaces.length > 0)) {
      stopPlaces = await DidokService.load();
    }

    markers.clear();
    lines.clear();

    for (const situation of situations.value) {
      if (loadCall !== loadCallWhenStarted) {
        return;
      }
      // aggregate affected lines
      for (const affectedLine of situation.affects.lines) {
        if (loadCall !== loadCallWhenStarted) {
          return;
        }
        const line = lines.get(affectedLine.ref);

        if (!line) {
          try {
            const cachedItem = cachedLines.get(affectedLine.ref);
            const geoJson = cachedItem || (await OsmService.getLine(affectedLine.ref, affectedLine.name));

            if (geoJson.features.length <= 0) {
              console.warn(
                `OSM mapping not found for line | operator: ${affectedLine.ref.split(':')[1]} (${OperatorService.getName(affectedLine.ref)}), line ${
                  affectedLine.name
                }`,
                affectedLine
              );
              continue;
            }

            const line = new Line(affectedLine.ref, geoJson);
            line.situations = [situation];

            lines.set(line.ref, line);
            cachedLines.set(affectedLine.ref, geoJson);
          } catch (error) {
            console.error('failed to load line', error);
          }
        } else {
          line.situations.push(situation);
        }
      }

      // aggregate affected stop places
      for (const stopPlace of situation.affects.stopPlaces) {
        if (loadCall !== loadCallWhenStarted) {
          return;
        }
        const sloId = stopPlace.sloId;
        const marker = markers.get(sloId);

        if (!marker) {
          try {
            const record = stopPlaces.get(sloId);

            if (!record) {
              throw new Error(`record with id ${sloId} not found in DiDok result`);
            }

            const marker = new Marker(record);

            marker.situations.push(situation);

            markers.set(sloId, marker);
          } catch (e) {
            console.error(e);
          }
        } else {
          marker.situations.push(situation);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    timer.start();
  }
}

watchEffect(loadMap);

const attribution = '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
</script>

<template>
  <div>
    <Loading v-if="loading" />

    <LMap :center="center" :zoom="zoom" @update:zoom="emits('update:zoom', $event)" @update:center="emits('update:center', [$event.lat, $event.lng])">
      <LTileLayer :min-zoom="6" :max-zoom="18" :url="tile" :attribution="attribution"></LTileLayer>
      <LGeoJson
        :geojson="swissBorderGeoJson"
        :options="{
          style: {
            stroke: false,
            fillColor: 'black',
          },
        }"
      ></LGeoJson>

      <LineComponent v-for="line of lines.values()" :line="line" :key="line.ref" />

      <MarkerComponent v-for="marker of markers.values()" :marker="marker" :key="marker.sloId" />
    </LMap>
  </div>
</template>

<style>
.leaflet-control-container {
  height: 100%;
}
</style>
