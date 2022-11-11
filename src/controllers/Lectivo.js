    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(json){
            
            const response = await Fetch.post('/lectivo/index',json)
           
            if(response.error === 0){

                Store.commit('set_lectivos', response.lectivos)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            
            const response = await Fetch.post('/lectivo/store',json)

            if(response.error === 0){

                Store.dispatch('add_lectivo',response.lectivo)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller