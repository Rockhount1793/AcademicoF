
<template>

    <div class="">
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">
        
            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-500 text-center font-semibold text-lg">Faltas</p>

                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-500 font-semibold text-md"> Estudiantes</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-500 font-semibold text-md"> Asignaturas</p>
                    <p @click="seccion = 2" :class="seccion == 2 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-500 font-semibold text-md"> Faltas</p>
                </div>

                <hr class="mt-3 border border-gray-500" />
                
                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-500"> Estudiante: </span> {{estudiante.nombres}} {{estudiante.apellidos}}</p>
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-500"> Identificación: </span> {{filter_identificacion(estudiante.identificacion)}}</p>
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-500"> Asignatura: </span> {{asignatura.nombre}}</p>
                </div>
        
                <hr class="mt-3 border border-gray-500" />

                <!-- Estudiantes matriculados -->
                <div v-if="seccion == 0" class="mt-0">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                        <SelectorGrado class="mx-auto"></SelectorGrado>
                    </div>
                    
                    <ul>

                        <li v-if="!matriculas.length">
                            <p class="px-2 font-semibold text-gray-500 mt-3"> No hay matriculas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in matriculas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div class="w-full">
                                    
                                    <div class="w-full px-2 truncate rounded bg-cyan-900 text-center h-7 leading-6 text-gray-500 font-semibold text-md">
                                        {{item.nombres}}  {{item.apellidos}} : {{item.identificacion }}
                                    </div>
                                    
                                </div>

                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="set_estudiante(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-500 font-semibold">
                                       ver estudiante
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>

                </div>

                <!-- Asignaturas -->
                <div v-if="seccion == 1" class="mt-0">

                    <ul>
            
                        <li v-if="!asignaturas.length">
                            <p class="px-2 font-semibold text-gray-500 mt-3"> No hay asignaturas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in asignaturas ">
                
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                    
                                <div class="w-full">
                                    
                                    <div class="w-full px-2 truncate rounded bg-cyan-900 text-center h-7 leading-6 text-gray-500 font-semibold text-md">
                                        {{item.nombre}}
                                    </div>
                                    
                                </div>
            
                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="get_faltas(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-500 font-semibold">
                                       ver faltas
                                    </button>
                                </div>
            
                            </div>
                        
                        </li>
            
                    </ul>
            
                </div>

                <!-- Faltas -->
                <div v-if="seccion == 2" class="mt-3">
                    
                    <div class="pt-2 mb-3">

                        <p class="px-2 font-semibold text-center text-gray-500">Crear falta</p>

                        <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                            <p class="font-semibold text-gray-500 text-md px-2">Periodo</p>
                            <SelectorPeriodo class="mx-auto"></SelectorPeriodo>
                        </div>

                        <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                            
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-gray-500"> Fecha </p>
                                <input class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-blue-900 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5" type="date" name="fecha" v-model="fecha" />
                            </div>

                            <div class="flex-1 mt-3 truncate">
                                <p class="text-sm font-semibold text-gray-500"> Observación: <span class="text-yellow-300"> [{{ ( 300 - descripcion.length)}}] </span> </p>
                                <textarea v-model="descripcion" rows="6" class="w-full border border-gray-300 bg-white rounded pl-2 pr-8 py-1 px-2 focus:outline-none shadow-md shadow-blue-900 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-4" />
                            </div>
                            
                        </div>
    
                        <div class="flow-root px-2">

                            <button @click="store_falta()" class="float-right mt-3 mr-0 h-6 px-2 rounded shadow-md shadow-pink-500 bg-pink-800 text-gray-500 font-semibold">
                                Guardar
                            </button>
    
                        </div>

                    </div>

                    <hr class="mt-3 border border-gray-500" />

                    <div v-if="!faltas.length">
                        <p class="px-2 font-semibold text-gray-500 mt-3"> No hay faltas creadas </p>
                    </div>

                    <div v-else class="flex-1 space-y-2 mt-3 ">
                        
                        <div :key="index" v-for="(item, index, key) in faltas" class="pb-3 w-full lg:w-3/4 px-2">
    
                            <section class="">

                                <div class="p-1 mt-3 text-gray-500 text-md font-semibold bg-gray-800 px-2 rounded border border-gray-500">
    
                                    <p># {{index+1}}</p>

                                    <div class="">
                                        <p>Periodo: <span class="text-pink-500">{{item.periodo}}</span></p>
                                        <p>Fecha: <span class="text-pink-500">{{ item.fecha }}</span></p>
                                        <p>Observación: <span class="text-pink-500">{{ item.descripcion }}</span></p>
                                    </div>
             
                                </div>
    
                            </section>

                        </div>
                        
                    </div>
        
                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import Barra from "@/components/framework/Barra.vue"
    import Lateral from "@/components/framework/Lateral.vue"
    import SelectorDirector from "@/components/framework/Selector_Docente.vue"
    import SelectorGrado from "@/components/framework/Selector_Grado.vue"
    import SelectorPeriodo from "@/components/framework/Selector_Periodo.vue"
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Grado from "@/controllers/Grado"
    import Docente from "@/controllers/Docente"
    import Logro from "@/controllers/Logro"
    import Matricula from "@/controllers/Matricula"
    import Asignatura from "@/controllers/Asignatura"
    import Falta from "@/controllers/Falta"
    import Utilitie from "@/utilities"
  
    export default defineComponent({
    
        'name': 'Faltas',

        'components': {
            Barra, Lateral, SelectorDirector, SelectorGrado, SelectorPeriodo
        },

        setup(){
        
            //# data
            let listado = ref(false)
            let fecha = ref('')
            let descripcion = ref('')
            let estudiante = ref({'estudiante_id': 0, 'nombres': 'Nombres', 'apellidos': 'Apellidos', 'identificacion': 0})
            let asignatura = ref({'asignatura_id': 0, 'nombre': 'Asignatura'})
            let seccion = ref(0)
            let errores = ref([])

            //# methods

            const store_falta = ()=>{
                
                errores.value = []
                let periodo = Store.state.actual_periodo 

                if(!fecha.value.length){ errores.value.push('Ingrese fecha') }
                if(descripcion.value.length > 300){ errores.value.push('Contenido observación no mayor a 300 caracteres') }
                if(periodo.periodo == 0 || periodo.periodo == 5){ errores.value.push('Seleccione periodo diferente a 5') }
                if(estudiante.value.estudiante_id == 0 ){ errores.value.push('Seleccione estudiante') }
                if(asignatura.value.asignatura_id == 0 ){ errores.value.push('Seleccione asignatura') }

                if(!errores.value.length){

                    //let new_fecha = new Date()
                    //var fecha_registro = new_fecha.getFullYear()+'-'+(new_fecha.getMonth()+1)+'-'+new_fecha.getDate()

                    let _fecha = new Date(fecha.value)

                    let fecha_registro = _fecha.getFullYear()+'-'+(_fecha.getMonth()+1)+'-'+_fecha.getDate()

                    Falta.store(
                        {
                            'fecha': fecha_registro,
                            'descripcion': descripcion.value,
                            'periodo': periodo.periodo,
                            'estudiante_id': estudiante.value.estudiante_id,
                            'asignatura_id': asignatura.value.asignatura_id
                        }
                    ,()=>{

                    })

                }else{

                    alert(errores.value[0])
                
                }

            }
            
            const set_estudiante = (json)=>{

                estudiante.value = json
                seccion.value = 1

            }

            const get_faltas = (item)=>{
                
                let params = { 
                    'estudiante_id': estudiante.value.estudiante_id,
                    'asignatura_id': item.asignatura_id
                }

                if(estudiante.value.estudiante_id > 0 && item.asignatura_id > 0){

                    Falta.index(params,()=>{
                        asignatura.value = item
                        seccion.value = 2
                    })

                }else{
                    alert('Selecione un estudiante!') 
                }


            }
            
            const get_asignaturas = ()=>{
        
                Asignatura.index(()=>{
                    
                })

            }

            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const matriculas = computed(()=> Store.state.matriculas )
            const asignaturas = computed(()=> Store.state.asignaturas )
            const faltas = computed(()=> Store.state.faltas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_asignatura = computed(()=> Store.state.actual_asignatura )

            const  total_faltas = computed(()=>{

                //let cuarto = (promedios_periodo.value[3].primarias + promedios_periodo.value[3].secundarias + promedios_periodo.value[3].terciarias)/3
                return 0 //((primero + segundo + tercero + cuarto)/4).toFixed(2)

            })

            //# watch
            watch(seccion,(value) => {

                if(value == 1 && actual_grado.value.grado_id > 0 ) {
                    Asignatura.index(()=>{})
                }
                
            })

            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    
                    Matricula.index(()=>{})
                
                }
            
            })

            watch(estudiante,(value) => {

                let params = { 
                    'estudiante_id': value.estudiante_id,
                    'asignatura_id': asignatura.value.asignatura_id
                }

                if(value.estudiante_id > 0 && asignatura.value.asignatura_id > 0){

                    Falta.index(params,()=>{
                       seccion.value = 2
                    })

                }
            
            })

            watch(asignatura,(value) => {

                let params = { 
                    'estudiante_id': estudiante.value.estudiante_id,
                    'asignatura_id': value.asignatura_id
                }

                if(estudiante.value.estudiante_id > 0 && value.asignatura_id > 0){

                    Falta.index(params,()=>{
                       seccion.value = 2
                    })

                }
            
            })

            watch(matriculas,(value) => {

                estudiante.value = {'estudiante_id': 0, 'nombres': 'Nombres', 'apellidos': 'Apellidos', 'identificacion': 0}
                asignatura.value = {'asignatura_id': 0, 'nombre': 'Asignatura'}
                Store.commit('set_faltas',[])

            })

            return {
                urlsf,
                listado,
                estudiante,
                matriculas,
                fecha,
                descripcion,
                faltas,
                seccion,
                actual_lectivo,
                actual_asignatura,
                actual_grado,
                get_asignaturas,
                set_estudiante,
                get_faltas,
                asignatura,
                asignaturas,
                filter_identificacion,
                total_faltas,
                store_falta
                
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0 && this.actual_lectivo.lectivo_id > 0){

                        Matricula.index(()=>{})

                    }

                })

            })

        }
  
    })
  
</script>