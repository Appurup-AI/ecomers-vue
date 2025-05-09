import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAccountStore } from './account'

export const useItemsStore = defineStore('items', () => {
  // Основная переменная
  const accountStore = useAccountStore()
  const items = ref([])
  const filteredItems = computed(() => {
    const searchQuery = filters.value.search.toLowerCase()

    let result = items.value.filter((item) => item.title.toLowerCase().includes(searchQuery))

    // Сортировка в зависимости от выбранного варианта
    switch (filters.value.sortBy) {
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'price':
        result.sort((a, b) => a.price - b.price)
        break
      case '-price':
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  })
  const filters = ref({
    sortBy: '',
    search: '',
  })
  const isFiltered = computed(() => {
    return filters.value.sortBy !== '' || filters.value.search !== ''
  })

  const fetchData = async () => {
    try {
      const res = await fetch('https://c4ed8f614b796983.mokky.dev/items')
      const data = await res.json()
      if (accountStore.user !== null) {
        try {
          const resItem = await fetch(
            `${import.meta.env.VITE_API}/api/items/${accountStore.user.id}`,
          )
          if (!resItem.ok) throw new Error(resItem.message)
          const dateItem = await resItem.json()
          items.value = data.map((item) => {
            const userItem = dateItem.find((ui) => ui.item_id === item.id)
            return {
              ...item,
              isAdded: userItem ? userItem.is_added : false,
              isFavorite: userItem ? userItem.is_favorite : false,
              isProcessing: false,
              amount: userItem ? userItem.amount : 1,
            }
          })
        } catch (err) {
          console.log(err)
          items.value = data.map((el) => ({
            ...el,
            isAdded: false,
            isFavorite: false,
            isProcessing: false,
            amount: 1,
          }))
        }
      } else {
        const itemsInLocalStorage = localStorage.getItem('items')
        if (itemsInLocalStorage) {
          items.value = JSON.parse(itemsInLocalStorage)
          console.log(items.value)
        } else {
          items.value = data.map((item) => ({
            ...item,
            isAdded: false,
            isFavorite: false,
            isProcessing: false,
            amount: 1,
          }))
        }
      }
      console.log(items.value)
    } catch (err) {
      console.log(err)
    }
  }

  const favorites = computed(() => {
    return items.value.filter((item) => item.isFavorite)
  })

  const favoritesAmount = computed(() => favorites.value.length)

  const cart = computed(() => {
    return items.value.filter((item) => item.isAdded)
  })
  const cartPrice = computed(() =>
    cart.value.length ? cart.value.reduce((acc, item) => acc + item.price * item.amount, 0) : 0,
  )
  const cartAmount = computed(() => cart.value.length)

  const cartDelete = () => {
    items.value.map((item) => {
      item.isAdded = false
      item.amount = 1
      postChangedInCart(item)
    })
  }

  // Правая боковая панель
  const isDrawerOpen = ref(false)
  const toggledDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const toggledFavorite = async (obj) => {
    const item = items.value.find((el) => el.id === obj.id)
    if (item) item.isFavorite = !item.isFavorite
    await postChangedInCart(item)
  }

  const decreaseAmount = async (obj) => {
    const item = items.value.find((el) => el.id === obj.id)
    if (item.amount == 1) {
      toggledAdded(item)
      return
    } else if (item && item.amount > 1) item.amount--
    await postChangedInCart(item)
  }

  const increaseAmount = async (obj) => {
    const item = items.value.find((el) => el.id === obj.id)
    if (item) item.amount++
    await postChangedInCart(item)
  }

  const toggledAdded = async (obj) => {
    const item = items.value.find((el) => el.id === obj.id)
    if (item) item.isAdded = !item.isAdded
    await postChangedInCart(item)
  }

  const postChangedInCart = async (item) => {
    if (accountStore.user !== null) {
      const obj = {
        item_id: item.id,
        amount: item.amount,
        is_added: item.isAdded,
        is_favorite: item.isFavorite,
      }
      console.log(obj)
      try {
        await fetch(`${import.meta.env.VITE_API}/api/user-items/${accountStore.user.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        })
      } catch (err) {
        console.log(err)
      }
    } else {
      localStorage.setItem('items', JSON.stringify(items.value))
    }
  }

  return {
    items,
    favorites,
    cart,
    isDrawerOpen,
    cartPrice,
    favoritesAmount,
    cartAmount,
    filteredItems,
    isFiltered,
    filters,
    cartDelete,
    fetchData,
    toggledFavorite,
    toggledAdded,
    decreaseAmount,
    increaseAmount,
    toggledDrawer,
  }
})
