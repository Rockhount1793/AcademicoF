    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){

            let json = Store.state.actual_sede

            const response = await Fetch.post('/docente/index',json)

            if(response.error === 0){
                Store.commit('set_docentes', response.docentes)
                cb()
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/docente/store',json)

            if(response.error === 0){
                Store.dispatch('add_docente',response.docente)
            }

            if(response.error == 400){
                alert(response.message)
            }

            if(response.error == 500){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller