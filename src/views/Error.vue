<template>
    <div class="h-auto min-h-screen relative bg-gradient-to-r from-gray-700  to-gray-900 max-w-8xl ">
      
        <BarraInicio></BarraInicio>
  
        <div class="intro-b pt-5 lg:w-2/4 mx-auto">
  
            <div class="mx-2 flex flex-col w-auto lg:w-ful items-center">
  
                <h1 class="my-4 z-10 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
                    404
                    <span class="bg-clip-text ml-2 text-transparent bg-gradient-to-r from-pink-400  to-pink-600">
                        No encontrada
                    </span>
                </h1>
  
                <form class="bg-gray-900 z-10 opacity-75 w-full shadow-lg rounded-lg px-8 pt-10 pb-3">
                    <div class="mb-4 text-white">
  
                        Ir a la pagina de Bienvenida
  
                    </div>
  
                    <div class="cursor-pointer flex items-center pt-4">
                        <button @click="continuar()" type="button" id="btn-continuar" class="mx-auto bg-gradient-to-r from-pink-800 to-pink-500 hover:from-pink-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
                            Continuar
                        </button>
                    </div>
  
                </form>
  
                <div class="z-0 fixed mx-auto w-3/4 sm:w-3/5 lg:w-2/5 xl:w-2/6 2xl:w-1/5 max-w-2xl">
                    <img class="mx-auto w-full" :src=" urlsf+'/images/logo.svg' " />
                </div>

            </div>
  
        </div>
    </div>
</template>

<script lang="js">
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"    
    import Store from '@/store'
    import BarraInicio from '@/components/framework/Barra_Inicio.vue'
    import Aplicacion from '@/controllers/Aplicacion'
    import Router from '@/router'
    
    export default defineComponent({

        'name':'Error',

        'components':{
            BarraInicio
        },

        setup(){

            // methods
            const continuar = ()=>{
                Router.push({'name':'Bienvenida'})
            }
            
            const urlsf = computed(()=> Store.state.urlsf )
            
            return{
                urlsf,
                continuar
            }

        },

        mounted(){
            this.$nextTick(()=>{
                
              
            })
        }

    })

</script>

<style>

</style>
  