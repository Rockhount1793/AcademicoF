    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Utilities from '@/utilities'

    const Controller = {

        'index': async function(){
            
            const response = await Fetch.get('/sede/index')
           
            if(response.error === 0){

                Store.commit('set_sedes', response.sedes)

                const config = Aplicacion.read_config('sede_id')
                
                if(config.status){
    
                    let array_result = response.sedes.filter((s)=> s.sede_id == config.sede_id )
                    
                    if(array_result.length){ Store.commit('set_actual_sede',array_result[0]) }
    
                }
                      
            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            
            const response = await Fetch.post('/sede/store',json)

            if(response.error === 0){

                Store.dispatch('add_sede',response.sede)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }

    }

    export default Controller