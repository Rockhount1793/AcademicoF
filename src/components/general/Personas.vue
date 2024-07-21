
<template>

    <div class="">
    
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">


            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <!-- <p class="text-gray-500 text-center font-semibold text-lg"> Personas</p> -->

                <div class="px-2 mt-4">
                    <p @click="seccion = 1" v-if="seccion == 0" class="shadow-md w-32 shadow-indigo-100 cursor-pointer rounded bg-indigo-800 text-center h-7 leading-6 text-gray-50 font-semibold text-md"> Crear</p>
                    <p @click="seccion = 0" v-if="seccion == 1" class="shadow-md w-32 shadow-indigo-100 cursor-pointer rounded bg-indigo-800 text-center h-7 leading-6 text-gray-50 font-semibold text-md"> Lista</p>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <div v-if="seccion == 0" class="mt-3">
                    <ul>

                        <li v-if="!personas.length">
                            <p class="px-2 font-medium text-gray-500"> No hay personas creadas</p>
                        </li>

                        <li :key="index" v-for="(item, index,key) in personas">
                            
                            <div class="p-2 w-full lg:w-1/2 truncate">
                                <p class="px-2 h-7 bg-gray-800 capitalize text-gray-500 font-semibold">{{item.nombres}} {{item.apellidos}}</p>
                            </div>
                        
                        </li>
                    </ul>
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
  
<script lang="js">
  
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Persona from '@/controllers/Persona'
    import Utilities from '@/utilities'
  
    export default defineComponent({
    
        'name':'Personas',

        'components':{
            
        },

        setup(){
        
            //# data 
            const listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('')
            let apellido = ref('')
            let identificacion = ref('')
            let telefono = ref('')
            let email = ref('')
            let errores = ref([])

            //# methods
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
                    
                    Persona.store({
                       'nombres': nombre.value,
                       'apellidos': apellido.value,
                       'identificacion': identificacion.value,
                       'telefono':  telefono.value,
                       'sede_id':  actual_sede.value.sede_id,
                       'email': email.value,
                       'estado':1
                    })

                    seccion.value = 0

                }

            }
      
            // #computed
            const personas = computed(()=> Store.state.personas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            
            return {
                listado,
                personas,
                seccion,
                nombre,
                apellido,
                identificacion,
                telefono,
                email,
                guardar
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    if(Store.state.personas.length){
                      //  Persona.index()
                    }
                })

            })

        }
  
    })
  
</script>