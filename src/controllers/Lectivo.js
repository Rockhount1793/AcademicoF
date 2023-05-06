    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){
            
            const response = await Fetch.post('/lectivo/index')
           
            if(response.status){

                Store.commit('set_lectivos', response.lectivos)
                cb()
            }

            if(response.error > 0){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json,cb){

            const response = await Fetch.post('/lectivo/store',json)

            if(response.status){
                Store.dispatch('add_lectivo',response.lectivo)
                cb()
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }


    }

    export default Controller