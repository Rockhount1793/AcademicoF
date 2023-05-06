    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Utilities from "@/utilities"

    const Controller = {

        'index': async function(){

            let json = Store.state.actual_sede
            const response = await Fetch.get('/sede/index', json)
           
            if(response.status){

                Store.commit('set_sedes', response.sedes)

                //existe la configurtación 'sede_id' ? 
                const config = Aplicacion.read_config('sede_id')
                
                if(config.status){
    
                    let array_result = response.sedes.filter((s)=> s.sede_id == config.sede_id )
                    
                    if(array_result.length){ Store.commit('set_actual_sede',array_result[0]) }
    
                }

                      
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }


        },

        'store': async function(json,cb){

            
            const response = await Fetch.post('/sede/store',json)

            if(response.status){

                Store.dispatch('add_sede',response.sede)
                cb()
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }

    }

    export default Controller