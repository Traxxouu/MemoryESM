<script setup>
// Composant affichant le message de victoire
defineProps({
  pseudo: {
    type: String,
    required: true
  },
  essais: {
    type: Number,
    required: true
  },
  temps: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['rejouer', 'accueil'])
</script>

<template>
  <div class="message-victoire">
    <h3>🎉 WOW GG {{ pseudo }} ! 🎉</h3>
    <p>Victoire en {{ essais }} essais et {{ temps }} secondes</p>
    <div class="boutons-victoire">
      <button @click="emit('rejouer')">Rejouer</button>
      <button @click="emit('accueil')">Accueil</button>
    </div>
  </div>
</template>

<style scoped>
.message-victoire {
  background-color: #FFD700;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 20px;
  border: 3px solid #FF6B00;
}

.message-victoire h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.boutons-victoire {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.boutons-victoire button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #FF6B00;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
}

.boutons-victoire button:hover {
  background-color: #ff8533;
}
</style>