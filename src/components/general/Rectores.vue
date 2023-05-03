
<template>

    <div class="">
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
        
            <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">

                <p class="text-gray-500 text-center font-semibold text-lg"> Rectores</p>

                <div class="flex w-full justify-between">

                    <div class="mt-4 flex space-x-2 px-2">
                        <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                        <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                    </div>
    
                    <div class="w-1/3 mt-3 mr-4" v-if="seccion == 0">
                        <label for="search" class="sr-only">Buscar rector</label>
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
    
                            </div>
                            <input v-model="search" id="search" name="search" class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Buscar rector.." type="search" />
                        </div>
                    </div>

                </div>

                <hr class="mt-3 border border-gray-200" />

                <div v-if="seccion == 0" class="mt-3">

                    <span v-if="actual_sede.sede_id == 0" class="text-center p-2 text-yellow-500" > Considere seleccionar una sede primero! </span>

                    <div class="px-4 sm:px-6 lg:px-8">

                        <div v-if="!directores_all.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay Rectores creados</p>
                        </div>

                        <div v-else class="mt-8 flow-root">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table class="min-w-full divide-y divide-gray-300 mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombres</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Apellidos</th>

                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Celular</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Correo</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>

                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        
                                        <tr v-for="director in filter_directores" :key="director.email">
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(director.nombres) + '.png'" alt="director.nombres" />
                                                    </div>
                                                    <div class="ml-6">
                                                        <div class="font-medium text-gray-900">{{ director.nombres }}</div>
                                                        <div class="text-gray-500">Cedula: {{ director.identificacion }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ director.apellidos }}</div>

                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Activo(a)</span>
                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ director.telefono }}</div>

                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ director.email }}</td>
                                            <td @click="editar(director)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Editar</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
 
                    </div>
                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2 rounded p-1 px-2">

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-500 text-md px-2">Nombres</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="nombre" type="text" placeholder=" Nombres"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-500 text-md px-2">Apellidos</p>
                        <input v-model="apellido" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="apellido" type="text" placeholder=" Apellidos"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-500 text-md px-2">Identificación</p>
                        <input v-model="identificacion" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="direccion" type="text" placeholder=" 0000000"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-500 text-md px-2">Teléfono</p>
                        <input v-model="telefono" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" type="text" placeholder=" 1234567890"/>
                    </div>
                    
                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-500 text-md px-2">Email</p>
                        <input v-model="email" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" type="email" placeholder=" usuario@dominio.com"/>
                    </div>

                    <div class=""></div>

                    <div class="">
                        <button @click="guardar()" class="w-32 mt-3 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-500 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Director from '@/controllers/Director'
    import Utilities from '@/utilities'
  
    export default defineComponent({
    
        'name':'Rectores',

        setup(){
        
            //# data 
            const search = ref('')
            const listado = ref(false)
            const seccion = ref(0)

            const nombre = ref('')
            const apellido = ref('')
            const identificacion = ref('')
            const telefono = ref('')
            const email = ref('')
            const errores = ref([])

            //# methods
            const set_route = (json)=>{ 
                Router.push(json)
            }

            const guardar = ()=>{

                errores.value = []

                if(!nombre.value.length){ errores.value.push('ingrese nombres') }
                if(!apellido.value.length){ errores.value.push('ingrese apellidos') }
                if(!identificacion.value.length){ errores.value.push('ingrese identificación') }
                if(!telefono.value.length){ errores.value.push('ingrese teléfono') }
                if(!email.value.length){ errores.value.push('ingrese email') }
                if(!Utilities.check_email(email.value)){ errores.value.push('formato de email incorrecto!') }
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }

                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Director.store({
                        'nombres': nombre.value,
                        'apellidos': apellido.value,
                        'identificacion': identificacion.value,
                        'telefono':  telefono.value,
                        'email': email.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'estado':1
                    })

                    seccion.value = 0

                }

            }
      
            const firstLetter = (name) => {
                return name.charAt(0).toLowerCase() || 'default';
            }

            const editar = ()=>{
                // 
            }

            // computeds
            const urlsf = computed(()=> Store.state.urlsf )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const directores_all = computed(()=> Store.state.directores )
      
            const filter_directores = computed(() => {
            
               let key = search.value.toLowerCase()

                if (key.length > 3) {
                    return directores_all.value.filter((d) => {
                        return (
                            d.nombres.toLowerCase().includes(key) ||
                            d.apellidos.toLowerCase().includes(key) ||
                            d.email.toLowerCase().includes(key) ||
                            d.identificacion.toString().toLowerCase().includes(key)
                        )
                    })
                } else {
                    return directores_all.value
                }
            })

            return {
                search,
                urlsf,
                listado,
                actual_sede,
                set_route,
                directores_all,
                filter_directores,
                seccion,
                nombre,
                apellido,
                identificacion,
                telefono,
                email,
                guardar,
                firstLetter,
                editar
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    if(!Store.state.directores.length){
                        Director.index()
                    }
                })

            })

        }
  
    })
  
</script>