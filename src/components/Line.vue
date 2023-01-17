<script setup lang="ts">
import type { PropType } from 'vue';
import { LGeoJson, LPopup } from '@vue-leaflet/vue-leaflet';

import type { Line } from '@/models/line';
import Situations from './Situations.vue';

const props = defineProps({
  line: {
    type: Object as PropType<Line>,
    required: true,
  },
});
</script>

<template>
  <LGeoJson :geojson="line.geoJson" :options="{color: line.getColor()}">
    <LPopup :options="{closeButton: false}">
      <Situations :situations="line.situations" />
    </LPopup>
  </LGeoJson>
</template>