import { createStore } from 'vuex'
import Config from '@/config'
import Utilities from '@/utilities'

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
            loading: false,
            mini_loading: false,
            usuario: {'usuario_id':0, 'avatar':'default.png'},
            token: '',
            login: false,
            secciones:{
                'Sedes': 1,  
                'Lectivos': 2,  
                'Grados': 3,  
                'Asignaturas': 4,  
                'Logros': 5,  
                'Calificaciones': 6,  
                'Matriculas': 7,  
                'Docentes': 8,  
                'Estudiantes': 9,  
                'Personas': 10, 
                'Directores': 11, 
                'Generables': 12 
            },
            seccion_num: [0,0],
            config:[{ 'name':'sede_id','valor':0}],

            //# aplicacion
            sedes: [],
            actual_sede: {'sede_id': 0, 'nombre_sede':'No seleccionada!'},
            actual_lectivo: {'lectivo_id': 0, 'numero_lectivo': 0, 'sede_id': 0, 'director_id': 0},
            lectivos: [],
            directores: []

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

        set_actual_sede(state,json){ 
            state.actual_sede = json
        },

        set_lectivos(state,array){ 
            state.lectivos = array
        },

        set_actual_lectivo(state,json){ 
            state.actual_lectivo = json
        },

        set_directores(state,array){ 
            state.directores = array
        },

    
    },

    actions:{

        async change_sede(state,json){

            const result = await this.dispatch('clear_data')
            .then((res)=>{

                if(res){

                    Utilities.set_config({"sede_id": json.sede_id})
                    this.commit('set_actual_sede',json)
                    
                }

            })
            .catch((err)=>{
                console.log(err)
               // window.location.reload()
            })
            .finally(()=>{

            })
        },

        async change_lectivo(state,json){

            Utilities.set_config({'numero_lectivo':json.numero_lectivo})
            this.commit('set_actual_lectivo',json)
                    
        },

        async clear_data(){

            return await new Promise((res,rej)=>{
                
                this.commit('set_actual_lectivo',{'lectivo_id': 0, 'numero_lectivo': 0, 'sede_id': 0, 'director_id': 0})
                this.commit('set_lectivos',[])
                this.commit('set_directores',[])

                res(true)

            })

        },

        add_sede(state, json){
            
            let sedes = this.state.sedes
            const result = [...sedes, json]
            this.commit('set_sedes',result)
        
        },

        add_lectivo(state, json){
            
            let lectivos = this.state.lectivos
            const result = [...lectivos, json]
            this.commit('set_lectivos',result)
        
        },

        add_director(state, json){
            
            let directores = this.state.directores
            const result = [...directores, json]
            this.commit('set_directores',result)
        
        }

    }

})


export default store