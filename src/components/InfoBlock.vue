<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
})
</script>

<template>
  <div class="card">
    <img height="70" width="70" :src="image" :alt="title" id="card-image" />
    <h2 class="card-title" id="card-title">{{ title }}</h2>
    <p class="card-description" id="card-description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 28rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  img {
    height: 10rem;
    width: auto;
  }

  &-title {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;

  }

  &-description {
    font-size: 1.6rem;
    color: #6b7280;
  }
}
</style>
