    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            const response = await Fetch.get('/docente/index')

            if(response.error === 0){
                Store.commit('set_docentes', response.docentes)
            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/docente/store',json)

            if(response.error === 0){

                Store.dispatch('add_docente',response.docente)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller