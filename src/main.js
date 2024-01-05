import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { VueFire, VueFireAuth } from "vuefire"
import { app } from "./firebase"

createApp(App)
    .use(VueFire, { firebaseApp: app, modules: [VueFireAuth()] })
    .mount('#app')
