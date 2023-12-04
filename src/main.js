// imports
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import app from './app'

require('@styles/reset.scss')
require('@styles/fonts.scss')

createApp(app).use(createPinia()).mount('#app')
