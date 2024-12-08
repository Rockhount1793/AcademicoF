    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(){

        let json = Store.state.actual_sede

        const response = await Fetch.post('/estudiante/index',json)

        if(response.status){
            Store.commit('set_estudiantes', response.estudiantes)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },
    'store': async function(json){

        const response = await Fetch.post('/estudiante/store',json)

        if(response.status){
            Store.dispatch('add_estudiante',response.estudiante)
            //alert("Estudiante creado!")
        }else{
            alert('Estudiante ya existe!')
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'update': async function(json){

        const response = await Fetch.put('/estudiante/update',json)

        if(response.status){
          Store.dispatch('update_estudiante',json)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    }

}

export default Controller