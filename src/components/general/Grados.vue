
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Grados</p>

                <div class="px-2">
                    <p @click="seccion = 1" v-if="seccion == 0" class="shadow-md w-32 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>
                    <p @click="seccion = 0" v-if="seccion == 1" class="shadow-md w-32 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div v-if="seccion == 0" class="mt-3">

                    <ul>

                        <li v-if="!grados.length">
                            <p class="px-2 font-semibold text-gray-100"> No hay grados creados</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in grados ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center">
                                
                                <div>
                                    
                                    <button v-if="actual_lectivo.numero_grado == item.numero_grado" class="shadow-md w-64 shadow-cyan-500 rounded bg-cyan-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        Actual : {{item.nombre_grado}} : {{item.numero_grado}}
                                    </button>
                                    
                                    <button v-else @click="set_lectivo(item)" class="shadow-md w-64 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        Seleccionar : {{item.numero_grado}}
                                    </button>

                                </div>
                                
                                <div class="w-full lg:w-1/3 truncate">
                                    <p class="mt-2 lg:mt-0.5 cursor-pointer px-2 p-0.5 bg-gray-800 capitalize text-gray-100 font-semibold">{{filter_director(item.director_id)}}</p>
                                </div>

                            </div>
                        
                        </li>
                    </ul>
                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 rounded p-1 px-2">

                    <div class="flex-1 mx-auto py-2 w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="direccion">Numero</p>
                        <input v-model="numero" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="12" step="1" placeholder=" 0"/>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="direccion">Nombre</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="text" placeholder=" Preescolar"/>
                    </div>
                    
                    <SelectorDirector @set_director="set_director" class="mt-3 mx-auto w-1/2"></SelectorDirector>

                    <div class="mx-auto w-1/2">
                        <button @click="guardar()" class="mx-auto mt-3 h-7 shadow-md w-full lg:w-32 shadow-pink-500 rounded float-right bg-pink-800 text-gray-100 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script lang="js">
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Grado from '@/controllers/Grado'
    import Director from '@/controllers/Docente'
  
    export default defineComponent({
    
        'name':'Grados',

        'components':{
            Barra, Lateral, SelectorDirector
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('Preescolar')
            let numero = ref(0)
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

                errores = []

                if(nombre.value.length < 0 || nombre.value.length > 100){ errores.push('ingrese nombre') }
                if(typeof numero.value != 'number' || numero.value < 0 || numero.value > 12 ){ errores.push('ingrese numero') }
                if(typeof director_id.value != 'number' || director_id.value < 1){ errores.push('seleccione director') }
                if(actual_sede.value.sede_id == 0){ errores.push('seleccione sede') }
                if(actual_lectivo.value.numero_lectivo == 0){ errores.push('seleccione lectivo') }
                
                if(errores.length){
                    alert(errores[0])
                }else{
                    
                    Grado.store({
                        'nombre': nombre.value,
                        'numero': numero.value,
                        'director_id': director_id.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'estado':1
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
            const grados = computed(()=> Store.state.grados )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const directores = computed(()=> Store.state.directores )

            return {
                urlsf,
                listado,
                set_route,
                set_lectivo,
                grados,
                seccion,
                nombre,
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
                    
                    if(!Store.state.grados.length){
                        Grado.index(()=>{
                            Director.index()
                        })   
                    }

                })

            })

        }
  
    })
  
</script>