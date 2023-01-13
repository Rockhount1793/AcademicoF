    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){

            let sede = Store.state.actual_sede
            let lectivo = Store.state.actual_lectivo
            let grado = Store.state.actual_grado
            let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id}

            const response = await Fetch.post('/matricula/index',json)

            if(response.error === 0){
                Store.commit('set_matriculas', response.matriculas)
                cb()
            }

            if(response.error === 500){
                Aplicacion.redirect_home(response)
            }

        },

        'store': async function(json,cb){

            const response = await Fetch.post('/matricula/store',json)
            
            if(response.error === 0){

                Store.dispatch('add_matricula',response.matricula)
                cb()
            }

            if(response.error == 400){
                alert(response.message)
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }
            
        },

        'delete': async function(json){
            
        }

    }

    export default Controller