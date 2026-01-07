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

<style scoped>
    .accueil {
        text-align: center;
        padding: 40px 20px;
    }

    h2 {
        color: #2E8B57;
        font-size: 2rem;
        margin-bottom: 30px;
    }

    .formulaire {
        background-color: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 400px;
        margin: 0 auto;
        border: 3px solid #2E8B57;
    }

    .champ {
        margin-bottom: 20px;
        text-align: left;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }

    input, select {
        width: 100%;
        padding: 12px;
        font-size: 1rem;
        border: 2px solid #2E8B57;
        border-radius: 8px;
        font-family: inherit;
    }

    button {
        width: 100%;
        padding: 15px;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        background-color: #FF6B00;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
    }

    button:hover {
        background-color: #ff8533;
    }
</style>