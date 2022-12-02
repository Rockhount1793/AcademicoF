
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg"> Sedes</p>

                <div class="mt-3 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div v-if="seccion == 0" class="mt-3">
                    <ul>
                        
                        <li v-if="!sedes.length">
                            <p class="px-2 font-semibold text-gray-100"> No hay sedes creadas</p>
                        </li>

                        <li :key="index" v-for="(item, index,key) in  sedes ">
                            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center">

                                <div>
                                    
                                    <button v-if="actual_sede.sede_id == item.sede_id" class="shadow-md w-28 shadow-cyan-500 rounded bg-cyan-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        Actual
                                    </button>
                                    
                                    <button v-else @click="set_sede(item)" class="shadow-md w-28 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        Seleccionar
                                    </button>

                                </div>
                                
                                <div class="w-full lg:w-1/3 truncate">
                                    <p class="mt-2 lg:mt-0.5 cursor-pointer px-2 p-0.5 bg-gray-800 capitalize text-gray-100 font-semibold">{{item.nombre}}</p>
                                </div>

                            </div>
                        
                        </li>

                    </ul>
                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2 rounded p-1 px-2 ">

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="nombre">Nombre</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="nombre" type="text" placeholder=" Nombre"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="direccion">Dirección</p>
                        <input v-model="direccion" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="direccion" type="text" placeholder=" K0 #0-0"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Teléfono</p>
                        <input v-model="telefono" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" type="text" placeholder=" 1234567890"/>
                    </div>
                    
                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Email</p>
                        <input v-model="email" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" type="email" placeholder=" usuario@dominio.com"/>
                    </div>

                    <div class=""></div>

                    <div class="">
                        <button @click="guardar()" class="w-32 mt-3 h-7 shadow-md shadow-pink-500 rounded bg-pink-800 text-gray-100 px-2">
                            Guardar
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
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Sede from "@/controllers/Sede"
    import Utilities from "@/utilities"
  
    export default defineComponent({
    
        'name':'Sedes',

        'components':{
            Barra, Lateral
        },

        setup(){
        
            //# data 

            const listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('')
            let direccion = ref('')
            let telefono = ref('')
            let email = ref('')
            let errores = ref([])

            //# methods
            const set_route = (json)=>{ 
                Router.push(json)
            }

            const guardar = ()=>{

                errores.value = []

                if(!nombre.value.length || nombre.value.length > 100){ errores.value.push('ingrese nombre') }
                if(!direccion.value.length || direccion.value.length > 100){ errores.value.push('ingrese dirección') }
                if(!telefono.value.length || telefono.value.length > 100){ errores.value.push('ingrese teléfono') }
                if(!email.value.length || email.value.length > 100){ errores.value.push('ingrese email') }
                if(!Utilities.check_email(email.value)){ errores.value.push('formato de email incorrecto!') }

                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Sede.store({
                        'nombre': nombre.value,
                        'direccion': direccion.value,
                        'telefono':  telefono.value,
                        'email': email.value,
                        'estado':1
                    })

                    seccion.value = 0
                }

            }

            const set_sede = (json)=>{
                Store.dispatch('change_sede',json)
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const sedes = computed(()=> Store.state.sedes )
            const actual_sede = computed(()=> Store.state.actual_sede )
      
            return {
                urlsf,
                listado,
                set_route,
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
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    if(!Store.state.sedes.length){
                        Sede.index()
                    }
                })

            })

        }
  
    })
  
</script>