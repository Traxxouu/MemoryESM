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
  gap: 12px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
