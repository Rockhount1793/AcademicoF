    
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

            if(response.error === 500){
                console.log(response.error)
               // Aplicacion.redirect_home(response)
            }

        },

        'index_identificacion': async function(json, cb){

            const response = await Fetch.post('/estudiante/index/identificacion', json )

            if(response.error === 0){

                cb(response)
                
            }

            if(response.error === 400){

                alert(response.message)
                
            }

            if(response.error === 500){
               Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            const response = await Fetch.post('/estudiante/store',json)

            if(response.error === 0){
                alert('Estudiante creado!')
                Store.dispatch('add_estudiante',response.estudiante)
            }

            if(response.error == 400){
                alert(response.message)
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response,'Entrar')
            }
            
        },

        'update': async function(json){

            const response = await Fetch.put('/estudiante/update',json)

            if(response.error === 0){
              Store.dispatch('update_estudiante',json)
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }
            
        }

    }

    export default Controller