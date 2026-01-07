// Config du routeur
import { createRouter, createWebHistory } from 'vue-router'
import VueAccueil from '../views/VueAccueil.vue'
import VueJeu from '../views/VueJeu.vue'
import VueScores from '../views/VueScores.vue'

// On cree les routes pour la navigation
const routes = [
  {
    path: '/',
    name: 'accueil',
    component: VueAccueil
  },
  {
    path: '/jeu',
    name: 'jeu',
    component: VueJeu
  },
  {
    path: '/scores',
    name: 'scores',
    component: VueScores
  }
]

// creation du mode historique
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router