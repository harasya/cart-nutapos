import './assets/main.css'
import './assets/styles.scss'
import { setupCalendar } from 'v-calendar'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(setupCalendar, {})
app.use(router)

app.mount('#app')
