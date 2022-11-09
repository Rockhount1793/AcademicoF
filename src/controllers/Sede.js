    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/aplicacion"

    const usuario = ()=>{ return Store.state.usuario }

    const Controller = {

        'index': async function(){
            
            const response = await Fetch.get('/sede/index')
           
            if(response.error === 0){

                Store.commit('set_sedes', response.sedes)

            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }


        },

        'store': async function(json){

            
            const response = await Fetch.post('/sede/store',json)

            if(response.error === 0){

                Store.dispatch('add_sede',response.sede)

            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller