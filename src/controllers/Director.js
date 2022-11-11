    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            const response = await Fetch.get('/director/index')

            if(response.error === 0){
                Store.commit('set_directores', response.directores)
            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            const response = await Fetch.post('/director/store',json)

            if(response.error === 0){

                Store.dispatch('add_director',response.director)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller