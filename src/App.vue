<script setup>
import EnteteApp from './components/EnteteApp.vue'
</script>

<template>
  <div id="app">
    <EnteteApp />
    <main class="contenu-principal">
      <RouterView />
    </main>
  </div>
</template>

