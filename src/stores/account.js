import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useItemsStore } from './items'

export const useAccountStore = defineStore('account', () => {
  const form = ref({
    address: '',
    mail: '',
  })
  const isLoading = ref(false)
  const lastOrderId = ref()
  const code = ref()
  const isSendTrue = ref()
  const isLoader = ref(false)
  const error = ref()
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const ordres = ref([])
  const profilePath = computed(() => (user.value !== null ? '/profile' : '/auth'))

  const createOrderMail = async (orderVal, mailVal) => {
    try {
      const obj = {
        order: orderVal,
        mail: mailVal,
      }
      const res = await fetch(`http://localhost:3000/api/create-order/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const data = await res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const createOrder = async (cart, price) => {
    if (isLoading.value === true) return
    isLoading.value = true
    const obj = {
      items: cart,
      totalPrice: price,
      date: Date.now(),
      account: {
        address: form.value.address,
        mail: user.value === null ? form.value.mail : user.value.email,
      },
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const data = await res.json()
      lastOrderId.value = data.returnData.id
      createOrderMail(data.returnData, obj.account.mail)
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  const sendCode = async () => {
    if (isLoader.value === true) return
    isLoader.value = true
    error.value = null
    const obj = {
      email: form.value.mail,
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const data = await res.json()
      if (!data.success) {
        throw new Error(data.error?.message || 'Ошибка сервера')
      }
      isSendTrue.value = data.success
    } catch (err) {
      console.log(err)
      isSendTrue.value = false
      error.value = err.message
    } finally {
      console.log(error.value)
      isLoader.value = false
    }
  }

  const verifyCode = async () => {
    const obj = {
      email: form.value.mail,
      code: code.value,
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const data = await res.json()

      user.value = data.user
      localStorage.setItem('user', JSON.stringify(user.value))
      isSendTrue.value = false
      code.value = null
      return { success: true }
    } catch (err) {
      console.log(err)
    }
  }

  const getOrders = async () => {
    try {
      console.log(user.value.id)
      const res = await fetch(`${import.meta.env.VITE_API}/api/orders/${user.value.id}`)
      const data = await res.json()
      ordres.value = [...data]
      console.log(ordres.value)
    } catch (err) {
      console.log(err)
    }
  }

  const cleanUser = () => {
    user.value = null
    localStorage.removeItem('user')
    const itemsStore = useItemsStore()
    itemsStore.fetchData()
  }

  return {
    form,
    lastOrderId,
    isSendTrue,
    isLoader,
    code,
    error,
    user,
    ordres,
    profilePath,
    createOrder,
    sendCode,
    verifyCode,
    cleanUser,
    getOrders,
  }
})
