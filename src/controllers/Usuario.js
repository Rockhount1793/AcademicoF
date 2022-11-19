    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import  Router  from "@/router"
    import {  useRoute, useRouter }  from "vue-router"
    import Utilities from '@/utilities'
    
    const token = ()=>{ return Store.state.token }

    const Controller = {

        'update': async function(json){

            const response = await Fetch.put('/usuario/update',json)

                if(response.error === 0){
                    console.log(response)
                }

                if(response.error > 0){

                }

        },

        'load_default_config': function(){

            
            const sede_id = this.read_config('sede_id')
            const nombre_sede = this.read_config('nombre_sede')
            const numero_lectivo = this.read_config('numero_lectivo')
            const director_id = this.read_config('director_id')

            if(sede_id.status && nombre_sede.status){
                Store.commit('set_actual_sede', { 'sede_id': sede_id.sede_id,'nombre_sede': nombre_sede.nombre_sede})
            }

            if(numero_lectivo.status && director_id.status){
                Store.commit('set_actual_lectivo', {'lectivo_id': 0, 'numero_lectivo': numero_lectivo.numero_lectivo, 'sede_id': 0, 'director_id': director_id.director_id})
            }

        }
    }

    export default Controller