<!-- Par Sofiane -->
<script setup>
// Page d'accueil - Saisie du pseudo et choix du niveau
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pseudo = ref('')
const niveau = ref(4) // 4x4 niveau par défaut

// Les niveaux disponibles
const niveaux = [
  { valeur: 4, texte: '4 x 4 (Facile)' },
  { valeur: 5, texte: '5 x 5 (Moyen)' },
  { valeur: 6, texte: '6 x 6 (Difficile)' }
]

// Fonction pour démarrer la partie
function demarrerPartie() {
  if (pseudo.value.trim() === '') {
    alert('Entre ton pseudo pour jouer !')
    return
  }
  
  // On navigue vers la page de jeu avec les paramètres
  router.push({
    name: 'jeu',
    query: {
      pseudo: pseudo.value,
      niveau: niveau.value
    }
  })
}
</script>

<template>
  <div class="accueil">
    <h2>Bienvenue sur Memory Game</h2>
    
    <div class="formulaire">
      <!-- affiche le pseudo du joueur -->
      <div class="champ">
        <label for="pseudo">Ton pseudo :</label>
        <input 
          type="text" 
          id="pseudo" 
          v-model="pseudo" 
          placeholder="Entre ton pseudo"
        />
      </div>
      
      <!-- Choix du niveau -->
      <div class="champ">
        <label for="niveau">Niveau de difficulté :</label>
        <select id="niveau" v-model="niveau">
          <option 
            v-for="n in niveaux" 
            :key="n.valeur" 
            :value="n.valeur"
          >
            {{ n.texte }}
          </option>
        </select>
      </div>
      
      <!-- Bouton pour démarrer -->
      <button @click="demarrerPartie">
        Commencer la partie
      </button>
    </div>
  </div>
</template>