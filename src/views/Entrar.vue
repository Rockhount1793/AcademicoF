<template>
    <div class="h-auto min-h-screen relative max-w-8xl bg-gradient-to-r from-cyan-600  to-cyan-800">
      
        <BarraInicio></BarraInicio>
  
        <div class="intro-b pt-5 lg:w-2/4 mx-auto">
  
            <div class="mx-2 flex flex-col w-auto lg:w-ful items-center">
  
                <h1 class="my-4 z-10 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
                    Iniciar
                    <span class="bg-clip-text ml-2 text-transparent bg-gradient-to-r from-cyan-400  to-cyan-600">
                        Sesión
                    </span>
                </h1>
  
                <form class="bg-gray-900 z-10 opacity-75 w-full shadow-lg rounded-lg px-8 pt-10 pb-3">
                    <div class="mb-4">
  
                        <label for="username" class="sr-only">usuario</label>
                        <input id="username" name="username" autocomplete="on" placeholder="usuario" type="text" class="text-center mt-2 border rounded w-full p-2 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" />
    
                        <label for="password" class="sr-only">contraseña</label>
                        <input id="password" name="password" autocomplete="current-password" placeholder="contraseña" type="password" class="text-center mt-2 border rounded w-full p-2 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" />
  
                        <div class="flex mt-3 items-center justify-between">
                           <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label for="remember-me" class="ml-2 block text-sm text-cyan-500">
                                  Mantener sesión iniciada
                                </label>
                           </div>
     
                           <div class="text-sm">
                                <Link to="recovery" class="font-medium text-cyan-500 hover:text-cyan-300">
                                  ¿Olvido su contraseña?
                                </Link>
                           </div>
                        </div>
  
                    </div>
  
                    <div class="cursor-pointer flex items-center pt-4">
                        <button @click="entrar()" type="button" id="btn-continuar" class="mx-auto bg-gradient-to-r from-cyan-800 to-cyan-500 hover:from-cyan-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
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

    export default defineComponent({

        name:'Entrar',

        components:{
            BarraInicio
        },

        setup(){
            // data 
            const username = ref('leocj')
            const password = ref('123456')

            // methods
            const entrar = ()=>{
                Aplicacion.login({'username':username.value, 'password': password.value})
            }
            
            const urlsf = computed(()=> Store.state.urlsf )
            
            return{
                urlsf,
                entrar
            }

        },

        mounted(){

        }

    })

</script>

<style>

</style>
  