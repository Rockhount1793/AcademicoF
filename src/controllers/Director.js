    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            let json = Store.state.actual_sede

            const response = await Fetch.post('/director/index',json)

            if(response.error === 0){
                Store.commit('set_directores', response.directores)
            }

            if(response.error === 500){
                Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            const response = await Fetch.post('/director/store',json)

            if(response.error === 0){

                Store.dispatch('add_director',response.director)

            }

            if(response.error == 400){
                alert(response.message)
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller