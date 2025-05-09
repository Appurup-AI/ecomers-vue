<script setup>
import { onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
const itemsStore = useItemsStore()
const props = defineProps({
  item: Object,
})

onMounted(() => {
  console.log(itemsStore.cart)
})
</script>

<template>
  <div class="cart" :id="item.id">
    <img
      src="/close-outline.svg"
      class="cart__close"
      alt="Close"
      @click="itemsStore.toggledAdded(item)"
    />
    <div class="cart__img">
      <img :src="item.imageUrl" :alt="item.title" />
    </div>
    <div class="cart__description">
      <div class="cart__description--heading">{{ item.type }} {{ item.control }}</div>
      <div class="cart__description--title">{{ item.title }}</div>
      <div class="cart__description--power">{{ item.minPower.toLocaleString('ru-RU') }} кВт - {{ item.maxPower.toLocaleString('ru-RU') }} кВт</div>
    </div>
    <div class="cart__price">
      <span>{{ item.price.toLocaleString('ru-RU') }}</span> ₽
    </div>
    <div class="cart__amount">
      <div class="quantity-control">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quantity-control {
  width: 11rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f1f5f9;
  background-color: #f3f3f7;
  border-radius: 1rem;
  text-align: center;
  overflow: hidden;
}

.quantity-btn {
  padding: 0.625rem;
  width: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #000;
  }
}

.quantity-value {
  width: 2.5rem;
}

.cart {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem 1rem 0.5rem 1rem;
  // height: 12rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 2fr 1fr;
  position: relative;
  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  &__img {
    display: flex;
    justify-content: center;
    align-items: start;
    & img {
      max-height: 7rem;
      width: auto;
    }
  }
  &__description {
    font-size: 1.4rem;
    font-weight: 500;
    margin-right: 1rem;
    &--heading {
      text-transform: capitalize;
    }

    &--title {
    }
  }
  &__price {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-left: 0.8rem;
    font-size: 1.6rem;
    font-weight: 700;
  }
  &__amount {
    justify-self: end;
  }
}
</style>
