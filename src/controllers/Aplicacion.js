    
    import Store  from "@/store"
    import Fetch from "@/fetch"
    
    const Controller = {

        'login':function(json){
            
            Fetch.query('POST', '/login', json)
            
        }

    }

    export default Controller