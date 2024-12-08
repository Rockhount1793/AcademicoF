<template>
  <div class="h-screen overflow-hidden relative bg-gradient-to-r from-gray-800 to-gray-900 max-w-8xl">
    <BarraInicio></BarraInicio>
    <section class="bg-gray-900">
      <div class="flex flex-col items-center justify-top px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 pt-3 text-2xl font-semibold text-white" >
          <img
            class="w-8 h-8 mr-2 mt-1"
            src="/images/logo.svg"
            alt="logo"
          />
          Academic
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar sesión
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >E-mail</label
                >
                <input
                  type="email"
                  name="email"
                  v-model="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  @keyup.enter="entrar()"
                  v-model="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >Mantener sesión iniciada</label
                    >
                  </div>
                </div>
              </div>
              <button
                type="button"
                @click="entrar()"
                class="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="js">

import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
import Store from '@/store'
import BarraInicio from '@/components/framework/NavbarInicio.vue'
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
        const sesion = ref(true)
        const errores = ref([])

        // methods
        const entrar = ()=>{

            errores.value = []

            if(!email.value ){ errores.value.push('Ingrese email!') }
            if(!password.value ){ errores.value.push('Ingrese contraseña!') }

            if(errores.value.length){
                alert(errores.value[0])
            }else{
                Aplicacion.login({'email':email.value,'password':password.value,'sesion':sesion.value})
            }

        }

        return{
            entrar,
            email,
            password,
            sesion
        }

    },
    mounted(){
        this.$nextTick(()=>{
        })
    }
})
</script>

