<template>
    <div class="h-auto min-h-screen relative bg-gradient-to-r from-gray-700  to-gray-900 max-w-8xl ">
      
        <BarraInicio></BarraInicio>
  
        <div class="intro-b pt-5 lg:w-2/4 mx-auto">
  
            <div class="mx-2 flex flex-col w-auto lg:w-ful items-center">
  
                <h1 class="my-4 z-10 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center">
                    Iniciar
                    <span class="bg-clip-text ml-2 text-transparent bg-gradient-to-r from-indigo-400  to-indigo-600">
                        Sesión
                    </span>
                </h1>
  
                <form class="bg-gray-900 z-10 opacity-75 w-full shadow-lg rounded-lg px-8 pt-10 pb-3">
                    <div class="mb-4">
  
                        <label for="email" class="sr-only">usuario</label>
                        <input id="email" name="email" autocomplete="on" v-model="email" placeholder="usuario" type="text" class="text-center mt-2 border rounded w-full p-2 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" />
    
                        <label for="password" class="sr-only">contraseña</label>
                        <input id="password" name="password" @keyup.enter="entrar()" v-model="password" autocomplete="current-password" placeholder="contraseña" type="password" class="text-center mt-2 border rounded w-full p-2 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" />
  
                        <div class="flex mt-3 items-center justify-between">
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" v-model="sesion" type="checkbox" class="h-4 w-4 text-indigo-600 rounded" />
                                <label for="remember-me" class="ml-2 block text-sm text-indigo-500">
                                  Mantener sesión iniciada
                                </label>
                            </div>
     
                            <div class="text-sm">
                                <Link to="recovery" class="font-medium text-indigo-500 hover:text-indigo-300">
                                  ¿Olvido su contraseña?
                                </Link>
                            </div>
                            
                        </div>
  
                    </div>
  
                    <div class="cursor-pointer flex items-center pt-4">
                        <button @click="entrar()" type="button" id="btn-continuar" class="mx-auto bg-gradient-to-r from-indigo-800 to-indigo-500 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
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

        'name':'Entrar',

        'components':{
            BarraInicio
        },

        setup(){
            // data 
            const email = ref('')
            const password = ref('')
            const sesion = ref (true)
            const errores = ref([])

            // methods
            const entrar = ()=>{
                
                errores.value = []

                if(!email.value ){ errores.value.push('Ingrese email!') }
                if(!password.value ){ errores.value.push('Ingrese contraseña!') }

                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    Aplicacion.login({'email':email.value, 'password': password.value, 'sesion': sesion.value})
                }

            }
            
            const urlsf = computed(()=> Store.state.urlsf )
            
            return{
                urlsf,
                entrar,
                email,
                password,
                sesion
            }

        },

        mounted(){
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    Router.push({'name':'Inicio'})
                })

            })
        }

    })

</script>

<style>

</style>
  