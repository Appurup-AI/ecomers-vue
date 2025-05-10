<script setup>
import { useItemsStore } from '@/stores/items'
import { useAccountStore } from '@/stores/account'
const itemsStore = useItemsStore()
const accountStore = useAccountStore()
</script>

<template>
  <header class="header">
    <router-link to="/">
      <div class="header__logo">
        <img src="/logo.avif" alt="logo" class="header__logo-img" />
        <div class="header__logo-title">
          <h2 class="header__logo-title__primary">EDL</h2>
          <p class="header__logo-title__secondary">Магазин промышленных горелок</p>
        </div>
      </div>
    </router-link>
    <ul class="nav__items">
      <li class="nav__item" @click="itemsStore.toggledDrawer()">
        <img src="/cart-outline.svg" alt="Открыть карту" class="nav__item-logo" />
        <span>{{ itemsStore.cartPrice }} руб. ({{ itemsStore.cartAmount }})</span>
      </li>

      <router-link to="/favorite">
        <li class="nav__item">
          <img src="/heart-outline.svg" alt="" class="nav__item-logo" />
          <span
            >Закладки <b>( {{ itemsStore.favoritesAmount }} )</b>
          </span>
        </li>
      </router-link>

      <router-link :to="accountStore.profilePath">
        <li class="nav__item">
          <img src="/person-outline.svg" alt="" class="nav__item-logo" />
          <span>Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid oklch(0.704 0.04 256.788);
  padding: 3.2rem 4rem;
  @media screen and (max-width: $screen-md) {
    flex-direction: column;
    align-items: start;
    gap: 2rem;
    padding: 1.6rem 2rem;
  }
  @media screen and (max-width: $screen-sm) {
    padding: .8rem 1rem;
      }
  &__logo {
    display: flex;
    gap: 1rem;

    align-items: center;
    // &-img {
    // }
    &-title {
      text-align: left;
      &__primary {
        font-weight: 600;
      }

      &__secondary {
        font-size: 1.4rem;
        font-weight: 300;
        color: oklch(0.704 0.04 256.788);
      }
    }
  }
}

.nav__items {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  @media screen and (max-width: $screen-md) {
    align-self: auto;
    justify-content: space-between;
    width: 100%;
  }

  .nav__item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: oklch(0.551 0.027 264.364);
    font-weight: 300;
    cursor: pointer;
    & span {
      font-weight: 900;
      @media screen and (max-width: $screen-sm) {
        font-size: 1.2rem;
      }
    }
    &-logo {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
