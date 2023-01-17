<script setup lang="ts">
import type { Situation } from '@/models/situation';
import { ref, type PropType } from 'vue';

const props = defineProps({
  situations: {
    type: Array as PropType<Situation[]>,
    required: true,
  },
});

const desanitize = (html: string): string => {
  let result = html.replace(/&gt;/g, '>')
  result = result.replace(/&lt;/g, '<')
  return result
}

const expanded = ref(false);
</script>

<template>
  <div v-for="(situation, i) in situations">
    <h3>
      {{ situation.information.summary }}
    </h3>
    <p>
      {{ situation.information.description }}
    </p>
    <p>
      {{ situation.information.duration }}
    </p>
    <p>
      {{ situation.information.reason }}
    </p>
    <p>
      {{ situation.information.consequence }}
    </p>
    <p>
      {{ situation.information.recommendation }}
    </p>
    <p>
      <a @click="expanded = !expanded" style="cursor: pointer;">{{ expanded ? '- Hide' : '+ Show' }} more info</a>
    </p>
    <p v-if="expanded" style="background: lightgray; padding: 5px; border-radius: 5px; font-family: monospace">
      Affects<br />
      Lines: {{ situation.affects.lines.map((l) => l.name).join(', ') }}<br />
      Places: {{ situation.affects.stopPlaces.map((p) => p.name).join(', ') }} <br />
      Priority: {{ situation.priority }} <br />
      <span v-if="situation.planned">Planned</span>
    </p>
    <span v-html="desanitize(situation.information.infoLink)"></span>
    <hr v-if="i !== situations.length - 1" style="margin-bottom: 15px" />
  </div>
</template>

<style>
.leaflet-popup-content-wrapper {
  max-height: 500px;
  overflow-y: auto;
}
</style>
