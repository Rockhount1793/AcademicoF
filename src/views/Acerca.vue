<template>

    <div class="h-auto min-h-screen relative bg-gradient-to-r from-gray-700  to-gray-900 max-w-8xl">
  
        <BarraInicio></BarraInicio>
  
        <div class="pt-5 lg:w-2/4 mx-auto">
  
            <div class="intro-b mx-2 flex flex-col w-auto lg:w-ful items-center">
  
                <h1 class="my-4 z-10 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
                    <span>Acerca</span>
                </h1>
  
                <div class="bg-gray-900 z-10 opacity-75 w-full shadow-lg rounded-lg px-8">
    
                    <div class="flex-1 text-sm text-gray-500 items-center p-3">
    
                        <h2 class="text-center text-gray-300">{{ version}}</h2>
                        <h2 class="text-center text-lg font-semibold text-pink-500">Rockhount™ 2023</h2>
                        <div class="text-center">
                            <a class="text-blue-500 underline" target="_blank" href="https://t.me/rockhount">@Telegram</a>
                        </div>
    
                    </div>
    
                </div>
  
                <div class="z-0 fixed mx-auto w-3/4 sm:w-3/5 lg:w-2/5 xl:w-2/6 2xl:w-1/5 max-w-2xl">
                    <img class="mx-auto w-full" :src="urlsf+'/images/logo.svg' " />
                </div>

            </div>
  
        </div>
      
    </div>

</template>
  
<script lang="js">
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"    
    import Store from '@/store'
    import BarraInicio from '@/components/framework/Barra_Inicio.vue'

    export default defineComponent({

        'name':'Acerca',

        'components':{ BarraInicio },

        setup(){

            const urlsf = computed(()=> Store.state.urlsf )
            const version = computed(()=> Store.state.version )

            return{
                urlsf,
                version
            }

        },

        mounted() {
            
        },



    })
  
</script>

<style scoped>
  
</style>
  