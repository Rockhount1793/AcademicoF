
<template>

    <div class="h-auto min-h-screen relative bg-gradient-to-r from-gray-700  to-gray-900 max-w-8xl ">
        
        <BarraInicio></BarraInicio>
        
        <div class="h-4/6 pt-5 lg:w-2/4 mx-auto flex ">
  
            <div class="mx-2 flex flex-col w-full items-center">
  
                <div class="flex-1 z-10 ">
    
                    <h1 class="z-10 text-7xl md:text-8xl text-white opacity-90 font-bold leading-tight text-center">
                        Academico
                    </h1>
    
                    <p class="z-10 opacity-90 text-gray-300 leading-normal font-semibold text-base md:text-2xl mb-8 text-center">
                       Plataforma de calificaciones
                    </p>
    
                </div>
  
                <div class="z-0 opacity-90 fixed mx-auto w-4/5 sm:w-4/6 lg:w-3/6 xl:w-3/6 2xl:w-2/6 max-w-2xl">
                    <img class="transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6 mx-auto w-full" :src="urlsf+'/images/logo.svg'" />
                </div>
  
            </div>
  
        </div>
  
    </div>
  
</template>
  
<script lang="js">
  
    import BarraInicio from '@/components/framework/Barra_Inicio.vue'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Aplicacion from '@/controllers/Aplicacion'
    import Router from '@/router'

    export default defineComponent({
    
        'name':'Bienvenida',

        'components':{
            BarraInicio
        },

        setup(){
        
            //# data 
            const listado = ref(false)
            
            //# methods
            const consultar_anterior = ()=>{ 
            
            }
      
            const urlsf = computed(()=> Store.state.urlsf )

            watch(listado,(value) => {

                if(value) {
                  //code
                }
            
            })
      
            return {
                urlsf,
                listado,
                consultar_anterior
            }
      
        },
    
        mounted(){
        
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    Router.push({'name':'Dashboard'})
                })

            })

        }
  
    })
  
</script>