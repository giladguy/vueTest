import { createApp } from 'vue'
import { store,key } from "./store";
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import  router  from './router'

createApp(App).use(Quasar, quasarUserOptions).use(store, key).use(router).mount('#app')