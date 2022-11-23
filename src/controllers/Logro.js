    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(asignatura_id, cb){

            let sede = Store.state.actual_sede
            let lectivo = Store.state.actual_lectivo
            let grado = Store.state.actual_grado

            let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id, 'asignatura_id': asignatura_id}

            const response = await Fetch.post('/logro/index',json)

            if(response.error === 0){
                
                Store.commit('set_logros', response.logros)
                Aplicacion.loading(false)
                cb()

            }

            if(response.error === 500){
                Aplicacion.redirect_home(response)
            }

        },

        'update': async function(json){

            const response = await Fetch.put('/logro/update',json)
            if(response.error === 0){
                console.log(response)
                Aplicacion.loading(false)
            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller