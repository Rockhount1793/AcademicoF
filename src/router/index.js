import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '../views/Bienvenida.vue'

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
            path: '/lectivos',
            name:'Lectivos',
            component: () => import(/* webpackChunkName: "lectivos" */'../components/general/Lectivos.vue'),
            
        },
        {
            path: '/grados',
            name:'Grados',
            component: () => import(/* webpackChunkName: "lectivos" */'../components/general/Grados.vue'),
            
        },
        {
            path: '/directores',
            name:'Directores',
            component: () => import(/* webpackChunkName: "directores" */'../components/general/Directores.vue'),
            
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue')
        }
      
    ]
    
})

export default router
