<script setup>
const props = defineProps({
  carte: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['clic'])

function surClic() {
  if (!props.carte.estRetournee && !props.carte.estTrouvee) {
    emit('clic', props.carte.id)
  }
}
</script>

<template>
  <div
    class="carte"
    :class="{
      retournee: carte.estRetournee,
      trouvee: carte.estTrouvee
    }"
    @click="surClic"
  >
    <!-- Face cachée -->
    <div class="face face-cachee">
      SOUTH PARK
    </div>

    <!-- Face visible -->
    <div class="face face-visible">
      <img
        :src="`/src/assets/southpark/${carte.image}`"
        alt="personnage south park"
      />
    </div>
  </div>
</template>

<style scoped>
    .carte {
    aspect-ratio: 1;
    cursor: pointer;
    position: relative;
    }

    .face {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    }

    .face-cachee {
    background-color: #FF6B00;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    border: 3px solid #cc5500;
    }

    .face-visible {
    background-color: white;
    transform: rotateY(180deg);
    border: 3px solid #2E8B57;
    }

    .carte.retournee .face-cachee,
    .carte.trouvee .face-cachee {
    transform: rotateY(180deg);
    }

    .carte.retournee .face-visible,
    .carte.trouvee .face-visible {
    transform: rotateY(0deg);
    }

    .carte.trouvee {
    opacity: 0.6;
    }

    .face-visible img {
    width: 85%;
    height: 85%;
    object-fit: contain;
    }
</style>
