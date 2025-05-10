<script setup>
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useAccountStore } from './stores/account'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
const itemsStore = useItemsStore()
const accountStore = useAccountStore()

onMounted(() => {
  itemsStore.fetchData()
})
</script>

<template>
  <Drawer v-if="itemsStore.isDrawerOpen" />
  <div class="app__container">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.app__container {
  background-color: #fff;
  width: 80%;
  margin: 0 auto;
  border-radius: 1.2rem;
  margin-top: 6.4rem;
  min-height: 100vh;

  @media screen and (max-width: $screen-xxl) {
    margin-top: 0;
    width: 95%;
  }
  @media screen and (max-width: $screen-sm) {
    width: 100%;
  }
}
</style>
