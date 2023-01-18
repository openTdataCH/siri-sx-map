<script setup lang="ts"></script>

<template>
  <div class="overlay">
    <div class="loading"></div>
  </div>
</template>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
}


.loading {
  position: fixed;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.loading:after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  box-shadow: var(--color-text) 1.5em 0 0 0, var(--color-text) 1.1em 1.1em 0 0, var(--color-text) 0 1.5em 0 0, var(--color-text) -1.1em 1.1em 0 0,
    var(--color-text) -1.5em 0 0 0, var(--color-text) -1.1em -1.1em 0 0, var(--color-text) 0 -1.5em 0 0, var(--color-text) 1.1em -1.1em 0 0;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
