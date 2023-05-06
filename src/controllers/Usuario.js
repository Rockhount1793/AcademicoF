    
    import Fetch from "@/fetch"
    import Aplicacion from "@/controllers/Aplicacion"
    
    const Controller = {

        'update': async function(json){

            const response = await Fetch.put('/usuario/update',json)

            if(response.error > 500){
                Aplicacion.redirect_end_sesion(response)
            }

        }

    }

    export default Controller