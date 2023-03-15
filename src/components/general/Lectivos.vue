
<template>

    <div class="">
    
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
        

            <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">

         

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-600 font-semibold text-md"> +</p>
                </div>
    

                <hr class="mt-3 border border-gray-200" />
                
                <div v-if="seccion == 0" class="mt-3 h-5/6 overflow-y-auto">
                    
                    <div class="">
                        <p v-if="actual_lectivo.lectivo_id == 0" class="mx-auto text-center text-yellow-500" > No hay un año lectivo seleccionado! </p>
                    </div>


                        <div v-if="!lectivos.length">
                            <p class="px-2 font-semibold text-gray-500"> No hay lectivos creados</p>
                        </div>
                    

                    <div v-else class="mt-4 mx-4 mb-4 flow-root ">
                        <ul role="list" class="-my-5 divide-y divide-gray-200">
                            <li v-for="lectivo in lectivos" :key="lectivo.lectivo_id" class="py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="min-w-0 flex-1">
                                        <p class="truncate text-large font-medium text-gray-900"> Año: {{ lectivo.numero }}</p>
                                        <p class="truncate text-sm text-gray-500">Rector(a): {{filter_director(lectivo.director_id)}}</p>
                                    </div>
                                    <div>
    
                                        <div v-if="actual_lectivo.lectivo_id == lectivo.lectivo_id" class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ">Actual : {{lectivo.numero}}</div>
    
                                        <div v-else @click="set_lectivo(lectivo)" class="inline-flex items-center rounded-full bg-white px-2.5 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400 hover:text-white hover:cursor-pointer">Seleccionar este año </div>
    
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 rounded p-1 px-2">
                    
                    <div class="">
                        <p v-if="!directores.length" class="mx-auto text-center text-yellow-500" > Considere registrar un(a) rector(a) primero. </p>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="year">Año</p>
                        <input v-model="numero" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="2023" max="2099" step="1" placeholder=" 2023"/>
                    </div>
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="director">Rector</p>
                        <SelectorDirector @set_director="set_director" id="director" class="mx-auto"></SelectorDirector>
                    </div>

                    <div class="mx-auto w-1/2 pb-4">
                        <button @click="guardar()" class="mx-auto mt-3 h-7 shadow-md w-full lg:w-32 shadow-indigo-500 rounded float-right bg-indigo-800 text-gray-50 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Director.vue'
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Lectivo from '@/controllers/Lectivo'
    import Director from '@/controllers/Director'
  
    export default defineComponent({
    
        'name':'Lectivos',

        'components':{
            Barra, Lateral, SelectorDirector
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let seccion = ref(0)

            let numero = ref(2023)
            let director_id = ref(0)
            let errores = ref([])

            //# methods
            const set_director = (number)=>{ 
                director_id.value = number
            }

            const set_route = (json)=>{ 
                Router.push(json)
            }

            const guardar = ()=>{

                errores.value = []

                if(typeof numero.value != 'number' || numero.value < 2015 || numero.value > 2099){ errores.value.push('ingrese año') }
                if(typeof director_id.value != 'number' || director_id.value < 1){ errores.value.push('seleccione director') }

                // The year doesn't need a SEDE. 
                //if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Lectivo.store({
                        'numero': numero.value,
                        'director_id': director_id.value,
                        'estado':1
                    },()=>{
                        
                        let fecha = new Date()
                        numero.value = fecha.getFullYear()
                        director_id.value = 0
                        
                    })

                    seccion.value = 0

                }

            }

            const filter_director = (director_id)=>{

                let array = directores.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.director_id == director_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
                
            }

            const set_lectivo = (json)=>{

                Store.dispatch('change_lectivo',json)
                
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const lectivos = computed(()=> Store.state.lectivos )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const directores = computed(()=> Store.state.directores )

            return {
                urlsf,
                listado,
                directores,
                set_route,
                set_lectivo,
                lectivos,
                seccion,
                numero,
                director_id,
                actual_lectivo,
                guardar,
                set_director,
                filter_director
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    
                    if(!Store.state.lectivos.length){
                        Lectivo.index(()=>{
                            Director.index()
                        })   
                    }

                })

            })

        }
  
    })
  
</script>