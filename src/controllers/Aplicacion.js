    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import  Router  from "@/router"
    import Utilities from "@/utilities"
    import Config from "@/config"

    const Controller = {

        'loading': function(boolean){ Store.commit('set_loading',boolean) },
        'mini_loading': function(boolean){ Store.commit('set_mini_loading',boolean) },

        'redirect_end_sesion': function(error){
        
            if(Config.status === 'development'){
               console.log(error)
            }

            this.cerrar_sesion()

            //this.loading(false)
            //this.mini_loading(false)
    
        },

        'set_config_user': function(usuario){

            let check_sede_id = Utilities.check_usuario_config(usuario,'sede_id')
            let check_nombre_sede = Utilities.check_usuario_config(usuario,'nombre_sede')

            let check_lectivo_id = Utilities.check_usuario_config(usuario,'lectivo_id')
            let check_numero_lectivo = Utilities.check_usuario_config(usuario,'numero_lectivo')
        
            if(check_sede_id.status && check_nombre_sede.status){
                Store.commit('set_actual_sede',{ 'sede_id': check_sede_id.sede_id ,'nombre': check_nombre_sede.nombre_sede} )
            }

            if(check_lectivo_id.status && check_numero_lectivo.status){
                Store.commit('set_actual_lectivo',{ 'lectivo_id': check_lectivo_id.lectivo_id, 'numero': check_numero_lectivo.numero_lectivo })
            }

        },

        'login': async function(json){
            
           const response = await Fetch.post('/login', json)
           
            if(response.status){

                Store.commit('set_usuario', response.usuario)
                Store.commit('set_token', response.token)
                Store.commit('set_login',true)

                this.set_config_user(response.usuario)
                
                if(json.sesion == true){
                    localStorage.setItem('token',response.token)
                }
                
                Store.commit('set_seccion_num',[1,0])
                Router.push({ 'name':'Inicio' })

            }else{
                alert("Usuario no encontrado!")
            }

            if(response.error == 401){
                alert('¡Contraseña incorrecta!')
            }

        },

        'check_login': async function(cb){

            let status = Store.state.login
            let bool_token = localStorage.getItem('token') ? true : false
            
            if(status){
                cb()
            }else{

                if(bool_token){
    
                    const response = await Fetch.get('/index')
    
                    if(response.status){
        
                        Store.commit('set_usuario',response.usuario)
                        Store.commit('set_token', localStorage.getItem('token'))
                        Store.commit('set_login',true)
                        
                        this.set_config_user(response.usuario)
    
                        cb()

                    }
    
                    if(response.error > 0){
    
                        this.redirect_end_sesion(response)
                
                    }
    
                }else{
                    
                    if(Router.currentRoute.value.name != 'Entrar'){
                        this.redirect_end_sesion('No found session!')
                    }
                
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

        'cerrar_sesion': async function(){
            
            await Store.dispatch('clear_data_sesion')
            .then((res)=>{
                if(res){
                    Router.push({'name':'Bienvenida'})
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
              
            })
              
        }

    }

    export default Controller