
<template>

    <div class="">
        
        <div class="pb-2 mt-2 min-h-full flex w-auto px-2 md:space-x-2">

            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Logros <span v-if="asignatura.asignatura_id > 0">{{asignatura.nombre}} </span></p>

                <div class="mt-4 flex space-x-2 px-2">
                    
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-50'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                        Asignaturas
                    </p>
                    
                    <!--
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-200 font-semibold text-md">
                        Logros
                    </p>
                    -->
                    
                    <span v-if="seccion == 1" class="hidden lg:inline-flex text-cyan-500 font-semibold"> | </span>
                    
                    <p v-if="seccion == 1 && logros.length" @click="set_aprobado('aprobado')" :class="aprobado == 'aprobado' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                        Aprobado
                    </p>
                    
                    <p v-if="seccion == 1 && logros.length" @click="set_aprobado('no_aprobado')" :class="aprobado == 'no_aprobado' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                        No Aprobado
                    </p>

                </div>

                <hr class="mt-3 border border-gray-200" />

                <!-- Asignaturas -->
                <div v-if="seccion == 0" class="mt-2">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                        <SelectorGrado class="mx-auto"></SelectorGrado>
                    </div>

                    <div class="px-4 sm:px-6 lg:px-8">

                        <div v-if="!asignaturas.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay asignaturas creadas</p>
                        </div>

                        <div v-else class="mt-8 flow-root">
                            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table class="min-w-full divide-y divide-gray-300 mb-4">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Asignatura</th>
                                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            
                                            <tr v-for="(asig, index) in asignaturas" >

                                                <td class="whitespace-nowrap w-full py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div class="flex items-center">
                                                        <!--<div class="h-10 w-10 flex-shrink-0">
                                                            <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(asig.nombre) + '.png'" alt="asignatura.nombres" />
                                                        </div>-->
                                                        <div class="ml-6">
                                                            <div class="font-medium text-gray-900 text-xl ">{{ index+1 }}. {{asig.nombre}}</div>
                                                            <div class="text-gray-600">{{filter_director(asig.docente_id)}}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                </td>
                                                
                                                <td @click="get_logros(asig)" title="ver logros" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                                    Ver Logros
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Logros -->
                <div v-if="seccion == 1" class="mt-3">
                        
                    <div class="flex-1 content-center ">
                        
                        <div :key="index" v-for="(item, index, key) in logros" class="pb-3 pt-3 mx-auto w-full lg:w-3/4 px-2">
    
                            <div class="w-full rounded rounded-b-none shadow shadow-teal-500 bg-teal-600 text-center h-7 text-gray-50 font-semibold text-lg">
                                {{ comp_periodo(item.periodo)}} Periodo
                            </div>
    
                            <div class="mt-0">
                                <textarea v-model="item[aprobado]" class="appearance-none shadow focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-teal-500 focus:shadow-none p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded border-t-0 rounded-t-none w-full" name="" id="edit_apro" rows="3"></textarea>
                            </div>
    
                            <div class="flow-root">
                                <button @click="update_logro(item)" class="float-right w-64 h-6 px-2 rounded shadow shadow-indigo-500  bg-indigo-800 text-gray-50 font-semibold">
                                    Actualizar {{ comp_periodo(item.periodo)}} periodo
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
            let aprobado = ref('aprobado')
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

            const set_aprobado = (string)=>{
                aprobado.value = string
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

            const filter_director = (director_id)=>{

                let array = docentes.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.docente_id == director_id })
                    return 'Director: '+res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }

            }

            const comp_periodo = ((numero)=>{

                const periodos = {
                    1:'Primer',
                    2:'Segundo',
                    3:'Tercer',
                    4:'Cuarto',
                    5:'Final'
                }
                
                return periodos[numero]
            })
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const asignaturas = computed(()=> Store.state.asignaturas )
            const logros = computed(()=> Store.state.logros )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const docentes = computed(()=> Store.state.docentes )
            
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
                update_logro,
                filter_director,
                comp_periodo
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