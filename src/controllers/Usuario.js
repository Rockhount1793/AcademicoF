    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import  Router  from "@/router"
    import {  useRoute, useRouter }  from "vue-router"
    import Utilities from "@/utilities"
    import Aplicacion from "@/controllers/Aplicacion"
    
    const token = ()=>{ return Store.state.token }

    const Controller = {

        'update': async function(json){

            const response = await Fetch.put('/usuario/update',json)

            if(response.error > 500){
                Aplicacion.redirect_end_sesion(response)
            }

        }

    }

    export default Controller