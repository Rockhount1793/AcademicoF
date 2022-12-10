    
    import Store from '@/store/'
    import Config from '@/config/'
    import Aplicacion from '@/controllers/Aplicacion'

    // 'Content-Type': 'application/x-www-form-urlencoded',
    
    const _urlsb = ()=>{ return Config.get('app','urlsb') }
    const _token = ()=>{ return Store.state.token }
    
    const request = {

        'token': function(){
            
            let bool_token_l = localStorage.getItem('token') ? true : false
            let bool_token_s = Store.state.token ? true : false
            var token = ''

            if(bool_token_l){
            
                token = localStorage.getItem('token')
            
            }else if(bool_token_s){
            
                token = _token()
            
            }

            return token

        },
        
        'get' : async function(ext){

            let options = {
            
                method: 'GET',

                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json;charset=UTF-8",
                    '_token': this.token()
                }

            }
            
            Aplicacion.loading(true)

            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => response.json())
            .then((data) => {
                
                return data

            })
            .catch((error) => {

                console.log(error)
                console.error('timeout exceeded') 
                return {'error': 500 }

            }).finally(()=>{
                Aplicacion.loading(false)
            })


            return res

        },

        'post' : async function(ext, body){
            
            let options = {
            
                method: 'POST',

                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json;charset=UTF-8",
                    '_token': this.token()
                },

                body: JSON.stringify(body)

            }
            
            Aplicacion.loading(true)

            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => response.json())
            .then((data) => {
                
                return data

            })
            .catch((error) => {

                console.log(error)
                console.error('timeout exceeded') 
                return {'error': 500 }

            }).finally(()=>{
                Aplicacion.loading(false)
            })

            return res

        },

        'put' : async function(ext, body){

            let options = {
            
                method: 'PUT',

                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json;charset=UTF-8",
                    '_token': this.token()
                },

                body: JSON.stringify(body)

            }

            Aplicacion.loading(true)
            
            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => response.json())
            .then((data) => {
                
                return data

            })
            .catch((error) => {

                console.log(error)
                console.error('timeout exceeded') 
                return {'error': 500, 'message':'query failed' }

            }).finally(()=>{
                Aplicacion.loading(false)
            })

            return res

        },

        'post_download' : async function(ext, body){
            
            let options = {
            
                method: 'POST',

                headers: {
                    'Accept': "application/json",
                    'responseType': 'blob',
                    'Content-Type': "application/json;charset=UTF-8",
                    '_token': this.token()
                },

                body: JSON.stringify(body)

            }
            
            Aplicacion.loading(true)

            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => response.blob())
            .then((data) => {
                
                return {'error':0, 'data': data }

            })
            .catch((error) => {

                console.log(error)
                console.error('timeout exceeded') 
                return {'error': 500 }

            }).finally(()=>{
                Aplicacion.loading(false)
            })

            return res

        }
        
    }

    export default request