import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import router from '@/routers'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify)
app.use(router)
app.mount('#app')
