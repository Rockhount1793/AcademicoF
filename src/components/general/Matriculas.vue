
<template>

    <div class="">
    
        <div class="mt-2 h-5/6 flex w-auto px-2 md:space-x-2">
            

            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <p class="text-gray-500 mt-3 text-center font-semibold text-lg">Matriculas <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span></p>

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                </div>

                <hr class="mt-3 border border-gray-200" />


                <!-- Matriculas -->
                <div v-if="seccion == 0" class="overflow-y-auto">

                    <div class="px-0 sm:px-2 lg:px-4">
                    
                        <div v-if="!matriculas.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay matriculas creados</p>    
                        </div>
                    
                        <div v-else class="mt-2">
                            <div class="overflow-x-auto">
                                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table class="min-w-full divide-y divide-gray-300 mb-4">
                                        
                                        <thead>
                                            <tr>
                                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombres</th>
                                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    
                                            </tr>
                                        </thead>
                    
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr v-for="(matri, index) in matriculas" :key="index+10">
                    
                                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div class="flex items-center">
                                                        <div class="h-10 w-10 flex-shrink-0">
                                                            <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(matri.nombres) + '.png'" alt="estudiante.nombres" />
                                                        </div>
                                                        <div class="ml-6">
                                                            <div class="font-medium text-base text-gray-900 capitalize">{{ matri.nombres + " " + matri.apellidos  }}</div>
                                                            <div class="text-gray-500">ID: {{ matri.identificacion }}</div>
                                                        </div>
                                                    </div>
                                                </td>
                    
                                                <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="matri.estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ matri.estado ? 'Activo':'Inactivo'  }} </span>
                                                </td>

                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                                    <div class="w-full h-9 truncate">
                                                        <button title="eliminar matricula" @click="delete_(matri)" class="mt-0.5 h-7 px-2 rounded shadow shadow-pink-500 bg-pink-400  hover:bg-pink-600 font-semibold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-7 h-7">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>                                          
                                                        </button>
                                                    </div>
                                                </td>
                    
                                            </tr>
                    
                                        </tbody>
                    
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                    </div>

                </div>

                <!-- Crear -->
                <div v-if="seccion == 1" class="">
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Identificación Estudiante</p>
                        <input v-model="identificacion_" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="identificacion" type="text" placeholder=" Identificación estudiante"/>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1 flow-root">
                        <button @click="get_estudiante()" class="float-right w-32 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-500 px-2">
                            Consultar
                        </button>
                    </div>                    

                </div>
                
                <div v-if="seccion == 1" class="mt-3 px-2 lg:w-1/2 mx-auto">    
                
                    <p class="font-semibold text-gray-500 text-md text-center">Detalle registro</p>

                    <hr class="mb-3 border border-gray-500" />

                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Identificación:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{filter_identificacion(estudiante.identificacion)}}</p>
                    </div>

                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Nombres:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.nombres}}</p>
                    </div>

                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Apellidos:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.apellidos}}</p>
                    </div>
                    
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Sede:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_sede.nombre}}</p>
                    </div>
                    
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Lectivo:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_lectivo.numero}}</p>
                    </div>
                    
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Grado:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_grado.nombre}}</p>
                    </div>
                    
                    <hr class="mt-3 border border-gray-500" />

                    <div class="flow-root flex-1 pb-2">
                        
                        <div class="float-right">
                            <button @click="guardar()" class="w-64 mt-3 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-500 px-2">
                                Matricular
                            </button>
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
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Estudiante from "@/controllers/Estudiante"
    import Utilitie from "@/utilities"
  
    export default defineComponent({
    
        'name':'Matriculas',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let identificacion_ = ref('')
            let estudiante = ref({'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': '0'})
            let tipo_numero = ref(0)
            let tipos = ref({'tipo': 0, 'nombre':'Inicial'}, {'tipo': 1, 'nombre':'Extraordinario'}, {'tipo': 2, 'nombre':'Traslado'}, {'tipo': 3, 'nombre':'Desertor'})
            let seccion = ref(0)
            let errores = ref([])

            //# methods

            const delete_ = (matricula_)=>{
               // Matricula.delete(matricula_)
            }

            const guardar = ()=>{

                errores.value = []

                if( Number(estudiante.value.identificacion) <= 0 ){ errores.value.push('identificación estudiante') }
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.value.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.value.push('seleccione grado') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Matricula.store({

                        'estudiante_id': estudiante.value.estudiante_id,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'grado_id': actual_grado.value.grado_id,
                        'tipo': 0,
                        'estado': 1
                    
                    },()=>{
                        identificacion_.value = 0
                        seccion.value = 0
                        estudiante.value = {'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': '0'}
                    })

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

                errores.value = []

                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
             
                if(!errores.value.length){

                    estudiante.value = {'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': ''}

                    Estudiante.index_identificacion({
                        
                        'identificacion': Number(identificacion_.value),
                        'sede_id': actual_sede.value.sede_id
    
                    },(response)=>{

                        estudiante.value = response.estudiante
                        
                    })

                }else{
                    alert(errores.value[0])
                }

            }

            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }
      
            const firstLetter = (name)=>{
                return name.charAt(0).toLowerCase() || 'default'
            }

            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
           
            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    
                    Matricula.index(()=>{})
                
                }
                
            })

            return {
                urlsf,
                delete_,
                identificacion_,
                tipos,
                tipo_numero,
                actual_sede,
                actual_lectivo,
                actual_grado,
                estudiante,
                matriculas,
                seccion,
                guardar,
                filter_estudiante,
                get_estudiante,
                filter_identificacion,
                firstLetter
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0 && this.actual_sede.sede_id > 0 && this.actual_lectivo.lectivo_id > 0){
                                    
                        Matricula.index(()=>{})

                    }

                })

            })

        }
  
    })
  
</script>