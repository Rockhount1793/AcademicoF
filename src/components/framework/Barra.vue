<template>

    <div class="p-1 z-0">
      
        <div class="flex justify-between">
  
            <div class="flex items-center w-auto mr-3">
  
                <Router-link to="/" class="ml-2 mr-2">
                    <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" :src="urlsf+'/images/logo.svg'" alt="logo" />
                </Router-link>
    
                <div class="font-semibold text-xs lg:text-sm text-gray-100 flex items-center">
                    <div>
                        <p class="h-4">Sede: {{sede.nombre}}</p>
                        <p class="h-4">Lectivo: {{lectivo.numero}} </p>
                    </div>

                    <div class="px-2">
                        <p class="h-4">&nbsp;</p>
                        <p class="h-4">Grado: {{grado.nombre}}</p>
                    </div>
                </div>
    
            </div>
            
            <div class=" w-12 h-10">
                <img v-if="cargador" class="rounded-full" :src="urlsf+'/images/cargador.gif'" alt="cargador" />
            </div>
  
            <div class="flex items-center p-0.5">
  
                
                <div class="hidden lg:inline-flex mr-2 truncate">
                    <span class="text-xs font-thin text-gray-100">[ {{version}} ]</span>
                </div>

                <div class="flex-none">
  
                    <div @click="menu_perfil = !menu_perfil" class="cursor-pointer w-9 h-9">
    
                        <img class="rounded-full" :src="urlsf+'/images/avatar/'+user.avatar" alt="avatar" />
    
                    </div>
  
                    <div v-if="menu_perfil" class="intro-b border border-pink-100 rounded-md shadow-xl bg-gray-900 mr-6 z-20 absolute right-0 mt-1 w-auto">
                        
                        <div class="text-white">
                            
                            <div class="p-2">
                                
                                <div @click="set_route('Perfil'); set_seccion_num([200,20]);" :class="seccion_num[0] == 200 ? 'border border-white bg-pink-600 text-white':'' " class="cursor-pointer truncate flex items-center p-2 transition duration-300 ease-in-out group hover:bg-pink-100 rounded-md">
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-5 w-5 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <p class="group-hover:text-gray-700 text-sm font-semibold">
                                        Perfil
                                    </p>

                                </div>
    
                                <!--<div class="cursor-pointer truncate flex items-center p-2 transition duration-300 ease-in-out group hover:bg-green-100 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6 group-hover:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p class="group-hover:text-green-700 text-sm font-semibold">
                                        Configuración
                                    </p>
                                </div>-->
    
                            </div>
  
                            <div  class="pointer p-2 border-t">
                                
                                <div @click="cerrar_sesion()"  class="cursor-pointer truncate flex items-center p-2 transition duration-300 ease-in-out group hover:bg-pink-100 rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-6 w-6 group-hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <p class="group-hover:text-gray-700 text-sm font-semibold">
                                        Cerrar Sesión
                                    </p>
                                </div>

                            </div>
  
                        </div>

                    </div>
                  
                </div>
  
            </div>
  
        </div>
      
    </div>

</template>
  
<script lang="js">

    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import { useRoute, RouterLink, RouterView } from 'vue-router'
    import  Router  from "@/router"

    import Store from '@/store'


    export default defineComponent({

        name: 'Barra',

        setup(){
        
            let menu_perfil = ref(false)

            //methods
            const ocultar_menu_perfil = ()=>{ menu_perfil = false }
            const set_seccion_num = ()=>{  }
            const set_route = ()=>{  }

            const cerrar_sesion = async ()=>{ 

                const result = await Store.dispatch('clear_data_sede')
                .then((res)=>{
    
                    if(res){
    
                        localStorage.removeItem('token')
                        Store.commit('set_login',false)
                        Store.commit('set_seccion_num',[0,0])
                        Store.commit('set_usuario',{'usuario_id':0, 'avatar': 'default.png'})
                        Router.push({'name':'Entrar'})
                        
                    }
    
                })
                .catch((err)=>{
                    console.log(err)
                })
                .finally(()=>{
    
                })

            }

            // computed
            const urlsf = computed(()=> Store.state.urlsf )
            const version = computed(()=> Store.state.version )
            const user = computed(()=> Store.state.usuario )
            const seccion_num = computed(()=> Store.state.seccion_num )
            const sede = computed(()=> Store.state.actual_sede )
            const lectivo = computed(()=> Store.state.actual_lectivo )
            const grado = computed(()=> Store.state.actual_grado )
            const cargador = computed(()=> Store.state.loading )
      
            return {
                version,
                urlsf,
                user,
                menu_perfil,
                ocultar_menu_perfil,
                set_seccion_num,
                set_route,
                seccion_num,
                sede,
                lectivo,
                grado,
                cerrar_sesion,
                cargador
            }
      
        },

        mounted(){
        
        }

    })
</script>