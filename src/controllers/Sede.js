import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"
    
const Controller = {

    'index': async function(){

        let json = Store.state.actual_sede
        const response = await Fetch.get('/sede/index', json)

        if(response.status){
            Store.commit('set_sedes', response.sedes)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'store': async function(json){

        const response = await Fetch.post('/sede/store',json)

        if(response.status){
            Store.dispatch('add_sede',response.sede)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        
        return response
    }

}

export default Controller