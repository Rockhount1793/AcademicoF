    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){
            
            let config = Aplicacion.read_config('sede_id')
            let json = Store.state.actual_sede
            if(config.status){
                json = config
            }
            
            if(json.sede_id == 0){

                alert('No hay una sede seleccionada!')
                return 0
            }

            const response = await Fetch.post('/lectivo/index',config)
           
            if(response.error === 0){

                Store.commit('set_lectivos', response.lectivos)
                cb()
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