<script setup>
// la nav de l'app
</script>

<template>
  <header class="entete">
    <div class="logo-titre">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
      <h1 class="titre">ESM - Memory Game</h1>
    </div>
    
    <nav class="navigation">
      <RouterLink to="/" class="lien-nav">Accueil</RouterLink>
      <RouterLink to="/scores" class="lien-nav">Scores</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
    .entete {
        background-color: #2E8B57;
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 4px solid #1a5235;
    }

    .logo-titre {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .logo {
        height: 50px;
        width: auto;
    }

    .titre {
        font-size: 1.8rem;
        color: #FFD700;
    }

    .navigation {
        display: flex;
        gap: 15px;
    }

    .lien-nav {
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        background-color: #FF6B00;
        border-radius: 8px;
        font-weight: bold;
    }

    .lien-nav:hover {
        background-color: #ff8533;
    }
</style>