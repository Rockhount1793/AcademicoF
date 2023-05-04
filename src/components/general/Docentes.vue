<template>
<div class="">

    <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">

        <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">

            <p class="text-gray-500 mt-3 text-center font-semibold text-lg"> Docentes</p>

            <div class="flex w-full justify-between">

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1; clearForm()" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                </div>

                <div class="w-1/3 mt-3 mr-4" v-if="seccion == 0">
                    <label for="search" class="sr-only">Buscar docente</label>
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </div>
                        <input v-model="search" id="search" name="search" class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Buscar docente.." type="search" />
                    </div>
                </div>

            </div>

            <hr class="mt-3 border border-gray-200" />

            <div v-if="seccion == 0" class="mt-3">

                <!-- New template -->

                <div class="px-4 sm:px-6 lg:px-8">

                    <div v-if="!docentes.length" class="sm:flex sm:items-center">
                        <p class="px-2 font-semibold text-gray-500"> No hay docentes creados</p>
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
                                        
                                        <tr v-for="doce in filter_docentes" :key="doce.email">

                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(doce.nombres) + '.png'" alt="docente.nombres" />
                                                    </div>
                                                    <div class="ml-6">
                                                        <div class="font-medium text-gray-900">{{ doce.nombres }}</div>
                                                        <div class="text-gray-500">Cedula: {{ doce.identificacion }}</div>
                                                    </div>
                                                </div>
                                            </td>
                            
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="font-medium text-gray-900">
                                                    {{ doce.apellidos }}
                                                </div>
                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="doce.estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ docente.estado ? 'Activo':'Inactivo'  }} </span>
                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">
                                                    {{ doce.telefono }}
                                                </div>
                                            </td>
                                            
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ doce.email }}
                                            </td>

                                            <td @click="editar_docente(doce)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                                Editar
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div v-if="seccion == 1" class="mt-3 p-1 px-2">

                <p class="text-gray-500 mt-3 font-semibold text-lg"> {{ docente.docente_id > 0 ? 'Editar Docente' : 'Crear Docente'}}</p>
                <hr/>

                <div class="mt-3 p-2 lg:grid lg:grid-cols-2 lg:gap-2">

                    <div>
                        <label for="nombres" class="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <input v-model="docente.nombres" id="nombre" type="text" name="nombres" class="w-full lg:w-3/4 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis nombres" />
                        </div>
                    </div>

                    <div>
                        <label for="apellidos" class="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </div>
                            <input v-model="docente.apellidos" type="text" name="apellidos" id="apellidos" class="w-full lg:w-3/4 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis apellidos" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" text-gray-400 w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                </svg>

                            </div>
                            <input v-model="docente.email" type="email" name="email" id="email" class="w-full lg:w-3/4 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="docente@gmail.com" />
                        </div>
                    </div>

                    <div>
                        <label for="identificacion" class="block text-sm font-medium leading-6 text-gray-900">Identificacion</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>

                            </div>
                            <input v-model="docente.identificacion" type="text" name="identificacion" id="identificacion" class="w-full lg:w-3/4 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="36123722" />
                        </div>
                    </div>

                    <div>
                        <label for="text" class="block text-sm font-medium leading-6 text-gray-900">Celular</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </div>
                            <input v-model="docente.telefono" type="text" name="telefono" id="telefono" class="w-full lg:w-3/4 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="3126665895" />
                        </div>
                    </div>

                </div>

                <div class="mt-3 p-2 flex-1 lg:grid lg:grid-cols-2 lg:gap-2">

                    <button @click="clearForm(); seccion = 0" class="w-full lg:w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                        Cancelar
                    </button>
                    
                    <div class="w-full lg:w-3/4">
                        <button @click="guardar_actualizar()" class="lg:float-right w-full lg:w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                            {{ docente.docente_id > 0 ? 'Actualizar' : 'Guardar'}}
                        </button>
                    </div>
                        
                </div>                

            </div>

        </div>

    </div>

</div>
</template>

<script>
import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance, reactive } from "vue"
import Store from '@/store'
import Aplicacion from '@/controllers/Aplicacion'
import Docente from '@/controllers/Docente'
import Utilities from '@/utilities'

export default defineComponent({

    'name': 'Docentes',

    setup() {

        //# data 
        const search = ref("")
        const seccion = ref(0)
        const errores = ref([])

        // docente
        const docente = ref({
            'nombres':'',
            'apellidos':'',
            'identificacion':'',
            'telefono':'',
            'email':'',
            'sede_id': 0,
            'estado':1,
            'docente_id':0
        })

        // write a method that takes fhe first letter of a string and returns it
        const firstLetter = (name) => {
            return name.charAt(0).toLowerCase() || 'default';
        }

        const editar_docente = (json) => {
            docente.value = json
            seccion.value = 1
        }

        const guardar_actualizar = () => {

            validar()
         
            if (errores.value.length) {
                alert(errores.value[0])
            } else {
       
                if(docente.value.docente_id > 0){ 
                    Docente.update(docente.value)
                }else{
                    docente.value.sede_id = actual_sede.value.sede_id
                    Docente.store(docente.value)
                }
                
                clearForm()
                seccion.value = 0

            }

        }

        const validar = ()=>{
            errores.value = []
            if (!docente.value.nombres.length || docente.value.nombres.length > 99) { errores.value.push('ingrese nombres') }
            if (!docente.value.apellidos.length || docente.value.apellidos.length > 99) { errores.value.push('ingrese apellidos') }
            if (!docente.value.identificacion.length || docente.value.identificacion.length > 99) { errores.value.push('ingrese identificación') }
            if (!docente.value.telefono.length || docente.value.telefono.length > 99) { errores.value.push('ingrese teléfono') }
            if (!docente.value.email.length || docente.value.email.length > 99) { errores.value.push('ingrese email') }
            if (!Utilities.check_email(docente.value.email)){ errores.value.push('formato de email incorrecto!') }
            if (actual_sede.value.sede_id == 0) { errores.value.push('seleccione sede') }
        } 

        const clearForm = ()=>{
            docente.value = {
            'nombres':'',
            'apellidos':'',
            'identificacion':'',
            'telefono':'',
            'email':'',
            'sede_id': 0,
            'estado': 1,
            'docente_id':0
           }

        }

        // # computed
        const urlsf = computed(() => Store.state.urlsf)
        const actual_sede = computed(() => Store.state.actual_sede)
        const docentes = computed(() => Store.state.docentes)

        const filter_docentes = computed(() => {
            
            const key = search.value.toLowerCase()

            if (key.length > 3) {
                return docentes.value.filter((d) => {
                    return (
                        d.nombres.toLowerCase().includes(key) ||
                        d.apellidos.toLowerCase().includes(key) ||
                        d.email.toLowerCase().includes(key) ||
                        d.identificacion.toString().toLowerCase().includes(key)
                    )
                })
            } else {
                return docentes.value
            }
        })

        return {
            urlsf,
            seccion,
            search,
            docentes,
            guardar_actualizar,
            firstLetter,
            filter_docentes,
            editar_docente,
            docente,
            clearForm  
        }

    },

    mounted(){

        this.$nextTick(() => {

            Aplicacion.check_login(() => {
                if (!Store.state.docentes.length) {
                    Docente.index(() => {})
                }
            })

        })

    }

})
</script>
