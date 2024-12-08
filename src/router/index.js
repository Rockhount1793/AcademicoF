import { createRouter, createWebHashHistory  } from 'vue-router'
import Dashboard from '@/components/layouts/Default.vue'
import Error from '@/views/Error.vue'
import Middleware from '@/Middleware'
import Config from '@/config'

const statusAplication = ()=>Config.status
const Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Bienvenida',
            meta: { "middleware":[Middleware.redirectAuthenticated ] }, 
            component: () => import('@/views/Bienvenida.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { "middleware":[Middleware.authenticated] },
            redirect:'/dashboard/inicio', 
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
                }
            ]
        },
        {
            path: '/entrar',
            name: 'Entrar',
            meta: { "middleware":[Middleware.redirectAuthenticated] }, 
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

Router.beforeEach(async(to, from, next) => {  
    const middleware = to.meta.middleware
    if(Array.isArray(middleware) && middleware.length && statusAplication() === 'production'){
        
        let lengthMiddleware = [...middleware]
        /* 
            se elimina el actual middleware en ejecución
            si retorna false se redirige a la ruta que llega por parametro
            si retorna true se ejecuta el siguiente 
        */
        const bypass = async(permission)=>{
            lengthMiddleware.shift()
            if(!permission.status){next(permission.redirect)}else{ await executeOnceMiddleware() }
        }

        // si hay mas de 1 middleware se ejecuta cada uno a la vez
        const executeOnceMiddleware= async ()=>{
            if(lengthMiddleware.length > 1){
                // solamente reciben "bypass" cuando hay mas de uno por ejecutar
                await lengthMiddleware[0](to,from,next,bypass)
            }
            else{
                await lengthMiddleware[0](to,from,next)
            }
        }

        await executeOnceMiddleware()

    }else{
        next()
    }
})

export default Router
