import { createRouter, createWebHistory } from 'vue-router'
import UserPageVue from '../components/UserPage.vue'
import UsersListVue from '../components/UsersList.vue'

const routes = [
    {
        path: '/',
        name: 'UsersList',
        component: UsersListVue
    },
    {
        path: '/:id',
        name: 'UserPage',
        
        component: UserPageVue
    },
]

const router = createRouter({
    history: createWebHistory(process.env.Base_URL),
    routes: routes
})

export default router