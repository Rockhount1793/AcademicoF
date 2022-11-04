import { createStore } from 'vuex'
import Config from '../config/index.js'

const _urlsf = ()=>{ return Config.get('app','urlsf') }
const _urlsb = ()=>{ return Config.get('app','urlsb') }
const _version = ()=>{ return Config.version }

const store = createStore({
    
    state () {
        return {
            version: _version(),
            urlsf: _urlsf(),
            urlsb: _urlsb(),
            pokemon: []
        }
    },
    
    mutations: {
        
        increment (state) {
            state.count++
        }

    
    }

})


export default store