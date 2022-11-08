    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    import Router from "@/router"
    
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
                    this.loading(false)
                    cb()
                }

                if(response.error == 500){

                    //console.log('consulta fallo')
                    this.redirect_home(response)
            
                }

            }else{
                cb()
            }
    
        },

    }

    export default Controller