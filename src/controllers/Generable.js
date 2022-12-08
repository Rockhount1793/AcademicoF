    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const Controller = {

        'boletin': async function(params,cb){

            let sede = Store.state.actual_sede
            let lectivo = Store.state.actual_lectivo
            let grado = Store.state.actual_grado
            let json = {...params ,'sede_id': sede.sede_id, 'lectivo_id': lectivo.lectivo_id, 'grado_id': grado.grado_id}

            const response = await Fetch.post_download('/generable/boletin',json)

            if(response.error === 0){

                var fileURL = window.URL.createObjectURL(new Blob([response.data]))
                var fURL = document.createElement('a')
                fURL.href = fileURL
                fURL.setAttribute('download', 'Boletin_'+params.archivo+'.pdf')
                document.body.appendChild(fURL)
                fURL.click()

                cb()

            }

            if(response.error === 500){
                //Aplicacion.redirect_home(response)
            }

        },

        'store': async function(json){

            const response = await Fetch.post('/asignatura/store',json)
            if(response.error === 0){

                Store.dispatch('add_asignatura',response.asignatura)

            }

            if(response.error > 0){
                Aplicacion.redirect_home(response)
            }
            
        }


    }

    export default Controller