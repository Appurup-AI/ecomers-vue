import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './Pages/HomePage.vue'
import FavoritePage from './Pages/FavoritePage.vue'
import AuthPage from './Pages/AuthPage.vue'
import ProfilePage from './Pages/ProfilePage.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/favorite', name: 'Favorite', component: FavoritePage },
  { path: '/auth', name: 'Auth', component: AuthPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(createPinia())
app.use(router)
app.mount('#app')
