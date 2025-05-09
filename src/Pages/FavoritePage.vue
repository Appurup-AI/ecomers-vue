<script setup>
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import InfoBlock from '@/components/InfoBlock.vue'
import Cart from '@/components/Cart.vue'
const itemsStore = useItemsStore()

onMounted(() => {
  console.log(itemsStore.favorites)
})
</script>

<template>
  <div v-if="!itemsStore.favorites.length">
    <InfoBlock
      image="/package-icon.avif"
      title="Нет закладок"
      description="Добавьте товары в избранное, чтобы увидеть их."
    />
  </div>

  <div v-else class="items__container">
    <Cart v-for="item in itemsStore.favorites" :key="item.id" :item="item" />
  </div>
</template>
