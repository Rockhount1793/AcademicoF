    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            const response = await Fetch.get('/grado/index')

            if(response.error === 0){
                Store.commit('set_grados', response.grados)
            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/grado/store',json)

            if(response.error === 0){

                Store.dispatch('add_grado',response.grado)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller