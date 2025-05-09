<script setup>
import { onMounted, watch } from 'vue'
import vueDebounce from 'vue-debounce'
const vDebounce = vueDebounce({ lock: true })
import { useItemsStore } from '@/stores/items'
import Cart from '@/components/Cart.vue'
// const emit = defineEmits(['toggledFavorite', 'toggledAdded'])
const itemsStore = useItemsStore()

const handleChange = () => {
  console.log(itemsStore.filters)
  console.log(itemsStore.filteredItems)
  console.log(itemsStore.isFiltered)
}
</script>

<template>
  <div class="header-container">
    <h2 class="header-title">Все кроссовки</h2>

    <div class="header-controls">
      <select
        id="sort-select"
        class="sort-select"
        v-model="itemsStore.filters.sortBy"
        @change="handleChange"
      >
        <option value="">Все</option>
        <option value="name">По названию</option>
        <option value="price">Сначала дешевые</option>
        <option value="-price">Сначала дорогие</option>
      </select>

      <select
        id="sort-type"
        class="sort-select"
        v-model="itemsStore.filters.type"
        @change="handleChange"
      >
        <option value="">Все</option>
        <option value="gaz">Газовые</option>
        <option value="diesel">Дизельные</option>
      </select>

      <select
        id="sort-control"
        class="sort-select"
        v-model="itemsStore.filters.control"
        @change="handleChange"
      >
        <option value="">Все</option>
        <option value="one">Одноступенчатые</option>
        <option value="two">Двухступенчатые</option>
        <option value="module">Модуляционные</option>
      </select>

      <div class="search-power">
        <input
          class="search-power__value"
          type="text"
          placeholder="От"
          v-model.number="itemsStore.filters.minPower"
          v-debounce:500ms="handleChange"
          debounce-events="keydown"
        />
        <input
          class="search-power__value"
          type="text"
          placeholder="До"
          v-model.number="itemsStore.filters.maxPower"
          debounce-events="keydown"
        />
      </div>

      <div class="search-container">
        <img class="search-icon" src="/search-outline.svg" alt="Search" />
        <input
          id="search-input"
          class="search-input"
          type="text"
          placeholder="Поиск..."
          v-model="itemsStore.filters.search"
          debounce-events="keydown"
        />
      </div>
    </div>
  </div>
  <div class="items__container" v-if="!itemsStore.isFiltered">
    <Cart v-for="item in itemsStore.items" :key="item.id" :item="item" />
  </div>
  <div class="items__container" v-if="itemsStore.isFiltered">
    <Cart v-for="item in itemsStore.filteredItems" :key="item.id" :item="item" />
  </div>
</template>

<style lang="scss">
.items__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding: 4rem;

  @media screen and (max-width: $screen-xl) {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
  @media screen and (max-width: $screen-sm) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
    margin-top: 2rem;
  }
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 4rem 0 4rem;
  @media screen and (max-width: $screen-sm) {
    align-items: normal;
    flex-direction: column;
    padding: 2rem 0 0 0;
    gap: 2rem;
  }
  .header-title {
    font-size: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    @media screen and (max-width: $screen-sm) {
      font-size: 1.8rem;
      text-align: center;
    }
  }
}

.header-controls {
  display: flex;
  gap: 1rem;
  @media screen and (max-width: $screen-sm) {
    gap: 0;
    flex-wrap: wrap;
    padding: 0 1rem;
  }

  .sort-select {
    padding: 0.6rem 0.8rem;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    outline: none;
    min-height: 4.4rem;
    background-color: #fff;
    font-size: 1.3rem;
    @media screen and (max-width: $screen-sm) {
    }
    &:focus {
      border-color: #9ca3af;
    }
  }

  .search-container {
    position: relative;
    @media screen and (max-width: $screen-sm) {
      // max-width: 20rem;
      width: 100%;
      flex: 1;
    }

    .search-icon {
      position: absolute;
      left: 0.4rem;
      top: 1.2rem;
      width: 2rem;
    }

    .search-input {
      border: 1px solid #e5e7eb;
      border-radius: 0.4rem;
      padding: 0.6rem 1rem 0.6rem 2.6rem;
      outline: none;
      min-height: 4.4rem;
      border-radius: 1rem;
      @media screen and (max-width: $screen-sm) {
        width: 100%;
      }
      &:focus {
        border-color: #9ca3af;
      }
    }
  }
}

.search-power {
  display: flex;
  gap: 1rem;
  &__value {
    border: 1px solid #e5e7eb;
    max-width: 10rem;
    padding: 1rem;
    outline: none;
    min-height: 4.4rem;
    border-radius: 1rem;
  }
}
</style>
