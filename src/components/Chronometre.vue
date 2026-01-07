<script setup>
// Composant chronomètre pour mesurer le temps de jeu
import { ref, onUnmounted } from 'vue'

// Props reçues du parent
const props = defineProps({
  enCours: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['tempsEcoule'])

// Variables réactives de la page 45 le diapo 03
const secondes = ref(0)
let intervalId = null

// Démarrer le chrono
function demarrer() {
  if (intervalId) return 
  
  intervalId = setInterval(() => {
    secondes.value++
    emit('tempsEcoule', secondes.value)
  }, 1000)
}

// Arrêter le chrono
function arreter() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Reset du chrono
function reset() {
  arreter()
  secondes.value = 0
}

//mettre le temps en minutes : secondes 
function formaterTemps(totalSecondes) {
  const minutes = Math.floor(totalSecondes / 60)
  const secs = totalSecondes % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

defineExpose({
  demarrer,
  arreter,
  reset,
  secondes
})

// Nettoyer quand le composant est plus monte
onUnmounted(() => {
  arreter()
})
</script>

<template>
  <div class="chrono">
    ⏱️ {{ formaterTemps(secondes) }}
  </div>
</template>

<style scoped>
    .chrono {
    background-color: white;
    padding: 10px 15px;
    border-radius: 8px;
    font-weight: bold;
    border: 2px solid #2E8B57;
    }
</style>