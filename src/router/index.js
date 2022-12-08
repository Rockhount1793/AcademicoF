import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '@/views/Bienvenida.vue'
import Error from '@/views/Error.vue'

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
            component: () => import('@/views/Entrar.vue')
        },
        {
            path: '/acerca',
            name: 'Acerca',
            component: () => import('@/views/Acerca.vue')
        },
        {
            path: '/sedes',
            name:'Sedes',
            component: () => import('@/components/general/Sedes.vue'),
            
        },
        {
            path: '/lectivos',
            name:'Lectivos',
            component: () => import('@/components/general/Lectivos.vue'),
            
        },
        {
            path: '/grados',
            name:'Grados',
            component: () => import('@/components/general/Grados.vue'),
            
        },
        {
            path: '/asignaturas',
            name:'Asignaturas',
            component: () => import('@/components/general/Asignaturas.vue'),
            
        },
        {
            path: '/logros',
            name:'Logros',
            component: () => import('@/components/general/Logros.vue'),
            
        },
        {
            path: '/calificaciones',
            name:'Calificaciones',
            component: () => import('@/components/general/Calificaciones.vue'),
            
        },
        {
            path: '/matriculas',
            name:'Matriculas',
            component: () => import('@/components/general/Matriculas.vue'),
            
        },
        {
            path: '/docentes',
            name:'Docentes',
            component: () => import('@/components/general/Docentes.vue'),
            
        },
        {
            path: '/estudiantes',
            name:'Estudiantes',
            component: () => import('@/components/general/Estudiantes.vue'),
            
        },
        {
            path: '/directores',
            name:'Directores',
            component: () => import('@/components/general/Directores.vue'),
            
        },
        {
            path: '/personas',
            name:'Personas',
            component: () => import('@/components/general/Personas.vue'),
            
        },
        {
            path: '/generables',
            name:'Generables',
            component: () => import('@/components/general/Generables.vue'),
            
        },
        {
            path: '/boletin',
            name:'Boletin',
            component: () => import('@/components/generables/Boletin.vue'),
            
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: Error
        }
      
    ]
    
})

export default router
