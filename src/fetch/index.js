    
    import Store from '@/store/'
    import Config from '@/config/'
    import Aplicacion from '@/controllers/Aplicacion'
    
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
                    'Content-Type': "application/json;charset=UTF-8"
                }

            }

            options.headers[ Config.get('app','token_header_key') ] = this.token()

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
                },

                body: JSON.stringify(body)

            }

            options.headers[ Config.get('app','token_header_key') ] = this.token()
            
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
                    'Content-Type': "application/json;charset=UTF-8"
                },

                body: JSON.stringify(body)

            }

            options.headers[ Config.get('app','token_header_key') ] = this.token()

            Aplicacion.loading(true)
            
            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => {

                console.debug('Response', response)

                return response.json()
            })
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
                    'Content-Type': "application/json;charset=UTF-8"
                },

                body: JSON.stringify(body)

            }
            
            options.headers[ Config.get('app','token_header_key') ] = this.token()

            Aplicacion.loading(true)

            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) =>{ 
            
                if(response.headers.get("content-type").includes("application/json")){
                    return response.json()
                }
                
                if(response.headers.get("content-type").includes("application/pdf")){
                    return response.blob()
                }

            })
            .then((data) => {
                
                if (data instanceof Blob) {
                    return {"status":true, data }
                } else if (typeof data === 'object') {
                    return data
                }

            })
            .catch((error) => {

                console.log(error)
                console.error('timeout exceeded') 
                return {"error": 500 }

            }).finally(()=>{
                 Aplicacion.loading(false)
            })

            return res

        },
        
        'delete': async function(ext, body){
            let options = {
            
                method: 'DELETE',

                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json;charset=UTF-8",
                },

                body: JSON.stringify(body)

            }

            options.headers[ Config.get('app','token_header_key') ] = this.token()
            
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
        }
    }

    export default request