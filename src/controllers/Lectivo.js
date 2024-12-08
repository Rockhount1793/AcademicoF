    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(){
        
        const response = await Fetch.post('/lectivo/index')
       
        if(response.status){
            Store.commit('set_lectivos', response.lectivos)
        }

        if(response.error > 0){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'store': async function(json){

        const response = await Fetch.post('/lectivo/store',json)

        if(response.status){
            Store.dispatch('add_lectivo',response.lectivo)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    }

}

export default Controller