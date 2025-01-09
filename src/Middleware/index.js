import { checkLogin }   from "./helper"

const Middleware = {
    // redireccionar si esta loagueado a dashboard
    redirectAuthenticated: async(to, from, next)=>{
       const statusPermission = await checkLogin(to)
       statusPermission.status ? next(statusPermission.redirect) : next()
    },
    // verifica si hay una sesión activa
    authenticated: async(to, from, next,bypass)=>{
        const statusPermission = await checkLogin(to)
        if(bypass){ bypass(statusPermission)
        }else{ statusPermission.status ? next() : next(statusPermission.redirect) }
    }
} 

export default Middleware