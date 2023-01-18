<script setup lang="ts">
import { LIcon, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import type { PropType } from 'vue';

import type { Marker } from '@/models/marker';
import Situations from './Situations.vue';

const props = defineProps({
  marker: {
    type: Object as PropType<Marker>,
    required: true,
  },
});

</script>
<template>
  <LMarker :key="marker.sloId" :lat-lng="marker.coordinates">
    <LIcon :icon-url="marker.getIcon()" :icon-size="[24, 27]"></LIcon>
    <LPopup :options="{closeButton: false}">
      <Situations :situations="marker.situations" />
    </LPopup>
  </LMarker>
</template>
