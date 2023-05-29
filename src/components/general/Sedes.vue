<template>
<div class="mx-auto">

    <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
        
        <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">
       
            <p class="text-gray-500 mt-3 text-center font-semibold text-lg"> Sedes</p>
            
            <div class="mt-4 flex space-x-2 px-2">
                <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
            </div>

            <hr class="mt-3 border border-gray-200" />

            <div v-if="seccion == 0" class="overflow-y-auto h-5/6 mt-3">

                <div class="">
                    <p v-if="actual_sede.sede_id == 0" class="p-2 text-center text-yellow-500"> No hay una sede seleccionada!</p>
                </div>

                <div class="mt-4 mx-4 mb-4 flow-root ">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">
                        <li v-for="sede in sedes" :key="sede.sede_id" class="py-4">
                            <div class="flex items-center space-x-4">
                                <div class="min-w-0 flex-1">
                                    <p class="truncate text-large font-medium text-gray-900">{{ sede.nombre }}</p>
                                    <p class="truncate text-sm text-gray-500">{{ sede.email }}</p>
                                </div>
                                <div>

                                    <div v-if="actual_sede.sede_id == sede.sede_id" class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ">
                                        Sede actual
                                    </div>

                                    <div v-else @click="set_sede(sede)" class="inline-flex items-center rounded-full bg-white px-2.5 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-400 hover:text-white hover:cursor-pointer">
                                        Seleccionar esta sede
                                    </div>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                
            </div>

            <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2 rounded p-1 px-2 ">

                <div class="flex-1 py-2">
                    <p class="font-semibold text-gray-400 text-md px-2" for="nombre">Nombre</p>
                    <input v-model="nombre" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" id="nombre" type="text" placeholder=" Nombre de la nueva sede" />
                </div>

                <div class="flex-1 py-2">
                    <p class="font-semibold text-gray-400 text-md px-2">Email</p>
                    <input v-model="email" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" type="email" placeholder=" misede@belen.gov.co" />
                </div>

                <div class="">
                    <button @click="guardar()" class="w-32 mt-3 mb-3 h-7 shadow-md shadow-slate-400 rounded bg-slate-700 text-gray-100 px-2">
                        Guardar sede
                    </button>
                </div>

            </div>

        </div>

    </div>

</div>
</template>

<script lang="js">
import Barra from "@/components/framework/Barra.vue"
import Lateral from "@/components/framework/Lateral.vue"
import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
import Store from "@/store"
import Router from "@/router"
import Aplicacion from "@/controllers/Aplicacion"
import Sede from "@/controllers/Sede"
import Utilities from "@/utilities"

export default defineComponent({

    'name': 'Sedes',

    'components': {
        Barra,
        Lateral
    },

    setup() {

        //# data 

        const listado = ref(false)
        let seccion = ref(0)

        let nombre = ref('')
        let direccion = ref('')
        let telefono = ref('')
        let email = ref('')
        let errores = ref([])

        //# methods
        
        const guardar = () => {

            errores.value = []

            if (!nombre.value.length || nombre.value.length > 100) { errores.value.push('ingrese nombre') }
            // if (!direccion.value.length || direccion.value.length > 100) { errores.value.push('ingrese dirección') }
            // if (!telefono.value.length || telefono.value.length > 100) { errores.value.push('ingrese teléfono') }
            if (!email.value.length || email.value.length > 100) { errores.value.push('ingrese email') }
            if (!Utilities.check_email(email.value)) { errores.value.push('formato de email incorrecto!') }

            if (errores.value.length) {
                alert(errores.value[0])
            } else {

                Sede.store({
                    'nombre': nombre.value,
                    'direccion': direccion.value,
                    'telefono': telefono.value,
                    'email': email.value,
                    'estado': 1
                }, () => {
                    nombre.value = ''
                    direccion.value = ''
                    telefono.value = ''
                    email.value = ''
                })

                seccion.value = 0
            }

        }

        const set_sede = (json) => {
            Store.dispatch('change_sede', json)
        }

        //# computed
        const urlsf = computed(() => Store.state.urlsf)
        const sedes = computed(() => Store.state.sedes)
        const actual_sede = computed(() => Store.state.actual_sede)

        return {
            urlsf,
            listado,
            actual_sede,
            sedes,
            seccion,
            nombre,
            direccion,
            telefono,
            email,
            guardar,
            set_sede
        }

    },

    mounted() {

        this.$nextTick(() => {

            Aplicacion.check_login(() => {
                if (!Store.state.sedes.length) {
                    Sede.index()
                }
            })

        })

    }

})
</script>
