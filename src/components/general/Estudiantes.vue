
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg"> Estudiantes</p>

                <div class="px-2">
                    <p @click="seccion = 1" v-if="seccion == 0" class="shadow-md w-32 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>
                    <p @click="seccion = 0" v-if="seccion == 1" class="shadow-md w-32 shadow-pink-500 cursor-pointer rounded bg-pink-800 text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div v-if="seccion == 0" class="mt-3">
                    <ul>

                        <li v-if="!estudiantes.length">
                            <p class="px-2 font-semibold text-gray-100"> No hay estudiantes creados</p>
                        </li>

                        <li :key="index" v-for="(item, index,key) in  estudiantes">
                            
                            <div class="p-2 w-full lg:w-1/2 truncate">
                                <p class="px-2 h-7 bg-gray-800 capitalize text-gray-100 font-semibold">{{item.nombres}} {{item.apellidos}} : {{item.identificacion}}</p>
                            </div>
                        
                        </li>

                    </ul>
                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2 rounded p-1 px-2">

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Nombres</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="nombre" type="text" placeholder=" Nombres"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Apellidos</p>
                        <input v-model="apellido" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="apellido" type="text" placeholder=" Apellidos"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Identificación</p>
                        <input v-model="identificacion" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full lg:w-1/2" id="direccion" type="text" placeholder=" 0000000"/>
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
  
<script>
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Estudiante from '@/controllers/Estudiante'
    import Utilities from '@/utilities'
  
    export default defineComponent({
    
        'name':'Estudiantes',

        'components':{
            Barra, Lateral
        },

        setup(){
        
            //# data 
            const listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('')
            let apellido = ref('')
            let identificacion = ref('')
            let errores = ref([])

            //# methods
            
            const guardar = ()=>{

                errores = []

                if(!nombre.value.length){ errores.push('ingrese nombres') }
                if(!apellido.value.length){ errores.push('ingrese apellidos') }
                if(!identificacion.value.length){ errores.push('ingrese identificación') }
                if(actual_sede.value.sede_id == 0){ errores.push('seleccione sede') }

                if(errores.length){
                    alert(errores[0])
                }else{
                    
                    Estudiante.store({
                        'nombres': nombre.value,
                        'apellidos': apellido.value,
                        'identificacion': identificacion.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'estado':1
                    })

                    nombre.value = ''
                    apellido.value = ''
                    identificacion.value = ''
                    seccion.value = 0

                }

            }
      
            const urlsf = computed(()=> Store.state.urlsf )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const estudiantes = computed(()=> Store.state.estudiantes )
      
            return {
                urlsf,
                listado,
                estudiantes,
                seccion,
                nombre,
                apellido,
                identificacion,
                guardar
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    if(!Store.state.estudiantes.length){
                        Estudiante.index()
                    }
                })

            })

        }
  
    })
  
</script>