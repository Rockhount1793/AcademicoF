<template>

    <div class="absolute w-auto h-auto z-20">

        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div class="fixed inset-0 grid grid-cols-1 content-center">

            <div class="relative p-2 mx-auto rounded-md w-80 bg-white">

                <div class="mx-auto">

                    <h2 class="mt-3 flex text-center text-5xl font-extrabold text-pink-500">
                        <img class="mt-2 w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="academic.logo" />
                        Academic
                    </h2>

                    <p class="mt-2 text-center text-lg leading-5 text-gray-600 max-w">
                        Control de solicitud
                    </p>

                </div>

                <hr class="mt-2" />

                <div class="w-full mt-6">
                    <slot name="dialog"></slot>
                </div>

                <div class="mt-6 mx-auto">
                    <div class="px-4">

                        <div class="flex-1 mx-auto py-2 w-full">
                            <p class="text-center font-semibold text-gray-600 text-md px-2" for="nombre">Contraseña</p>
                            <input v-model="password_control.password"  type="password" complete class="w-full appearance-none shadow focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center placeholder:text-gray-300 rounded" />
                        </div>

                        <div class="mt-6 flex justify-between space-x-5">
                            
                            <button type="button" @click="continuar(false)" class="h-8 flex justify-center border border-blue-300 py-1 px-4 text-sm font-medium rounded text-blue-500  shadow-indigo-400 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                                Cancelar
                            </button>

                            <button type="button" @click="continuar(true)" class="h-8 w-full flex justify-center py-1 px-4 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 shadow shadow-indigo-400 hover:bg-gray-900 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                                Continuar
                            </button>
                            
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>

    import { defineComponent, ref, computed } from "vue"
    import Store from '@/store/index'

    export default defineComponent({

        name: 'Ventana-Emergente',

        props :{
            elemento:{ type: Object, required: true }
        },

        setup(props,{emit}){

            const urlsf = computed(()=> Store.state.urlsf )
            const password_control = ref({'status': false, 'password': ''})
            const elemento = computed(()=> props.elemento)
            const continuar = (status)=>{
                
                password_control.value.status = status
                if(status && password_control.value.password.length < 6){
                    alert(' Ingrese contraseña')
                    return 
                }

                emit('control_acceso',password_control.value)
            }

            return{
                urlsf,
                continuar,
                password_control,
                elemento
            }
        }

    })

</script>

<style scoped>
 .centrado {
    margin:0 auto;
    display: flex;
    justify-content: center;
  }
</style>