    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(){

        let json = Store.state.actual_sede

        const response = await Fetch.post('/anexo_estudiante/index',json)

        if(response.status){
            Store.commit('set_estudiantes', response.estudiantes)
        }

        if(response.error == 500){
           Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'index_estudiante_id': async function(json){

        const response = await Fetch.post('/anexo_estudiante/index/estudiante_id',json)

        if(!response.status){
            Aplicacion.redirect_end_sesion("Estudiante no encontrado!") 
        }

        if(response.error == 500){
           Aplicacion.redirect_end_sesion(response)
        }

        return response
    }

}

export default Controller