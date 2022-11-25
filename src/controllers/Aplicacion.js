    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import  Router  from "@/router"
    import { useRoute, useRouter } from "vue-router"
    import Utilities from "@/utilities"
    import Config from "@/config"

    
    const token = ()=>{ return Store.state.token }

    const Controller = {

        'loading': function(boolean){ Store.commit('set_loading',boolean) },
        'mini_loading': function(boolean){ Store.commit('set_mini_loading',boolean) },

        'redirect_home': function(error){
        
            if(Config.status === 'development'){
                console.log(error)
            }

            localStorage.removeItem('token')
            Store.commit('set_login',false)
            Store.commit('set_seccion_num',[0,0])
            Store.commit('set_usuario',{'usuario_id':0, 'avatar': 'default.png'})
            Router.push({'name':'Bienvenida'})
            //this.loading(false)
            //this.mini_loading(false)
    
        },

        'set_config_user': function(usuario){

            let check_sede_id = Utilities.check_usuario_config(usuario,'sede_id')
            let check_nombre_sede = Utilities.check_usuario_config(usuario,'nombre_sede')

            let check_lectivo_id = Utilities.check_usuario_config(usuario,'lectivo_id')
            let check_numero_lectivo = Utilities.check_usuario_config(usuario,'numero_lectivo')
        
            if(check_sede_id.status && check_nombre_sede.status){
            
                Store.commit('set_actual_sede',{ 'sede_id': check_sede_id.sede_id ,'nombre_sede': check_nombre_sede.nombre_sede} )
            }

            if(check_lectivo_id.status && check_numero_lectivo.status){
                Store.commit('set_actual_lectivo',{ 'lectivo_id': check_lectivo_id.lectivo_id ,'numero_lectivo': check_numero_lectivo.numero_lectivo} )
            }

        },

        'erase_token': function(error){
        
            console.log(error)
            localStorage.removeItem('token')
            this.loading(false)
            this.mini_loading(false)
    
        },

        'login': async function(json){
            
           const response = await Fetch.post('/login', json)
           
            if(response.error === 0){

                Store.commit('set_usuario', response.usuario)
                Store.commit('set_token', response.token)
                Store.commit('set_login',true)

                this.set_config_user(response.usuario)
                
                if(json.sesion){
                    localStorage.setItem('token',response.token)
                }
                
                Store.commit('set_seccion_num',[1,0])
                Router.push({ 'name':'Sedes' })

            }else{

                this.redirect_home(response)

            }

        },

        'check_login': async function(cb){

            let status = Store.state.login
            let bool_token = localStorage.getItem('token') ? true : false
            
            if(!status && bool_token ){
    
                const response = await Fetch.get('/index')

                if(response.error === 0){
    
                    Store.commit('set_usuario',response.usuario)
                    Store.commit('set_login',true)
                    
                    this.set_config_user(response.usuario)

                    cb()
                }

                if(response.error > 0){

                    this.redirect_home(response)
            
                }

            }else{
                cb()
            }
    
        },

        'check_login_home': async function(cb){

            let status = Store.state.login
            let bool_token = localStorage.getItem('token') ? true : false
            
            if( status || bool_token ){
    
                const response = await Fetch.get('/index')

                if(response.error === 0){
    
                    Store.commit('set_usuario',response.usuario)
                    this.set_config_user(response.usuario)
                    Store.commit('set_login',true)
                    cb()
                }

                if(response.error > 0){

                    this.erase_token(response)
            
                }

            }
    
        },

        'read_config': function(string_config){

            try {
                
                return Utilities.check_config(string_config)
                
            } catch (error) {

                console.log(error)
                return {'status':false }
            }

        },

        'check_seccion': function(){

            setTimeout(()=>{
                if(Store.state.seccion_num[0] == 0){
                    const secciones = Store.state.secciones
                    const num = secciones[Router.currentRoute.value.name]
                    Store.commit('set_seccion_num',[num,0])
                }
            },200)


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