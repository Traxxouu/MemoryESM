<!-- PAR MAEL -->
<script setup>
// Page des scores - Historique des parties
import { ref, computed } from 'vue'

// Récupérer les scores depuis localStorage
const scores = ref(JSON.parse(localStorage.getItem('memory-scores') || '[]'))

// Variable pour le tri
const triActuel = ref('date') 
const ordreAscendant = ref(false)

// Scores triés selon le critère choisi
const scoresTries = computed(() => {
  const copie = [...scores.value]
  
  copie.sort((a, b) => {
    let comparaison = 0
    
    if (triActuel.value === 'date') {
      comparaison = b.id - a.id // Plus récent en premier
    } else if (triActuel.value === 'essais') {
      comparaison = a.essais - b.essais // Moins d'essais c le mieux 
    } else if (triActuel.value === 'niveau') {
      comparaison = b.niveau - a.niveau // Plus dur en premier
    } else if (triActuel.value === 'pseudo') {
      comparaison = a.pseudo.localeCompare(b.pseudo)
    } else if (triActuel.value === 'temps') {
      comparaison = a.temps - b.temps
    }
    
    return ordreAscendant.value ? -comparaison : comparaison
  })
  
  return copie
})

// Changer le tri
function changerTri(nouveauTri) {
  if (triActuel.value === nouveauTri) {
    ordreAscendant.value = !ordreAscendant.value
  } else {
    triActuel.value = nouveauTri
    ordreAscendant.value = false
  }
}

// Supprimer un score
function supprimerScore(id) {
  scores.value = scores.value.filter(s => s.id !== id)
  localStorage.setItem('memory-scores', JSON.stringify(scores.value))
}

// Supprimer tous les scores
function supprimerTout() {
  if (confirm('Tu veux vraiment supprimer ton historique ??????')) {
    scores.value = []
    localStorage.setItem('memory-scores', JSON.stringify([]))
  }
}

// Modifier le pseudo d'un score
const scoreEnEdition = ref(null)
const nouveauPseudo = ref('')

function commencerEdition(score) {
  scoreEnEdition.value = score.id
  nouveauPseudo.value = score.pseudo
}

function annulerEdition() {
  scoreEnEdition.value = null
  nouveauPseudo.value = ''
}

function sauvegarderPseudo(id) {
  if (nouveauPseudo.value.trim() === '') {
    alert('Le pseudo ne peut pas être vide !')
    return
  }
  
  const score = scores.value.find(s => s.id === id)
  if (score) {
    score.pseudo = nouveauPseudo.value.trim()
    localStorage.setItem('memory-scores', JSON.stringify(scores.value))
  }
  
  scoreEnEdition.value = null
  nouveauPseudo.value = ''
}

function formaterTemps(totalSecondes) {
  if (!totalSecondes) return '--:--'
  const minutes = Math.floor(totalSecondes / 60)
  const secs = totalSecondes % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
  <div class="scores">
    <h2>Historique des parties</h2>
    
    <!-- Message si pas de scores -->
    <div v-if="scores.length === 0" class="aucun-score">
      <p>Oh bah ya pas de partie !!!</p>
      <p>Allez joueeee</p>
    </div>
    
    <div v-else>
      <button @click="supprimerTout" class="btn-supprimer-tout">
        Supprimer ton historique ??????
      </button>
      
      <table class="tableau-scores">
        <thead>
          <tr>
            <th @click="changerTri('pseudo')">
              Pseudo {{ triActuel === 'pseudo' ? (ordreAscendant ? '↑' : '↓') : '' }}
            </th>
            <th @click="changerTri('niveau')">
              Niveau {{ triActuel === 'niveau' ? (ordreAscendant ? '↑' : '↓') : '' }}
            </th>
            <th @click="changerTri('essais')">
              Essais {{ triActuel === 'essais' ? (ordreAscendant ? '↑' : '↓') : '' }}
            </th>
            <th @click="changerTri('temps')">
              Temps {{ triActuel === 'temps' ? (ordreAscendant ? '↑' : '↓') : '' }}
            </th>
            <th @click="changerTri('date')">
              Date {{ triActuel === 'date' ? (ordreAscendant ? '↑' : '↓') : '' }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in scoresTries" :key="score.id">
            <!-- l'option pour modifier le pseudo -->
            <td>
              <span v-if="scoreEnEdition !== score.id">
                {{ score.pseudo }}
              </span>
              <input 
                v-else 
                type="text" 
                v-model="nouveauPseudo"
                @keyup.enter="sauvegarderPseudo(score.id)"
              />
            </td>
            <td>{{ score.niveau }} x {{ score.niveau }}</td>
            <td>{{ score.essais }}</td>
            <td>{{ formaterTemps(score.temps) }}</td>
            <td>{{ score.date }}</td>
            <td>
              <span v-if="scoreEnEdition !== score.id">
                <button @click="commencerEdition(score)">Modifier</button>
                <button @click="supprimerScore(score.id)">Supprimer</button>
              </span>
              <span v-else>
                <button @click="sauvegarderPseudo(score.id)">OK</button>
                <button @click="annulerEdition">Annuler</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
    .scores {
        padding: 20px;
    }

    h2 {
        text-align: center;
        color: #2E8B57;
        margin-bottom: 20px;
    }

    .aucun-score {
        text-align: center;
        background-color: white;
        padding: 40px;
        border-radius: 15px;
        border: 3px solid #2E8B57;
    }

    .btn-supprimer-tout {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
        font-family: inherit;
        font-weight: bold;
    }

    .tableau-scores {
        width: 100%;
        background-color: white;
        border-radius: 15px;
        overflow: hidden;
        border-collapse: collapse;
    }

    .tableau-scores th {
        background-color: #2E8B57;
        color: white;
        padding: 15px 10px;
        cursor: pointer;
    }

    .tableau-scores th:hover {
        background-color: #3da06a;
    }

    .tableau-scores td {
        padding: 12px 10px;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }

    .tableau-scores tr:hover {
        background-color: #f5f5f5;
    }

    .tableau-scores button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin: 0 3px;
    }

    .tableau-scores input {
        padding: 5px;
        border: 2px solid #2E8B57;
        border-radius: 5px;
        width: 100px;
    }
</style>