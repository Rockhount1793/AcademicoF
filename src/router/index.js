import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '../views/Bienvenida.vue'
import Index from '@/components/general/Index.vue'
import Sedes from '@/components/general/Sedes.vue'
import Crear from '@/components/general/CrearSede.vue'

const router = createRouter({
    
    history: createWebHistory(),
    
    routes: [

        {
            path: '/',
            name: 'Bienvenida',
            component: Bienvenida
        },
        {
            path: '/entrar',
            name: 'Entrar',
            component: () => import(/* webpackChunkName: "entrar" */'../views/Entrar.vue')
        },
        {
            path: '/acerca',
            name: 'Acerca',
            component: () => import(/* webpackChunkName: "acerca" */'../views/Acerca.vue')
        },
        {
            path: '/sedes',
            name:'Sedes',
            component: () => import(/* webpackChunkName: "sedes" */'../components/general/Sedes.vue'),
            
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
        }
      
    ]
    
})

export default router
