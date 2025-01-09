
import Store  from "@/store"
import Fetch from "@/fetch"

const Controller = {

    'index': async function(){

        let sede = Store.state.actual_sede
        let lectivo = Store.state.actual_lectivo
        let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id}

        const response = await Fetch.post('/grado/index',json)

        if(response.status){
            Store.commit('set_grados', response.grados)
        }

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }

        return response
    },

    'store': async function(json){

        const response = await Fetch.post('/grado/store',json)

        if(response.status){
            Store.dispatch('add_grado',response.grado)
        }

        if(response.error == 500){
            alert("Error interno de la aplicación!")
            //Aplicacion.redirect_end_sesion(response)
        }
        return response
    }

}
export default Controller