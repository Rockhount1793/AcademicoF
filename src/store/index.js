import { createStore } from 'vuex'
import Config from '@/config'
import Utilities from '@/utilities'
import Usuario from '@/controllers/Usuario'

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
            usuario: {'usuario_id':0, 'avatar':'default.png','configuracion':{}},
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
            actual_grado: { 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 },
            actual_asignatura: { 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 },
            lectivos: [],
            grados:[],
            logros:[],
            asignaturas:[],
            calificaciones:[],
            matriculas:[],
            estudiantes:[],
            docentes:[],
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

        set_grados(state,array){ 
            state.grados = array
        },

        set_actual_grado(state, json){
            state.actual_grado = json
        },

        set_actual_asignatura(state, json){
            state.actual_asignatura = json
        },

        set_asignaturas(state,array){
            state.asignaturas = array
        },

        set_calificaciones(state,array){
            state.calificaciones = array
        },

        set_matriculas(state,array){
            state.matriculas = array
        },
        
        set_estudiantes(state,array){
            state.estudiantes = array
        },

        set_logros(state,array){
            state.logros = array
        },

        set_docentes(state,array){ 
            state.docentes = array
        },

        set_directores(state,array){ 
            state.directores = array
        },

    
    },

    actions:{

        async change_sede(state,json){

            const result = await this.dispatch('clear_data_sede')
            .then((res)=>{

                if(res){

                    //Utilities.set_config({"sede_id": json.sede_id})
                    
                    let usuario = this.state.usuario
                    usuario.configuracion['sede_id'] = json.sede_id
                    usuario.configuracion['nombre_sede'] = json.nombre_sede
                    usuario.configuracion['numero_lectivo'] = 0
                    this.commit('set_usuario',usuario)

                    Usuario.update(usuario)

                    this.commit('set_actual_sede',json)
                    
                }

            })
            .catch((err)=>{
                console.log(err)
                //window.location.reload()
            })
            .finally(()=>{

            })

        },

        async change_lectivo(state,json){

            const result = await this.dispatch('clear_data_lectivo')
            .then((res)=>{

                if(res){
                    
                    let usuario = this.state.usuario
                    usuario.configuracion['lectivo_id'] = json.lectivo_id
                    usuario.configuracion['numero_lectivo'] = json.numero_lectivo
                    this.commit('set_usuario',usuario)
        
                    Usuario.update(usuario)
        
                    this.commit('set_actual_lectivo',json)
                    
                }

            })
            .catch((err)=>{
                console.log(err)
                //window.location.reload()
            })
            .finally(()=>{

            })

        },

        async clear_data_sede(){

            return await new Promise((res,rej)=>{
                
                this.commit('set_actual_lectivo',{'lectivo_id': 0, 'numero_lectivo': 0, 'sede_id': 0, 'director_id': 0})
                this.commit('set_lectivos',[])
                this.commit('set_grados',[])
                this.commit('set_actual_grado',{ 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 })
                this.commit('set_asignaturas',[])
                this.commit('set_actual_asignatura',{ 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 })
                this.commit('set_calificaciones',[])
                this.commit('set_docentes',[])
                this.commit('set_estudiantes',[])
                this.commit('set_directores',[])

                res(true)

            })

        },

        async clear_data_lectivo(){

            return await new Promise((res,rej)=>{
                
                this.commit('set_grados',[])
                this.commit('set_actual_grado',{ 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 })
                this.commit('set_asignaturas',[])
                this.commit('set_actual_asignatura',{ 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 })
                this.commit('set_calificaciones',[])
            
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

        add_grado(state, json){
            
            let grados = this.state.grados
            const result = [...grados, json]
            this.commit('set_grados',result)

        },

        add_asignatura(state,json){

            let asignaturas = this.state.asignaturas
            const result = [...asignaturas, json]
            this.commit('set_asignaturas',result)

        },

        add_matricula(state,json){

            let matriculas = this.state.matriculas
            const result = [...matriculas, json]
            this.commit('set_matriculas',result)

        },

        add_estudiante(state, json){

            let estudiantes = this.state.estudiantes
            const result = [...estudiantes, json]
            this.commit('set_estudiantes',result)

        },

        add_docente(state, json){

            let directores = this.state.docentes
            const result = [...directores, json]
            this.commit('set_docentes',result)

        },

        add_director(state, json){
            
            let directores = this.state.directores
            const result = [...directores, json]
            this.commit('set_directores',result)
        
        }

    }

})


export default store