import { createStore } from 'vuex'
import Config from '@/config'

const _urlsf = ()=>{ return Config.get('app','urlsf') }
const _urlsb = ()=>{ return Config.get('app','urlsb') }
const _version = ()=>{ return Config.version }

const store = createStore({
    
    state () {
        return {
            
            version: _version(),
            urlsf: _urlsf(),
            urlsb: _urlsb(),
            user:{},
            token: '',
            login: false

        }
    },
    
    mutations: {
        
        set_user(state,json){ 
            state.login = true
            state.user = json 
        }

    
    }

})


export default store