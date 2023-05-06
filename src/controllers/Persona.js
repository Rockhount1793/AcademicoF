    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){

            let json = Store.state.actual_sede

            const response = await Fetch.post('/persona/index',json)

            if(response.status){
                Store.commit('set_personas', response.personas)
                cb()
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/persona/store',json)

            if(response.status){
                Store.dispatch('add_persona',response.persona)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }


    }

    export default Controller