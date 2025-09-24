<script setup lang="ts">
import type { PropType } from 'vue';

import type { Language, TextSize } from '@/models/situation';
import OwnerRefInput from '@/components/OwnerRefInput.vue';

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
  (event: 'update:language', language: Language): void;
  (event: 'update:textSize', textSize: TextSize): void;
  (event: 'update:ownerRefs', ownerRef: Array<string>): void;
  (event: 'update:perspective', perspective: string): void;
  (event: 'update:onlyActive', activeOnly: boolean): void;
  (event: 'update:onlyUnplanned', unplannedOnly: boolean): void;
  (event: 'createSituationMap'): void;
}>();

const ownerRefs = new Set(props.ownerRefs);

const updateLanguage = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emits('update:language', value as Language);
};

const updateTextSize = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emits('update:textSize', value as TextSize);
};

const updateOwnerRefs = (ownerRefs: Set<string>) => {
  emits('update:ownerRefs', Array.from(ownerRefs));
};

const updatePrespective = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emits('update:perspective', value);
};

const updateOnlyActive = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked;
  emits('update:onlyActive', value);
};

const updateOnlyUnplanned = (event: Event) => {
  const value = (event.target as HTMLInputElement).checked;
  emits('update:onlyUnplanned', value);
};
</script>

<template>
  <form class="filter" @submit.prevent="">
    <label for="perspective">Perspective</label>
    <select name="perspective" id="perspective" :value="perspective" @change="updatePrespective($event)">
      <option value="">All</option>
      <option value="general">General</option>
      <option value="stopPoint">Stop Point</option>
      <option value="vehicleJourney">Vehicle Journey</option>
    </select>

    <label for="lang">Lang</label>
    <select name="lang" id="lang" :value="language" @change="updateLanguage($event)">
      <option value="DE">de</option>
      <option value="FR">fr</option>
      <option value="IT">it</option>
      <option value="EN">en</option>
    </select>

    <owner-ref-input :value="ownerRefs" @change="updateOwnerRefs($event)" />

    <label for="size">Size</label>
    <select name="size" id="size" :value="textSize" @change="updateTextSize($event)">
      <option value="S">Small</option>
      <option value="M">Medium</option>
      <option value="L">Large</option>
    </select>

    <label for="active">Active only</label>
    <input id="active" name="active" type="checkbox" :checked="onlyActive" @change="updateOnlyActive($event)" />

    <label for="unplanned">Unplanned only</label>
    <input id="unplanned" name="unplanned" type="checkbox" :checked="onlyUnplanned" @change="updateOnlyUnplanned($event)" />

    <input type="submit" value="Create Situation Map (new window)" @click="emits('createSituationMap')" />
  </form>
</template>

<style scoped>
.filter {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
  gap: 0.5rem;
}
</style>