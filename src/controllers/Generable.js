    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"

    const sede = ()=>{ return Store.state.actual_sede }
    const lectivo = ()=>{ return Store.state.actual_lectivo }
    const grado = ()=>{ return Store.state.actual_grado }
    const periodo = ()=>{ return Store.state.actual_periodo }

    const Controller = {

        'boletin_todos_file': async function(cb){

            let json = {
                'periodo':periodo().periodo,
                'nombre_periodo': periodo().nombre,
                'nombre_sede': sede().nombre,
                'sede_id': sede().sede_id,
                'lectivo': lectivo().numero,
                'lectivo_id': lectivo().lectivo_id,
                'grado_id': grado().grado_id
            }

            const response = await Fetch.post_download('/generable/boletin_todos_file',json)

            if(response.error === 0){
    
                var fileURL = window.URL.createObjectURL(new Blob([response.data]))
                var fURL = document.createElement('a')
                fURL.href = fileURL
                fURL.setAttribute('download', 'Boletines_'+sede().nombre+'_'+grado().nombre+'.pdf')
                document.body.appendChild(fURL)
                fURL.click()
    
                cb()
    
            }

            if(response.error === 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'boletin_estudiante_file': async function(params,cb){
            
            let json = {
                ...params,
                'periodo':periodo().periodo,
                'nombre_periodo': periodo().nombre,
                'nombre_sede': sede().nombre,
                'sede_id': sede().sede_id,
                'lectivo': lectivo().numero,
                'lectivo_id': lectivo().lectivo_id,
                'grado_id': grado().grado_id
            }

            const response = await Fetch.post_download('/generable/boletin_estudiante_file',json)

            if(response.error === 0){
    
                var fileURL = window.URL.createObjectURL(new Blob([response.data]))
                var fURL = document.createElement('a')
                fURL.href = fileURL
                fURL.setAttribute('download', 'Boletin_'+params.nombres.split(" ")[0] +'_'+ params.identificacion+'.pdf')
                document.body.appendChild(fURL)
                fURL.click()
    
                cb()
    
            }

            if(response.error === 500){
                Aplicacion.redirect_end_sesion(response)
            }

        },

        'boletin_estudiante_vista': async function(params,cb){
            
            let json = {
                ...params,
                'periodo':periodo().periodo,
                'nombre_periodo': periodo().nombre,
                'nombre_sede': sede().nombre,
                'sede_id': sede().sede_id,
                'lectivo': lectivo().numero,
                'lectivo_id': lectivo().lectivo_id,
                'grado_id': grado().grado_id
            }
            
            const response = await Fetch.post('/generable/boletin_estudiante_vista',json)
        
            if(response.error === 0){
                
                Store.commit('set_boletin',response.boletin)
                cb()
    
            }

            if(response.error === 500){
                Aplicacion.redirect_end_sesion(response)
            }


        }


    }

    export default Controller