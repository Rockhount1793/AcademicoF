    
import Store  from "@/store"
import Fetch from "@/fetch"

const Controller = {

    'index': async function(asignatura_id){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let grado = Store.state.actual_grado

        let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id, 'asignatura_id': asignatura_id}

        const response = await Fetch.post('/logro/index',json)

        if(response.status){
            Store.commit('set_logros', response.logros)
        }

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'update': async function(json){

        console.log('update:')
        console.log('json = ' + json)
        const response = await Fetch.put('/logro/update',json)

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }
        return response
    }

}

export default Controller