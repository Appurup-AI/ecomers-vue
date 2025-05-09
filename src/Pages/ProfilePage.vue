<script setup>
import { onMounted, ref } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useRouter } from 'vue-router'
import OrdersCart from '@/components/OrdersCart.vue'

const router = useRouter()
const accountStore = useAccountStore()

const handleCleanUser = () => {
  accountStore.cleanUser()
  router.push('/auth')
}
onMounted(async () => {
  if (!accountStore.user) {
    router.push('/auth')
    return
  }
  await accountStore.getOrders()
})
</script>

<template>
  <div class="container">
    <div>
      <div class="profile__title">
        <h1 class="profile__title--heading">Профиль</h1>
        <button @click="handleCleanUser" class="profile__title--btn">Выйти</button>
      </div>
      <div class="profile">
        <p class="profile__name">Почта: {{ accountStore.user?.email }}</p>
        <p class="profile__data">
          Создан: {{ new Date(accountStore.user?.created_at).toLocaleString('ru-RU') }}
        </p>
      </div>
    </div>
    <div class="orders">
      <OrdersCart v-for="order in accountStore.ordres" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  position: relative;
  padding: 5rem 0;
  max-width: 120rem;
  @media screen and (max-width: $screen-sm) {
    padding: 2rem 1rem;
  }
}
.btn__exit {
  position: absolute;
  top: 0;
  left: 0;
}

.profile {
  display: flex;
  align-items: center;
  gap: 3rem;
  font-size: 2rem;
  padding: 1rem;
  font-weight: 400;
  @media screen and (max-width: $screen-sm) {
    flex-direction: column;
    gap: 1rem;
    font-size: 1.8rem;
    align-items: start;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    &--heading {
      font-size: 3.6rem;
      text-transform: uppercase;
      font-weight: 300;
    }
    &--btn {
      color: #ef233c;
      border-bottom: 1px solid #ef233c;
    }
  }

  &__name {
  }

  &__data {
  }
}

.orders {
  padding: 5rem;
  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
  }
}
</style>
