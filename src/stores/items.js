import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAccountStore } from './account'

export const useItemsStore = defineStore('items', () => {
  // Основная переменная
  const accountStore = useAccountStore()
  const items = ref([])
  const filteredItems = computed(() => {
    const { search, type, control, minPower, maxPower, sortBy } = filters.value

    const searchQuery = search.toLowerCase()

    return items.value
      .filter((item) => {
        // Объединяем все условия фильтрации в один вызов
        let match = item.title.toLowerCase().includes(searchQuery)

        if (type === 'gaz') match &&= item.type === 'газовая'
        else if (type === 'diesel') match &&= item.type === 'дизельная'

        if (control === 'one') match &&= item.control === 'одноступенчатая'
        else if (control === 'two') match &&= item.control === 'двухступенчатая'
        else if (control === 'module') match &&= item.control === 'модуляционная'

        if (minPower != null) match &&= item.minPower >= minPower
        if (maxPower != null) match &&= item.maxPower <= maxPower // Исправлено < на <=

        return match
      })
      .sort((a, b) => {
        // Выносим сортировку в отдельный механизм
        switch (sortBy) {
          case 'name':
            return a.title.localeCompare(b.title)
          case 'price':
            return a.price - b.price
          case '-price':
            return b.price - a.price
          default:
            return 0
        }
      })
  })
  const filters = ref({
    sortBy: '',
    type: '',
    control: '',
    search: '',
    minPower: null,
    maxPower: null,
  })
  const isFiltered = computed(() => {
    const { sortBy, search, control, type, minPower, maxPower } = filters.value
    return !!(sortBy || search || control || type || minPower !== null || maxPower !== null)
  })

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/items`)
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
