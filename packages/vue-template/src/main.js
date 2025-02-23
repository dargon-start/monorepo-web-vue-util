import { createApp } from 'vue'
import '@monorepo-web-vue-util/theme-chalk/lib/dark/index.css'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const store = createPinia()

createApp(App).use(store).mount('#app')
