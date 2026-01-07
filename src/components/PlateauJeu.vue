<script setup>
import CarteJeu from './CarteJeu.vue'

const props = defineProps({
  cartes: {
    type: Array,
    required: true
  },
  niveau: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['clicCarte'])

function surClicCarte(idCarte) {
  emit('clicCarte', idCarte)
}
</script>

<template>
  <div
    class="plateau"
    :style="{
      gridTemplateColumns: `repeat(${niveau}, 1fr)`
    }"
  >
    <CarteJeu
      v-for="carte in cartes"
      :key="carte.id"
      :carte="carte"
      @clic="surClicCarte"
    />
  </div>
</template>

<style scoped>
    .plateau {
    display: grid;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #2E8B57;
    border-radius: 15px;
    }
</style>
