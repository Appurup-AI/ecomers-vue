<script setup>
import { useAccountStore } from '@/stores/account'
import { useItemsStore } from '@/stores/items'
import Loader from '../utility/Loader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()

const handleverifyCode = async () => {
  const result = await accountStore.verifyCode()
  if (result.success) {
    const itemsStore = useItemsStore()
    itemsStore.fetchData()
    router.push('/profile')
  }
}
</script>

<template>
  <h2 class="heading__primary">Аккаунт</h2>
  <div class="container">
    <div class="profile__container">
      <div class="profile">
        <form @submit.prevent>
          <div class="profile__input">
            <div class="profile__input-label">Почта</div>
            <input
              type="text"
              class="profile__input-i"
              placeholder="example@mail.ru"
              v-model="accountStore.form.mail"
            />
            <div v-if="accountStore.error && !accountStore.isSendTrue" class="error-message">
              {{ accountStore.error }}
            </div>
          </div>
          <Loader v-if="accountStore.isLoader" />
          <div class="profile__input profile__input-code" v-if="accountStore.isSendTrue">
            <div class="profile__input-label">Код</div>
            <input
              type="text"
              class="profile__input-i"
              placeholder="*** ***"
              v-model="accountStore.code"
            />
          </div>
          <button
            v-if="!accountStore.isSendTrue"
            class="btn__submit"
            :disabled="!accountStore.form.mail"
            @click="accountStore.sendCode"
          >
            Подтвердить
          </button>
          <button
            v-if="accountStore.isSendTrue"
            class="btn__submit"
            :disabled="!accountStore.code"
            @click="handleverifyCode"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.heading__primary {
  text-align: center;
  font-size: 4rem;
  font-weight: 900;
  text-transform: uppercase;
}

.container {
  padding: 4rem;
  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
  }
}

.profile__container {
  margin: 0 auto;
  width: 80rem;
  min-height: 60rem;
  @media screen and (max-width: $screen-sm) {
    width: 100%;
  }
}

.profile {
  padding: 5rem;
  margin: 0 auto;
  width: 50%;
  border-radius: 1.2rem;
  background-color: #fff;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
    width: 100%;
  }
}

.profile__input {
  position: relative;
  margin-bottom: 1.6rem;
}
.profile__input-label {
  color: oklch(37.3% 0.034 259.733);
  font-weight: 300;
  font-size: 1.4rem;
}
.profile__input-i {
  appearance: none;
  border: 1px solid;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  color: #374151;
  line-height: 1.25;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  outline: 1px solid transparent;
  outline-offset: 2px;
}

.btn__submit {
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 500;
  height: 4.4rem;
  border-radius: 0.6rem;
  padding: 0 3.2rem;
  width: 100%;
  background-color: #059669;
  color: #ecfdf5;
  text-transform: uppercase;
  text-align: center;
}
.btn__submit:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.profile__input-code {
  animation: 0.5s appearTop ease;
}

.error-message {
  color: red;
  margin-top: 8px;
  font-size: 1.4rem;
}

@keyframes appearTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
