
<template>
    <div class="border-b-2 border-indigo-800 max-w-8xl z-0">
        <div class="flow-root">
            <RouterLink to="/home" class="ml-2 float-left">
                <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="logo" src="/images/logo.svg" />
            </RouterLink>

            <div class="flex items-center py-1 float-right ">
                <RouterLink to="/acerca" class="hover:bg-pink-100 hover:text-black border border-pink-500 flex items-center mr-2 p-1 px-5 py-0.5 rounded text-gray-50 font-semibold shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Acerca
                </RouterLink>
                <RouterLink to="/entrar" class="hover:bg-indigo-100 hover:text-black border border-indigo-500 flex items-center mr-2 p-1 px-5 py-0.5 rounded text-white font-semibold shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-indigo-500 transform rotate-90 h-5 w-5 mr-2">
                        <path stroke-linecap="round" stroke-width="2" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Entrar
                </RouterLink>
            </div>

        </div>
    </div>
  
</template>
  
<script lang="js">

    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import { useRoute, RouterLink, RouterView } from 'vue-router'
    import Store from '@/store'
  
    export default defineComponent({
        name:'BarraInicio'
    })
  
</script>