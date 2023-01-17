<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  value: {
    type: Object as PropType<Set<string>>,
    required: true,
  },
});

const ownerRefs = ref<Set<string>>(props.value);

const emits = defineEmits<{
  (event: 'change', value: Set<string>): void;
}>();

const addOwner = (event: Event) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const ownerRef = (event.target as HTMLInputElement).value;
  ownerRefs.value.add(ownerRef);
  (event.target as HTMLInputElement).value = '';
  updateValue(ownerRefs.value);
};

const removeOwner = (ownerRef: string) => {
  ownerRefs.value.delete(ownerRef);
  updateValue(ownerRefs.value);
};

const updateValue = (value: Set<string>) => {
  emits('change', value);
};
</script>

<template>
  <label for="owner">Owner refs</label>
  <div class="custom-input">
    <div class="chips-container">
      <span class="chips" v-for="ownerRef of ownerRefs">
        {{ ownerRef }}
        <span class="close" @click="removeOwner(ownerRef)">✕</span>
      </span>
    </div>
    <input type="text" id="owner" @keydown.enter="addOwner($event)" />
  </div>
</template>

<style scoped>
.custom-input {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);
}

.custom-input .chips-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1rem
}

.custom-input .chips-container span.chips {
  display: inline-block;
  padding: 0 0.2rem;
  border-radius: 1rem;
  background-color: var(--color-background-mute);
  font-size: 12px;
}

.custom-input .chips-container .chips .close {
  cursor: pointer;
  display: inline-block;
  padding: 0 0.2rem;
}
</style>
