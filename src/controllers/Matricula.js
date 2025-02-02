    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let grado = Store.state.actual_grado
        let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id}

        const response = await Fetch.post('/matricula/index',json)

        if(response.status){
            Store.commit('set_matriculas', response.matriculas)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'store': async function(json){

        const response = await Fetch.post('/matricula/store',json)
        
        if(response.status){
            Store.dispatch('add_matricula',response.matricula)
        }else{
            alert("Matricula ya existe!")
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }

        return response
        
    },

    'delete': async function(json){
        
        const response = await Fetch.delete('/matricula/delete',json)
        if(response.status){
            Store.dispatch('delete_matricula',json)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'desactive': async function(json){
        
        const response = await Fetch.post('/matricula/desactive',json)
        if(response.status){
            Store.dispatch('desactive_matricula',json)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    },

    'active': async function(json){
        const response = await Fetch.post('/matricula/active',json)
        if(response.status){
            Store.dispatch('active_matricula',json)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    }
}

export default Controller