    
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index_matriculas': async function(){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let grado = Store.state.actual_grado
        let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id}

        const response = await Fetch.post('/calificacion/index_matriculas',json)

        if(response.status){
            Store.commit('set_calificaciones',response.calificaciones)
        }

        if(response.error == 500){
            Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'update': async function(json){
        const response = await Fetch.put('/calificacion/update',json)
        if(response.error > 0){
            Aplicacion.redirect_end_sesion(response)
        }
        return response
    }

}

export default Controller