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
            component: () => import('../views/Entrar.vue')
        },
        {
            path: '/acerca',
            name: 'Acerca',
            component: () => import('../views/Acerca.vue')
        },
        {
            path: '/sedes',
            name:'Sedes',
            component: () => import('../components/general/Sedes.vue'),
            
        },
        {
            path: '/lectivos',
            name:'Lectivos',
            component: () => import('../components/general/Lectivos.vue'),
            
        },
        {
            path: '/grados',
            name:'Grados',
            component: () => import('../components/general/Grados.vue'),
            
        },
        {
            path: '/asignaturas',
            name:'Asignaturas',
            component: () => import('../components/general/Asignaturas.vue'),
            
        },
        {
            path: '/docentes',
            name:'Docentes',
            component: () => import('../components/general/Docentes.vue'),
            
        },
        {
            path: '/directores',
            name:'Directores',
            component: () => import('../components/general/Directores.vue'),
            
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: () => import('../views/Error.vue')
        }
      
    ]
    
})

export default router
