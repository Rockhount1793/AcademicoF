
<template>

    <div class="">

        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">

            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <p class="text-gray-500 mt-3 text-center font-semibold text-lg">Grados</p>

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <div v-if="seccion == 0" class="mt-3">

                    <div class="px-4 sm:px-6 lg:px-8">

                        <div v-if="!grados.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay grados creadas</p>
                        </div>

                        <div v-else class="mt-5 flow-root">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table class="min-w-full divide-y divide-gray-300 mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Grado</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>

                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        
                                        <tr v-for="(grado, index) in grados" >
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <!--<div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(grado.nombre) + '.png'" alt="asignatura.nombres" />
                                                    </div>-->
                                                    <div class="ml-6">
                                                        <div class="font-medium text-gray-900 text-xl"><strong>{{grado.nombre}}</strong></div>
                                                        <div class="text-gray-600">{{filter_director(grado.docente_id)}}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="grado.estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ grado.estado ? 'Activo':'Inactivo'  }} </span>
                                            </td>
                                            
                                            <td  class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                                <div class="w-full h-9 truncate">
                                                    <button title="eliminar grado" @click="delete_(grado)" class="mt-0.5 h-7 px-2 rounded shadow shadow-pink-500 bg-pink-400  hover:bg-pink-600 font-semibold">
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


                <div v-if="seccion == 1" class="mt-3 flex-1 rounded p-1 px-2">

                    <div class="">
                        <p v-if="!docentes.length" class="mx-auto text-center text-yellow-500" > Considere registrar un docente primero. </p>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="nombre">Nombre / Referencia</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center placeholder:text-gray-300 rounded w-full" id="numero"  type="text" placeholder=" Preescolar A"/>
                    </div>

                   <!--<div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="numero">Numero</p>
                        <input v-model="numero" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="12" step="1" placeholder=" 0"/>
                    </div>-->

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="director">Director</p>
                        <SelectorDirector @set_director="set_director" class="mx-auto"></SelectorDirector>
                    </div>
                    

                    <div class="mx-auto w-1/2">
                        <button @click="guardar()" class="mx-auto mt-3 h-7 shadow-md w-full lg:w-32 shadow-pink-500 rounded float-right bg-pink-800 text-gray-500 px-2">
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
    import Docente from '@/controllers/Docente'
  
    export default defineComponent({
    
        'name':'Grados',

        'components':{
            Barra, Lateral, SelectorDirector
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('')
            let numero = ref(0)
            let docente_id = ref(0)
            let errores = ref([])

            //# methods
            const set_director = (number)=>{ 
                docente_id.value = number
            }

            const set_route = (json)=>{
                Router.push(json)
            }

            const guardar = ()=>{

                errores.value = []

                if(!nombre.value.length || nombre.value.length > 100){ errores.value.push('ingrese nombre') }
                if(typeof numero.value != 'number' || numero.value < 0 || numero.value > 12 ){ errores.value.push('ingrese numero') }
                if(typeof docente_id.value != 'number' || docente_id.value < 1){ errores.value.push('seleccione director') }
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                if(actual_lectivo.value.numero_lectivo == 0){ errores.value.push('seleccione lectivo') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Grado.store({
                        'nombre': nombre.value,
                        'numero': numero.value,
                        'docente_id': docente_id.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'estado':1
                    },()=>{
                        nombre.value = ''
                        numero.value = 0
                        seccion.value = 0
                        docente_id.value = 0
                    })


                }

            }

            const firstLetter = (name) => {
                return name.charAt(0).toLowerCase() || 'default';
            }

            const filter_director = (docente_id)=>{

                let array = docentes.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.docente_id == docente_id })
                    return 'Director: '+res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
                
            }
      
            const delete_ = ()=>{
                // 
            }

            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const grados = computed(()=> Store.state.grados )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const docentes = computed(()=> Store.state.docentes )

            return {
                urlsf,
                listado,
                set_route,
                docentes,
                grados,
                seccion,
                nombre,
                numero,
                docente_id,
                actual_lectivo,
                guardar,
                set_director,
                filter_director,
                delete_,
                firstLetter
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    
                    if(!Store.state.grados.length){
                        Grado.index(()=>{

                            if(!Store.state.docentes.length){ Docente.index(()=>{}) }

                        })
                    }

                })

            })

        }
  
    })
  
</script>