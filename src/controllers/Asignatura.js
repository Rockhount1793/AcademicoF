    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let grado = Store.state.actual_grado
        let json = {'sede_id':sede.sede_id,'lectivo_id':lectivo.lectivo_id,'grado_id':grado.grado_id}

        const response = await Fetch.post('/asignatura/index',json)

        if(response.status){
            Store.commit('set_asignaturas', response.asignaturas)
            Store.commit('set_logros', [])
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'store': async function(json){

        const response = await Fetch.post('/asignatura/store',json)
        
        if(response.status){
            Store.dispatch('add_asignatura',response.asignatura)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'update': async function(json){

        const response = await Fetch.put('/asignatura/update',json)

        if(response.status){
          Store.dispatch('update_asignatura',json)
        }

        if(response.error == 500){
           Aplicacion.redirect_end_sesion(response)
        }
        return response
    }
}

export default Controller