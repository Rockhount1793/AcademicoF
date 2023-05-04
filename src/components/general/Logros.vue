
<template>

    <div class="">
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">

            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Logros <span v-if="asignatura.asignatura_id > 0">{{asignatura.nombre}} </span></p>

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Asignaturas</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-md"> Logros</p>
                    <span v-if="seccion == 1" class="hidden lg:inline-flex text-cyan-500 font-semibold"> | </span>
                    <p v-if="seccion == 1 && logros.length" @click="set_aprobado(true)" :class="aprobado ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-500 font-semibold text-md"> Aprobado</p>
                    <p v-if="seccion == 1 && logros.length" @click="set_aprobado(false)" :class="!aprobado ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-500 font-semibold text-md"> No Aprobado</p>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <!-- Asignaturas -->
                <div v-if="seccion == 0" class="">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                        <SelectorGrado class="mx-auto"></SelectorGrado>
                    </div>

                    <ul>

                        <li v-if="!asignaturas.length">
                            <p class="px-2 font-semibold text-gray-500 mt-3"> No hay asignaturas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in asignaturas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div>
                                    
                                    <div class="w-64 rounded bg-cyan-900 text-center h-7 leading-6 text-gray-500 font-semibold text-md">
                                        {{item.nombre}}
                                    </div>
                                    
                                </div>

                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="get_logros(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-500 font-semibold">
                                       ver logros
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>
                </div>

                <!-- Logros -->
                <div v-if="seccion == 1" class="mt-3">
                    
                    <div v-if="!logros.length">
                        <p class="px-2 font-semibold text-gray-500 mt-3"> No hay logros creados </p>
                    </div>
                        
                    <div v-else class="flex-1 lg:grid lg:grid-cols-2 space-y-4 lg:space-y-0 gap-2">
                        
                        <div :key="index" v-for="(item, index, key) in logros" class="pb-3 w-full lg:w-3/4 px-2">
    
                            <div class="w-full rounded bg-cyan-900 text-center h-7 leading-6 text-gray-500 font-semibold text-md">
                                Periodo: {{item.periodo}}
                            </div>
    
                            <div class="mt-1">
                                <textarea v-if="aprobado" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" name="" id="edit_apro" v-model="item.aprobado" rows="3"></textarea>
                                <textarea v-else name="" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="edit_no_apr" v-model="item.no_aprobado" rows="3"></textarea>
                            </div>
    
                            <div class="flow-root">
                                <button @click="update_logro(item)" class="float-right h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-500 font-semibold">
                                    Guardar
                                </button>
                            </div>
    
                        </div>
                        
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Asignatura from "@/controllers/Asignatura"
    import Grado from "@/controllers/Grado"
    import Docente from "@/controllers/Docente"
    import Logro from "@/controllers/Logro"
  
    export default defineComponent({
    
        'name':'Logros',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let asignatura = ref({'asignatura_id': 0, 'nombre':''}) 
            let seccion = ref(0)
            let aprobado = ref(true)
            
            let errores = ref([])

            //# methods
            const update_logro = (_logro)=>{

                errores.value = []

                if(_logro.aprobado.length == 0 || _logro.aprobado.length > 500){ errores.value.push('texto aprobado menor a 500 caracteres') } 
                if(_logro.no_aprobado.length == 0 || _logro.no_aprobado.length > 500){ errores.value.push('texto no aprobado menor a 500 caracteres') } 

                if(!errores.value.length){
                    Logro.update(_logro)
                }else{
                    alert(errores.value[0])
                }
            }

            const set_aprobado = (bool)=>{
                aprobado.value = bool
            }

            const set_director = (number)=>{ 
                director_id.value = number
            }

            const get_logros = (_asignatura)=>{
                Logro.index(_asignatura.asignatura_id,()=>{
                    asignatura.value = _asignatura
                    seccion.value = 1
                })
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const asignaturas = computed(()=> Store.state.asignaturas )
            const logros = computed(()=> Store.state.logros )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
           
            //# watch
            watch(actual_grado,(value) => {

                if(value.grado_id > 0) {
                    Asignatura.index(()=>{})
                }

                Store.commit('set_logros',[])
            
            })


            return {
                urlsf,
                listado,
                asignaturas,
                logros,
                seccion,
                actual_lectivo,
                actual_grado,
                get_logros,
                asignatura,
                aprobado,
                set_aprobado,
                update_logro
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.asignaturas.length && this.actual_grado.grado_id > 0){
                                    
                        Asignatura.index(()=>{
                        
                        })

                    }

                })

            })

        }
  
    })
  
</script>