
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Matriculas <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span></p>

                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-100 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                </div>

                <!-- Matriculas -->
                <div v-if="seccion == 0" class="">

                    <ul>

                        <li v-if="!matriculas.length">
                            <p class="px-2 font-semibold text-gray-100 mt-3"> No hay matriculas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in matriculas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div>
                                    
                                    <div class="w-64 rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        {{item.estudiante_id}}
                                    </div>
                                    
                                </div>

                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="delete_(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                       eliminar
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>
                </div>

                <!-- Crear -->
                <div v-if="seccion == 1" class="mt-3 px-2">
                    
                    <div class="flex-1">
                        <p class="font-semibold text-gray-100 text-md px-2">Buscar Identificación</p>
                        <input v-model="_identificacion" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="identificacion" type="text" placeholder=" 0"/>
                    </div>

                    <div class="flow-root">
                        <button @click="get_estudiante()" class="float-right w-32 mt-3 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-100 px-2">
                            Buscar
                        </button>
                    </div>                    

                    <hr class="mt-3 border border-gray-500" />
                    
                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Nombres:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.nombres}}</p>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Apellidos:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.apellidos}}</p>
                    </div>

                    <hr class="mt-3 border border-gray-500" />

                    <div class=""></div>

                    <div class="">
                        <button @click="guardar()" class="w-32 mt-3 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-100 px-2">
                            Guardar
                        </button>
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
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Estudiante from "@/controllers/Estudiante"
  
    export default defineComponent({
    
        'name':'Matriculas',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let _identificacion = ref('')
            let estudiante = ref({'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': ''})
            let tipo_numero = ref(0)
            let tipos = ref({'tipo': 0, 'nombre':'Inicial'}, {'tipo': 1, 'nombre':'Extraordinario'}, {'tipo': 2, 'nombre':'Traslado'}, {'tipo': 3, 'nombre':'Desertor'})
            let seccion = ref(0)
            let nombre = ref('')
            let errores = ref([])

            //# methods

            const delete_ = (_matricula)=>{
                Matricula.delete(_matricula)
            }

            const guardar = ()=>{

                errores = []

                if(!_identificacion.value.length){ errores.push('identificación estudiante') }
                if(actual_sede.value.sede_id == 0){ errores.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.push('seleccione grado') }
                
                if(errores.length){
                    alert(errores[0])
                }else{
                    
                    Asignartura.store({

                        'estudiante_id': estudiante.value.estudiante_id,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'grado_id': actual_grado.value.grado_id,
                        'tipo': 0,
                        'estado': 1
                    
                    })

                    seccion.value = 0
                    estudiante.value = {'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': ''}

                }

            }

            const filter_estudiante = (estudiante_id)=>{

                let array = estudiantes.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.estudiante_id == estudiante_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }

            }

            const get_estudiante = ()=>{

                errores = []

                if(actual_sede.value.sede_id == 0){ errores.push('seleccione sede') }
             
                if(!errores.length){

                    estudiante.value = {'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': ''}

                    Estudiante.index_identificacion({
                        
                        'identificacion': Number(_identificacion.value),
                        'sede_id': actual_sede.value.sede_id
    
                    },(response)=>{

                        if(response.status){
                            estudiante.value = response.estudiante[0]
                        }else{
                            alert(response.message)
                        }
    
                    })

                }else{
                    alert(errores[0])
                }

            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
           
            watch(actual_grado,(value) => {

                if(value.grado_id > 0) {
                    //Asignartura.index(()=>{})
                }
                
            })

            return {
                urlsf,
                delete_,
                _identificacion,
                tipos,
                tipo_numero,
                actual_grado,
                estudiante,
                matriculas,
                seccion,
                nombre,
                guardar,
                filter_estudiante,
                get_estudiante
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0){
                                    
                        //Matricula.index(()=>{})

                    }

                })

            })

        }
  
    })
  
</script>