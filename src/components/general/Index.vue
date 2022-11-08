
<template>

    <div class="h-auto min-h-screen relative max-w-2xl bg-gradient-to-r from-cyan-600  to-cyan-800">
        
        <div class="h-4/6 pt-5 lg:w-2/4 mx-auto flex ">
  
            <div class="mx-2 flex flex-col w-full items-center">
  
                <div class="flex-1 z-10 ">
    
                    <h1 class="z-10 text-7xl md:text-8xl text-white opacity-90 font-bold leading-tight text-center">
                        Index
                    </h1>
    
                    <p class="z-10 opacity-90 text-gray-300 leading-normal font-semibold text-base md:text-2xl mb-8 text-center">
                       Listado
                    </p>
    
                </div>
  
                <div class="z-0 opacity-90 fixed mx-auto w-4/5 sm:w-4/6 lg:w-3/6 xl:w-3/6 2xl:w-2/6 max-w-2xl">
                    <img title="logo" class="mx-auto w-full" :src="urlsf+'/images/logo.svg'" />
                </div>
  
            </div>
  
        </div>
  
    </div>
  
</template>
  
<script lang="js">
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
  //import Aplicacion from "@/controller/index"
  
    export default defineComponent({
    
        'name':'Sedes',

        'components':{
            
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
        
        }
  
    })
  
</script>