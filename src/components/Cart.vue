<script setup>
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
const itemsStore = useItemsStore()
const props = defineProps({
  item: Object,
  toggledFavorite: Function,
})
const icons = {
  add: new URL('/add.svg', import.meta.url).href,
  remove: new URL('/remove.svg', import.meta.url).href,
  like: new URL('/heart-outline.svg', import.meta.url).href,
  dislike: new URL('/heart-dislike-outline.svg', import.meta.url).href,
}
onMounted(() => {
  const preloadImages = () => {
    Object.values(icons).forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }
  preloadImages()
})
</script>

<template>
  <div class="sneaker-card" :id="item.id">
    <button class="like-btn disabled:opacity-40" @click="itemsStore.toggledFavorite(item)">
      <img :src="item.isFavorite ? icons.dislike : icons.like" alt="Like" class="like-icon" />
    </button>

    <div class="sneaker-image-container">
      <img :src="item.imageUrl" :alt="item.title" class="sneaker-image" />
    </div>
    <div class="sneaker-title">
      <p class="sneaker-title__heading">{{ item.type }} {{ item.control }} горелка</p>
      <p class="sneaker-title__name">{{ item.title }}</p>
    </div>

    <div class="power">
      <span>{{ item.minPower.toLocaleString('ru-RU') }} кВт - {{ item.maxPower.toLocaleString('ru-RU') }} кВт </span>
    </div>

    <div class="sneaker-footer">
      <div class="price-container">
        <span class="price-label">Цена:</span>
        <b class="price">{{ item.price.toLocaleString('ru-RU') }} руб.</b>
      </div>

      <div v-if="item.isAdded" class="quantity-control">
        <button
          class="quantity-btn minus-btn"
          type="button"
          @click="itemsStore.decreaseAmount(item)"
        >
          -
        </button>
        <div class="quantity-value">{{ item.amount }}</div>
        <button
          class="quantity-btn plus-btn"
          type="button"
          @click="itemsStore.increaseAmount(item)"
        >
          +
        </button>
      </div>

      <button
        v-else-if="!item.isAdded"
        class="like-btn disabled:opacity-40"
        @click="itemsStore.toggledAdded(item)"
      >
        <img :src="icons.add" alt="Add" class="add-to-cart-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sneaker-card {
  position: relative;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 1.5rem;
  padding: 2rem;
  // cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.sneaker-card:hover {
  transform: translateY(-0.5rem);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  @media screen and (max-width: $screen-md) {
    transform: none;
    box-shadow: none;
  }
}

/* Кнопка лайка */
.like-btn {
  width: 2rem;
  height: 2rem;
}

.like-icon {
  height: 2rem;
  widows: auto;
  position: absolute;
  top: 2rem;
  left: 2rem;
}

/* Контейнер изображения */
.sneaker-image-container {
  height: 30rem;
  width: auto;
  display: flex;
  justify-content: center;
  max-height: 22rem;
  align-items: center;
  @media screen and (max-width: $screen-md) {
    height: 20rem;
  }
  @media screen and (max-width: $screen-sm) {
    height: 12rem;
  }
}

.sneaker-image {
  // align-self: center;
  // justify-self: center;
  max-height: 15rem;
    @media screen and (max-width: $screen-sm) {
      max-height: 12rem;
  }
}

/* Название товара */
.sneaker-title {
  margin-top: 0.5rem;
  // height: 3rem;
  @media screen and (max-width: $screen-sm) {
    height: auto;
    min-height: 3rem;
  }
  &__name {
    font-weight: 700;
  }

  &__heading {
    text-transform: capitalize;
  }
}

/* Нижняя часть карточки */
.sneaker-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  align-items: center;
}

.price-container {
  display: flex;
  flex-direction: column;
}

.price-label {
  color: #94a3b8;
}

.price {
  font-weight: bold;
}

/* Управление количеством */
.quantity-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #f1f5f9;
  border-radius: 0.75rem;
  text-align: center;
}

.quantity-btn {
  padding: 0.625rem;
  width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.quantity-value {
  width: 2.5rem;
}

.power {
  margin-top: 0.5rem;
}

/* Иконка добавления в корзину */
.add-to-cart-icon {
  max-width: 2rem;
}

.btn__add {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.4rem;
  background-color: #f8f8f8;
}
</style>
