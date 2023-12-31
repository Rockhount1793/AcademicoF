    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'index': async function(cb){

            let sede = Store.state.actual_sede
            let lectivo = Store.state.actual_lectivo
            let grado = Store.state.actual_grado
            let json = {'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id}

            const response = await Fetch.post('/matricula/index',json)

            if(response.status){
                Store.commit('set_matriculas', response.matriculas)
                cb()
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'store': async function(json,cb){

            const response = await Fetch.post('/matricula/store',json)
            
            if(response.status){
                Store.dispatch('add_matricula',response.matricula)
                cb()
            }else{
                alert("Matricula ya existe!")
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        },

        'delete': async function(json){
            
            const response = await Fetch.delete('/matricula/delete',json)
            
            if(response.status){
                Store.dispatch('remove_matricula',json)
            }

            if(response.error == 500){
                Aplicacion.redirect_end_sesion(response)
            }
            
        }

    }

    export default Controller