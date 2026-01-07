<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PlateauJeu from '../components/PlateauJeu.vue'

const route = useRoute()
const router = useRouter()

const pseudo = route.query.pseudo || 'Joueur'
const niveau = parseInt(route.query.niveau) || 4

// les images a creer mael
const imagesDisponibles = [
  'butters.png',
  'cartman.png',
  'kenny.png',
  'kyle.png',
  'randy.png',
  'stan.png',
  'chef.png',
  'timmy.png',
  'jimmy.png',
  'token.png',
  'tweek.png',
  'craig.png',
  'wendy.png',
  'bebe.png',
  'clyde.png',
  'pip.png',
  'ike.png',
  'sharon.png'
]

const cartes = ref([])
const cartesRetournees = ref([])
const nombreEssais = ref(0)
const partieTerminee = ref(false)
const enTraitement = ref(false)

// Nombre de paires POUR LA GRILLE
const nombrePaires = computed(() => {
  // Pour avoir un nombre pair de cartes
  return Math.floor((niveau * niveau) / 2)
})
const nombrePairesReelles = computed(() =>
  Math.min(nombrePaires.value, imagesDisponibles.length)
)

const partieGagnee = computed(() =>
  cartes.value.length > 0 &&
  cartes.value.every(carte => carte.estTrouvee)
)

function initialiserCartes() {
  const imagesChoisies = imagesDisponibles.slice(0, nombrePairesReelles.value)
  const tableauCartes = []

  imagesChoisies.forEach((image, index) => {
    tableauCartes.push({
      id: index * 2,
      image,
      estRetournee: false,
      estTrouvee: false
    })
    tableauCartes.push({
      id: index * 2 + 1,
      image,
      estRetournee: false,
      estTrouvee: false
    })
  })

  // Mélange
  for (let i = tableauCartes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tableauCartes[i], tableauCartes[j]] = [tableauCartes[j], tableauCartes[i]]
  }

  cartes.value = tableauCartes
}

function surClicCarte(idCarte) {
  if (enTraitement.value || partieTerminee.value) return

  const carte = cartes.value.find(c => c.id === idCarte)
  if (!carte || carte.estRetournee || carte.estTrouvee) return

  carte.estRetournee = true
  cartesRetournees.value.push(carte)

  if (cartesRetournees.value.length === 2) {
    nombreEssais.value++
    enTraitement.value = true

    const [carte1, carte2] = cartesRetournees.value

    if (carte1.image === carte2.image) {
      carte1.estTrouvee = true
      carte2.estTrouvee = true
      cartesRetournees.value = []
      enTraitement.value = false

      if (partieGagnee.value) {
        partieTerminee.value = true
        sauvegarderScore()
      }
    } else {
      setTimeout(() => {
        carte1.estRetournee = false
        carte2.estRetournee = false
        cartesRetournees.value = []
        enTraitement.value = false
      }, 1000)
    }
  }
}

function sauvegarderScore() {
  const scores = JSON.parse(localStorage.getItem('memory-scores') || '[]')

  scores.push({
    id: Date.now(),
    pseudo,
    niveau,
    essais: nombreEssais.value,
    date: new Date().toLocaleDateString('fr-FR')
  })

  localStorage.setItem('memory-scores', JSON.stringify(scores))
}

function rejouer() {
  nombreEssais.value = 0
  partieTerminee.value = false
  cartesRetournees.value = []
  enTraitement.value = false
  initialiserCartes()
}

function retourAccueil() {
  router.push({ name: 'accueil' })
}

initialiserCartes()
</script>

<template>
  <div class="jeu">
    <div class="infos-partie">
      <p>Joueur : <strong>{{ pseudo }}</strong></p>
      <p>Niveau : <strong>{{ niveau }} x {{ niveau }}</strong></p>
      <p>Essais : <strong>{{ nombreEssais }}</strong></p>
    </div>
    <div v-if="partieTerminee" class="message-victoire">
      <h3>YOUHOUUU {{ pseudo }} !</h3>
      <p>Victoire en {{ nombreEssais }} essais</p>
      <button @click="rejouer">Rejouer</button>
      <button @click="retourAccueil">Retour accueil</button>
    </div>

    <PlateauJeu
      :cartes="cartes"
      :niveau="niveau"
      @clicCarte="surClicCarte"
    />
  </div>
</template>

<style scoped>
.jeu {
  padding: 20px;
}

.infos-partie {
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: 0 auto 20px;
}

.message-victoire {
  text-align: center;
  margin-bottom: 20px;
}
</style>
