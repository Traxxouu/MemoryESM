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
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  perspective: 800px;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.face-cachee {
  background: #222;
  color: white;
  font-size: 2rem;
}

.face-visible {
  background: white;
  transform: rotateY(180deg);
}

.carte.retournee .face-cachee,
.carte.trouvee .face-cachee {
  transform: rotateY(180deg);
}

.carte.retournee .face-visible,
.carte.trouvee .face-visible {
  transform: rotateY(0deg);
}

.face-visible img {
  width: 90%;
  height: 90%;
  object-fit: contain;
}
</style>
