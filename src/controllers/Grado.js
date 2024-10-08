
import Store  from "@/store"
import Fetch from "@/fetch"
import Aplicacion from "@/controllers/Aplicacion"

const Controller = {

    'index': async function(cb){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id}

        const response = await Fetch.post('/grado/index',json)

        if(response.status){
            Store.commit('set_grados', response.grados)
            cb()
        }

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }

    },

    'store': async function(json,cb){

        const response = await Fetch.post('/grado/store',json)

        if(response.status){
            Store.dispatch('add_grado',response.grado)
            cb()
        }

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }
        
    }

}
export default Controller