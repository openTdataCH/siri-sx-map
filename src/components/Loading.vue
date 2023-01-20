<script setup lang="ts"></script>

<template>
  <div class="loading"></div>
</template>

<style scoped>
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
  z-index: 99999;
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
  box-shadow: red 1.5em 0 0 0, red 1.1em 1.1em 0 0, red 0 1.5em 0 0, red -1.1em 1.1em 0 0, red -1.5em 0 0 0, red -1.1em -1.1em 0 0, red 0 -1.5em 0 0,
    red 1.1em -1.1em 0 0;
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
