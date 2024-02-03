import { createRouter, createWebHashHistory  } from 'vue-router'
import Dashboard from '@/components/layouts/Default.vue'
import Error from '@/views/Error.vue'

const router = createRouter({
    
    history: createWebHashHistory(),
    
    routes: [
        {
            path: '/',
            name: 'Bienvenida',
            component: () => import('@/views/Bienvenida.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            children:[
                {
                    path: 'inicio',
                    name:'Inicio',
                    component: () => import('@/components/general/Inicio.vue'),
                    
                },
                {
                    path: 'sedes',
                    name:'Sedes',
                    component: () => import('@/components/general/Sedes.vue'),
                },
                {
                    path: 'lectivos',
                    name:'Lectivos',
                    component: () => import('@/components/general/Lectivos.vue'),
                    
                },
                {
                    path: 'grados',
                    name:'Grados',
                    component: () => import('@/components/general/Grados.vue'),
                    
                },
                {
                    path: 'asignaturas',
                    name:'Asignaturas',
                    component: () => import('@/components/general/Asignaturas.vue'),
                    
                },
                {
                    path: 'logros',
                    name:'Logros',
                    component: () => import('@/components/general/Logros.vue'),
                    
                },
                {
                    path: 'calificaciones',
                    name:'Calificaciones',
                    component: () => import('@/components/general/Calificaciones.vue'),
                    
                },
                {
                    path: 'faltas',
                    name:'Faltas',
                    component: () => import('@/components/general/Faltas.vue'),
                    
                },
                {
                    path: 'matriculas',
                    name:'Matriculas',
                    component: () => import('@/components/general/Matriculas.vue'),
                    
                },
                {
                    path: 'docentes',
                    name:'Docentes',
                    component: () => import('@/components/general/Docentes.vue'),
                    
                },
                {
                    path: 'estudiantes',
                    name:'Estudiantes',
                    component: () => import('@/components/general/Estudiantes.vue'),
                    
                },
                {
                    path: 'rectores',
                    name:'Rectores',
                    component: () => import('@/components/general/Rectores.vue'),
                    
                },
                {
                    path: 'personas',
                    name:'Personas',
                    component: () => import('@/components/general/Personas.vue'),
                    
                },
                {
                    path: 'generables',
                    name:'Generables',
                    component: () => import('@/components/general/Generables.vue'),
                    
                },
                {
                    path: 'boletin',
                    name:'Boletin',
                    component: () => import('@/components/generables/Boletin.vue'),
                    
                },
            ]
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
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: Error
        }
      
    ]
    
})

export default router
