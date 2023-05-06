    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            let json = Store.state.actual_sede

            const response = await Fetch.post('/estudiante/index',json)

            if(response.error === 0){
                Store.commit('set_estudiantes', response.estudiantes)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/estudiante/store',json)

            if(response.error === 0){
                alert('Estudiante creado!')
                Store.dispatch('add_estudiante',response.estudiante)
            }

            if(response.status){
                alert('Estudiante ya esiste!')
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        },

        'update': async function(json){

            const response = await Fetch.put('/estudiante/update',json)

            if(response.error === 0){
              Store.dispatch('update_estudiante',json)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }

    }

    export default Controller