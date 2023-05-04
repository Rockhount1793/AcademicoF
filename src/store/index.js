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
            usuario: {'usuario_id':0, 'avatar':'default.png',
            'configuracion':{
                sede_id:null,
                nombre_sede:'',
                numero_lectivo:0,
            }},
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
                'Generables': 12,
                'Faltas': 13 
            },

            periodos:[
                { 'periodo': 1, 'nombre': 'Primero' },
                { 'periodo': 2, 'nombre': 'Segundo' },
                { 'periodo': 3, 'nombre': 'Tercero' },
                { 'periodo': 4, 'nombre': 'Cuarto' },
                { 'periodo': 5, 'nombre': 'Final' }
            ],

            generables:[
               // { 'recurso': 1, 'nombre': 'carnet' },
               // { 'recurso': 2, 'nombre': 'planilla' },
               // { 'recurso': 3, 'nombre': 'informe' },
                { 'recurso': 4, 'nombre': 'boletin' },
               // { 'recurso': 5, 'nombre': 'constancia' }
            ],


            seccion_num: [0,0],
            config:[{ 'name':'sede_id','valor':0}],

            //# aplicacion
            sedes: [],
            actual_sede: {'sede_id': 0, 'nombre':'No seleccionada!'},
            actual_lectivo: {'lectivo_id': 0, 'numero': 0, 'sede_id': 0, 'director_id': 0},
            actual_grado: { 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 },
            actual_periodo: { 'periodo': 0, 'nombre': 'Periodo' },
            actual_generable: { 'recurso': 0, 'nombre': 'Generable' },
            actual_asignatura: { 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 },
            lectivos: [],
            grados:[],
            logros:[],
            asignaturas:[],
            calificaciones:[],
            faltas:[],
            matriculas:[],
            estudiantes:[],
            docentes:[],
            personas:[],
            directores: [],

            //# generables
            boletin: {'asignaturas':[], grado:'', puesto:[0,0], rector:'', 'estudiante': {'estudiante_id': 0, 'identificacion': '0'}, 'faltas': 0 }

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

        set_actual_periodo(state, json){
            state.actual_periodo = json
        },

        set_actual_generable(state, json){
            state.actual_generable = json
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

        set_faltas(state,array){
            state.faltas = array
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

        set_personas(state,array){ 
            state.personas = array
        },

        set_directores(state,array){ 
            state.directores = array
        },

        set_boletin(state,json){ 
            state.boletin = json
        }

    },

    actions:{

        async change_sede(state,json){

            const result = await this.dispatch('clear_data_sede')
            .then((res)=>{

                if(res){

                    //Utilities.set_config({"sede_id": json.sede_id})

                    let usuario =  this.state.usuario
                    console.debug("sede llegando al store", usuario);
                    console.debug(typeof usuario);


                    
                    usuario.configuracion.sede_id = json.sede_id
                    usuario.configuracion['nombre_sede'] = json['nombre']
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
                    usuario.configuracion['numero_lectivo'] = json.numero
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

        async clear_data_sede(state){

            return await new Promise((res,rej)=>{

                this.commit('set_lectivos',[])
                this.commit('set_actual_lectivo',{'lectivo_id': 0, 'numero': 0, 'sede_id': 0, 'director_id': 0})
                this.commit('set_grados',[])
                this.commit('set_actual_grado',{ 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 })
                this.commit('set_actual_periodo',{ 'periodo': 0, 'nombre': 'Periodo' })
                this.commit('set_actual_generable',{ 'recurso': 0, 'nombre': 'Generable' })
                this.commit('set_actual_asignatura',{ 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 })
                this.commit('set_asignaturas',[])
                this.commit('set_calificaciones',[])
                this.commit('set_faltas',[])
                this.commit('set_matriculas',[])
                this.commit('set_estudiantes',[])
                this.commit('set_logros',[])
                this.commit('set_docentes',[])
                this.commit('set_personas',[])
                this.commit('set_directores',[])
                this.commit('set_boletin',{'asignaturas':[], grado:'', puesto:[0,0], rector:'', 'estudiante': {'estudiante_id': 0, 'identificacion': '0'}, 'faltas': 0 })

                res(true)

            })

        },

        async clear_data_sesion(state){

            return await new Promise((res,rej)=>{
             
                localStorage.removeItem('token')
                this.commit('set_seccion_num',[0,0])
                this.commit('set_usuario',{'usuario_id':0, 'avatar': 'default.png'})
                this.commit('set_login',false)
                this.commit('set_token','')
                this.commit('set_loading',false)
                this.commit('set_mini_loading',false)
                this.commit('set_sedes',[])
                this.commit('set_actual_sede',{'sede_id': 0, 'nombre':'No seleccionada!'})
                this.commit('set_lectivos',[])
                this.commit('set_actual_lectivo',{'lectivo_id': 0, 'numero': 0, 'sede_id': 0, 'director_id': 0})
                this.commit('set_grados',[])
                this.commit('set_actual_grado',{ 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 })
                this.commit('set_actual_periodo',{ 'periodo': 0, 'nombre': 'Periodo' })
                this.commit('set_actual_generable',{ 'recurso': 0, 'nombre': 'Generable' })
                this.commit('set_actual_asignatura',{ 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 })
                this.commit('set_asignaturas',[])
                this.commit('set_calificaciones',[])
                this.commit('set_faltas',[])
                this.commit('set_matriculas',[])
                this.commit('set_estudiantes',[])
                this.commit('set_logros',[])
                this.commit('set_docentes',[])
                this.commit('set_personas',[])
                this.commit('set_directores',[])
                this.commit('set_boletin',{'asignaturas':[], grado:'', puesto:[0,0], rector:'', 'estudiante': {'estudiante_id': 0, 'identificacion': '0'}, 'faltas': 0 })

                res(true)

            })
            
        },

        async clear_data_lectivo(){

            return await new Promise((res,rej)=>{
                
                this.commit('set_grados',[])
                this.commit('set_actual_grado',{ 'grado_id': 0, 'nombre': '', 'numero': 0, 'director_id': 0 })
                this.commit('set_asignaturas',[])
                this.commit('set_actual_asignatura',{ 'asignatura_id': 0, 'nombre': '', 'ih': 0, 'hcd': 0 })
                this.commit('set_actual_periodo',{ 'periodo': 0, 'nombre': 'Periodo' } )
                this.commit('set_calificaciones',[])
                this.commit('set_faltas',[])
                this.commit('set_matriculas',[])
                this.commit('set_boletin',{'asignaturas':[], grado:'', puesto:[0,0], rector:'', 'estudiante': {'estudiante_id': 0, 'identificacion': '0'}, 'faltas': 0 })

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

        add_falta(state,json){

            let faltas = this.state.faltas
            const result = [...faltas, json]
            this.commit('set_faltas',result)

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

        update_docente(state, json){
                
            let docentes = this.state.docentes.filter((e)=>e.docente_id != json.docente_id)
            const result = [ json, ...docentes ]
            this.commit('set_docentes',result)
    
        },

        add_persona(state, json){
            
            let personas = this.state.personas
            const result = [...personas, json]
            this.commit('set_personas',result)
        
        },

        add_director(state, json){
            
            let directores = this.state.directores
            const result = [...directores, json]
            this.commit('set_directores',result)
        
        },

        update_estudiante(state, json){

            const estudiantes = this.state.estudiantes.filter((e)=>e.estudiante_id != json.estudiante_id)
            const result = [ json, ...estudiantes ]
            this.commit('set_estudiantes', result)

        }

    }

})


export default store