import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '../views/Bienvenida.vue'

const router = createRouter({
    
    history: createWebHistory(),
    
    routes: [

        {
            path: '/',
            name: 'bienvenida',
            component: Bienvenida
        },

        {
            path: '/entrar',
            name: 'entrar',
            component: () => import(/* webpackChunkName: "entrar" */'../views/Entrar.vue')
        },

        {
            path: '/acerca',
            name: 'acerca',
            component: () => import(/* webpackChunkName: "acerca" */'../views/Acerca.vue')
        },
        
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
        }
      
    ]
})

export default router
