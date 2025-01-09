    
import Store  from "@/store"
import Fetch from "@/fetch"
import Utilities from "@/utilities"
import AplicacionStore from "@/store/Aplicacion"
import Router from "@/router"
import Config from "@/config"

const Controller = {
       
    'loading': function(boolean){ 
        if(boolean){
            AplicacionStore.commit('set_loading',boolean) 
        }else{
            setTimeout(()=>{
                AplicacionStore.commit('set_loading',boolean) 
            },400)
        }
    },

    'redirect_end_sesion': function(error){
    
        if(Config.status === 'development'){
           console.log(error)
        }else{
            this.cerrar_sesion()
        }

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
            
            Router.push({'name':'Inicio'})

        }else{
            alert("Usuario no encontrado!")
        }

        if(response.error == 401){
            alert('¡Contraseña incorrecta!')
        }
        return response
    },

    'checkToken': async function(){

        const response = await Fetch.get('/index')
        if(response.status){
            Store.commit('set_usuario',response.usuario)
            Store.commit('set_token',localStorage.getItem('token'))
            Store.commit('set_login',true)
            this.set_config_user(response.usuario)
        }
    
        return response
    },

    'read_config': function(string_config){

        try {
            return Utilities.check_config(string_config)    
        } catch (error) {
            console.log(error)
            return {"status":false}
        }

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