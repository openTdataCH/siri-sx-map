<script setup lang="ts">
import { ref } from 'vue';

import MapComponent from './components/Map.vue';
import FilterComponent from './components/Filter.vue';
import { Language, TextSize } from './models/situation';
import Loading from './components/Loading.vue';
import type { FilterModel } from '@/models/utils';

// Default settings
const filterModel = readParams();
const language = ref<Language>(filterModel.lang);
const textSize = ref<TextSize>(filterModel.textSize);
const ownerRefs = ref<Array<string>>(filterModel.ownerRef);
const perspective = ref<string>(filterModel.perspective);
const mapZoom = ref<number>(filterModel.zoom <= 0 ? 8 : filterModel.zoom);
const mapCenter = ref<[number, number]>(filterModel.center.length === 2 ? filterModel.center : [46.8, 8.2]);
const onlyActive = ref<boolean>(filterModel.active);

// when setup show filter
const showFilter = window.location.pathname === '/setup';

function readParams(): FilterModel {
  const params = new URLSearchParams(window.location.search);
  return {
    lang: Language.fromString(params.get('lang')),
    textSize: TextSize.fromString(params.get('size')),
    ownerRef: (params.get('ownerRefs') || '').split(',').filter((s) => s),
    perspective: params.get('perspective') || '',
    zoom: Number(params.get('zoom')),
    center: (params.get('center') || '').split(',').map((l) => Number(l)) as [number, number],
    active: params.get('active') === '1',
  };
}

function openInNewWindow() {
  const url = new URL(window.location.origin);
  url.searchParams.set('lang', language.value.toString());
  url.searchParams.set('size', textSize.value.toString());
  url.searchParams.set('ownerRefs', ownerRefs.value.join(','));
  url.searchParams.set('perspective', perspective.value);
  url.searchParams.set('zoom', mapZoom.value.toString());
  url.searchParams.set('center', mapCenter.value.join(','));
  url.searchParams.set('active', onlyActive ? '1' : '0');
  window.open(url, '_blank');
}
</script>

<template>
  <main>
    <FilterComponent
      v-if="showFilter"
      v-model:language="language"
      v-model:text-size="textSize"
      v-model:owner-refs="ownerRefs"
      v-model:perspective="perspective"
      v-model:only-active="onlyActive"
      @create-situation-map="openInNewWindow"
    />
    <Suspense>
      <MapComponent
        :language="language"
        :text-size="textSize"
        :owner-refs="ownerRefs"
        :perspective="perspective"
        :only-active="onlyActive"
        v-model:zoom="mapZoom"
        v-model:center="mapCenter"
        class="map"
        :class="showFilter && 'withFilter'"
      />
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.map {
  height: 100vh;
}

.map.withFilter {
  height: calc(100vh - 30px - 1rem);
}
</style>
