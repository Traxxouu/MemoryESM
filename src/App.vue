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

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background-color: #87CEEB;
    color: #333;
    min-height: 100vh;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .contenu-principal {
    flex: 1;
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
  }
</style>
