    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import  Router  from "@/router"
    import {  useRoute, useRouter }  from "vue-router"
    import Utilities from '@/utilities'
    
    const token = ()=>{ return Store.state.token }

    const Controller = {

        'loading': function(boolean){ Store.commit('set_loading',boolean) },
        'mini_loading': function(boolean){ Store.commit('set_mini_loading',boolean) },

        'redirect_home': function(error){
        
            console.log(error)
            localStorage.removeItem('token')
            Store.commit('set_login',false)
            Store.commit('set_usuario',{'usuario_id':0, 'avatar': 'default.png'})
            Router.push({'name':'Bienvenida'})
            this.loading(false)
            this.mini_loading(false)
    
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

                if(json.sesion){
                    localStorage.setItem('token',response.token)
                }

                Router.push({ 'name':'Sedes' })

            }else{

                this.redirect_home(response)

            }

        },

        'check_login': async function(cb){

            let status = Store.state.login
            let bool_token = localStorage.getItem('token') ? true : false
            
            if(!status && bool_token ){
    
                this.loading(true)
    
                const response = await Fetch.get('/index')

                if(response.error === 0){
    
                    Store.commit('set_usuario',response.usuario)
                    Store.commit('set_login',true)
                    this.load_default_config()
                    this.loading(false)
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
    
                this.loading(true)
    
                const response = await Fetch.get('/index')

                if(response.error === 0){
    
                    Store.commit('set_usuario',response.usuario)
                    Store.commit('set_login',true)
                    this.loading(false)
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

            if(sede_id.status && nombre_sede.status){

                Store.commit('set_actual_sede', { 'sede_id': sede_id.sede_id,'nombre_sede': nombre_sede.nombre_sede})

            }

        }
    }

    export default Controller