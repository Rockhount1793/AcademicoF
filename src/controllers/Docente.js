    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(){

            const response = await Fetch.post('/docente/index')

            if(response.status){
                Store.commit('set_docentes', response.docentes)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/docente/store',json)

            if(response.status){
                Store.dispatch('add_docente',response.docente)
            }else{
                alert("Docente ya existe!")
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        },

        'update': async function(json){

            const response = await Fetch.put('/docente/update', json)

            if(response.status){
                Store.dispatch('update_docente',json)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }

    }

    export default Controller