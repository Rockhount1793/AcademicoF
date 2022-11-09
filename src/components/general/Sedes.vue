
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-200 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg"> Sedes</p>

                <div class="px-2">
                    <p @click="seccion = 1" v-if="seccion == 0" class="shadow w-32 shadow-cyan-800 cursor-pointer rounded border bg-cyan-800 text-center h-7 leading-6 text-gray-100 font-thin text-md"> Crear</p>
                    <p @click="seccion = 0" v-if="seccion == 1" class="shadow w-32 shadow-cyan-800 cursor-pointer rounded border bg-cyan-800 text-center h-7 leading-6 text-gray-100 font-thin text-md"> Lista</p>
                </div>

                <div v-if="seccion == 0" class="mt-3">
                    <ul>
                        <li :key="index" v-for="(item, index,key) in  sedes ">
                            <span class="cursor-pointer px-2 h-5 rounded border border-gray-300 bg-indigo-100 capitalize text-gray-500 font-semibold">{{item.nombre_sede}}</span>
                        </li>
                    </ul>
                </div>

                <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2  rounded p-1 px-2">

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="nombre">Nombre</p>
                        <input v-model="nombre" class="text-center placeholder:text-center rounded w-full lg:w-1/2" id="nombre" type="text" placeholder=" Nombre"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="direccion">Dirección</p>
                        <input v-model="direccion" class="text-center  placeholder:text-center rounded w-full lg:w-1/2" id="direccion" type="text" placeholder=" K0 #0-0"/>
                    </div>

                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Teléfono</p>
                        <input v-model="telefono" class="text-center  placeholder:text-center rounded w-full lg:w-1/2" type="text" placeholder=" 1234567890"/>
                    </div>
                    
                    <div class="flex-1 py-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Email</p>
                        <input v-model="email" class="text-center  placeholder:text-center rounded w-full lg:w-1/2" type="email" placeholder=" colegio@colegio.com"/>
                    </div>

                    <button @click="guardar()" class="border mt-3 rounded shadow-lg float-right bg-indigo-900 text-gray-100 px-2 w-32">
                        Guardar
                    </button>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script lang="js">
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Sede from '@/controllers/Sede'
  
    export default defineComponent({
    
        'name':'Sedes',

        'components':{
            Barra, Lateral
        },

        setup(){
        
            //# data 
            const listado = ref(false)
            const seccion = ref(1)

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

                errores = []

                if(!nombre.value.length){ errores.push('ingrese nombre') }
                if(!direccion.value.length){ errores.push('ingrese dirección') }
                if(!telefono.value.length){ errores.push('ingrese teléfono') }
                if(!email.value.length){ errores.push('ingrese email') }

                if(errores.length){
                    alert('complete el formulario')
                }else{
                    
                    Sede.store({
                        'nombre_sede': nombre.value,
                        'direccion_sede': direccion.value,
                        'telefono_sede':  telefono.value,
                        'email_sede': email.value,
                        'principal_sede': nombre.value,
                        'estado_sede':1
                    })
                }

            }
      
            const urlsf = computed(()=> Store.state.urlsf )
            const sedes = computed(()=> Store.state.sedes )

            watch(listado,(value) => {

                if(value) {
                  //code
                }
            
            })
      
            return {
                urlsf,
                listado,
                set_route,
                sedes,
                seccion,
                nombre,
                direccion,
                telefono,
                email,
                guardar
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