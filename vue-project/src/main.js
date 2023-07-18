// import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

// pinia.use(({store}) => {
//     store.router = markRaw(router)
// })

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
    clientId: '986179733150-72k5ffe2sq55eivq4hosom14v4551al2.apps.googleusercontent.com'
})
app.use(pinia)
app.use(router)

app.mount('#app')


