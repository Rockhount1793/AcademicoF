<template>

    <div class="h-auto min-h-screen relative max-w-8xl bg-gradient-to-r from-cyan-600  to-cyan-800">
  
        <BarraInicio></BarraInicio>
  
        <div class="pt-5 lg:w-2/4 mx-auto">
  
            <div class="intro-b mx-2 flex flex-col w-auto lg:w-ful items-center">
  
                <h1 class="my-4 z-10 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
                    <span>Acerca</span>
                </h1>
  
                <div class="bg-gray-800 z-10 opacity-75 w-full shadow-lg rounded-lg px-8">
    
                    <div class="flex-1 text-sm text-gray-100 items-center p-3">
    
                        <h2 class="text-center">versión {{ version}}</h2>
                        <h2 class="text-center">2023 - NZCAICEDO</h2>
    
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
  