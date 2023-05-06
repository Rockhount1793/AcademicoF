    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            const response = await Fetch.post('/director/index')

            if(response.status){
                Store.commit('set_directores', response.directores)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/director/store',json)

            if(response.status){
                Store.dispatch('add_director',response.director)
            }else{
                alert("Rector ya existe!")
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }

    }

    export default Controller