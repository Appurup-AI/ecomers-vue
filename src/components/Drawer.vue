<script setup>
import { useItemsStore } from '@/stores/items'
import { useAccountStore } from '@/stores/account'
import DrawerCart from './DrawerCart.vue'
import InfoBlock from './InfoBlock.vue'
const itemsStore = useItemsStore()
const accountStore = useAccountStore()

const handleCreateOrder = async () => {
  await accountStore.createOrder(itemsStore.cart, itemsStore.cartPrice)
  itemsStore.cartDelete()
}
</script>
<template>
  <div class="background__blur" @click="itemsStore.toggledDrawer()"></div>
  <div class="drawer">
    <div class="drawer__container">
      <div class="close" @click="itemsStore.toggledDrawer()">
        <img src="/chevron-back-outline.svg" alt="Назад" class="close-icon" />
        <h2 class="close-title">Корзина</h2>
      </div>
      <div v-if="!itemsStore.cart.length && !accountStore.lastOrderId">
        <InfoBlock
          image="/package-icon.png"
          title="Корзина пуста"
          description="Добавьте товары в избранное, чтобы увидеть их."
        />
      </div>

      <div v-if="!itemsStore.cart.length && accountStore.lastOrderId">
        <InfoBlock
          image="/order-success-icon.avif"
          :title="'Заказ № ' + accountStore.lastOrderId + ' создан'"
          description="Для доп.информации свяжитесь со службой поддержки: "
        />
      </div>

      <div class="carts">
        <DrawerCart v-for="item in itemsStore.cart" :key="item.id" :item="item" />
      </div>
      <div class="order">
        <div class="order__group" v-show="!accountStore.user">
          <label class="order__label">Почта</label>
          <input type="text" class="order__input" v-model="accountStore.form.mail" />
        </div>

        <div class="order__group">
          <label class="order__label">Адрес</label>
          <input type="text" class="order__input" v-model="accountStore.form.address" />
        </div>
        <div class="order__price">
          <span>Итого:</span>
          <div class="order__price-dot"></div>
          <b>{{ itemsStore.cartPrice }} ₽</b>
        </div>
        <button
          class="order__btn order__btn__accept"
          :disabled="!itemsStore.cart.length"
          @click="handleCreateOrder"
        >
          Заказть
        </button>
        <!-- <button
          class="order__btn order__btn__close"
          :disabled="!itemsStore.cart.length"
          @click="itemsStore.cartDelete()"
        >
          Очистить корзину
        </button> -->
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.background__blur {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  z-index: 10;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 20%;
  background-color: #fff;
  z-index: 100;

  @media screen and (max-width: $screen-sm) {
    width: 100%;
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 1rem 2rem;
    height: 100vh;
  }
}
.close {
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  &-icon {
    width: 2rem;
    height: 2rem;
  }

  &-title {
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0 auto;
  }
}

.carts {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: scroll;
}

.order {
  display: flex;
  flex-direction: column;
  margin-top: 1.7rem;
  @media screen and (max-width: $screen-sm) {
    margin-bottom: 10rem;
  }
  &__price {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 2rem;

    &-dot {
      flex: 1;
      border-bottom: 1px dashed #000;
    }
  }

  &__group {
    margin-bottom: 2rem;
    position: relative;
  }

  &__label {
    position: absolute;
    left: 0;
    top: -1.5rem;
    color: #999;
    font-size: 1.2rem;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  &__input {
    width: 100%;
    padding-bottom: 2px;
    border: none;
    border-bottom: 1px solid #84cc16;
    font-size: 1.4rem;
    font-family: inherit;
    color: #1e293b;
    background-color: #fff;
    transition: all 0.3s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:focus {
      outline: none;
      border-color: none;
    }

    &::placeholder {
      color: #94a3b8; /* цвет плейсхолдера */
    }
  }

  &__btn {
    width: 100%;
    border-radius: 1.2rem;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: white;
    cursor: pointer;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1rem;
    &:hover {
      transform: translateY(-0.2rem);
    }
    &:active {
      transform: translateY(0.3rem);
    }
    &:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;

      &:hover {
        background-color: #cbd5e1;
        transform: translateY(0);
      }
    }
    &__accept {
      background-color: #84cc16;
      &:hover {
        background-color: #65a30d;
      }
      &:active {
        background-color: #4d7c0f;
      }
    }
    &__close {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f87171;
      &:hover {
        background-color: #dc2626;
      }
      &:active {
        background-color: #b91c1c;
      }
    }
  }
}
</style>
