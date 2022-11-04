    
    import Store from '@/store/'
    import Config from '@/config/'

    // 'Content-Type': 'application/x-www-form-urlencoded',
    
    const _urlsb = ()=>{ return Config.get('app','urlsb') }
    
    const request = {

        'query' : async function( method, ext, json ){

            const options = {
            
                method: method,
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json;charset=UTF-8",
                },
                body: JSON.stringify(json),
            
            }
            
            const res = await fetch(_urlsb() + '/api' + ext , options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                //Store.commit('set_user',data)

            })
            .catch((error) => {
                console.error('timeout exceeded') 
            })

        }

    }

    export default request