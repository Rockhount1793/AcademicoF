import { createStore } from 'vuex'
import Config from '@/config'

const _urlsf = ()=>{ return Config.get('app','urlsf') }
const _urlsb = ()=>{ return Config.get('app','urlsb') }
const _version = ()=>{ return Config.version }

const store = createStore({
    
    state () {
        return {
            
            //# generales
            version: _version(),
            urlsf: _urlsf(),
            urlsb: _urlsb(),
            loading:false,
            mini_loading: false,
            usuario:{'usuario_id':0, 'avatar':'default.png'},
            token: '',
            login: false,
            seccion_num: [1,0],

            //# aplicacion
            sedes:[]

        }
    },
    
    mutations: {

        set_seccion_num(state,array){
            state.seccion_num = array
        },
        
        set_usuario(state,json){
            state.usuario = json 
        },

        set_login(state,bool){ 
            state.login = bool
        },

        set_token(state,string){ 
            state.token = string 
        },

        set_loading(state,bool){ 
            state.loading = bool 
        },

        set_mini_loading(state,bool){ 
            state.mini_loading = bool 
        },

        set_sedes(state,array){ 
            state.sedes = array
        },

    
    }

})


export default store