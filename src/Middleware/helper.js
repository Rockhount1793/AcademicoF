import Store  from "@/store"
import AplicationService from '@/controllers/Aplicacion'
import enumRouter from "@/enums"
// verifica si el usuario esta logueado
export const checkLogin = async(to)=>{
    const loginStatus = Store.state.login
    const token = localStorage.getItem("token") || ""
    if(!loginStatus && token.length){
        const qtoken = await AplicationService.checkToken()
        if(qtoken.status && qtoken.usuario){
            return {"status":true,"redirect":enumRouter.dashboard}
        }else{
            return {"status":false,"redirect":enumRouter.bienvenida}
        }
    }else{
        return {"status":loginStatus,"redirect":enumRouter.bienvenida}
    }
        
}