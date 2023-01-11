
<template>
            
    <div :class="listado ? 'flex w-12 md:w-48 ':'w-12' " class="group h-4/6 ">
    
        <div class="flex-1 z-10 space-y-3">
        
            <div class="rounded-t text-white flex items-center justify-between px-2">
                
                <p :class="listado ? 'hidden md:block':'hidden'" class="text-md opacity-90 font-semibold text-center">
                    Menu
                </p>

                <div >
                    <svg @click="set_listado()" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cursor-pointer w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>

            </div>
            
            <div @click="set_route({'name':'Sedes'}); set_seccion_num([1,0]);" :class="seccion_num[0] == 1 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 1 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Sedes" class=" p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Sedes
                </p>

            </div>

            <div @click="set_route({'name':'Lectivos'});set_seccion_num([2,0]);" :class="seccion_num[0] == 2 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 2 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Lectivos" class="p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                </div>
                
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Lectivos
                </p>

            </div>

            
            <div @click="set_route({'name':'Grados'});set_seccion_num([3,0]);" :class="seccion_num[0] == 3 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 3 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Grados" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Grados
                </p>

            </div>
            
            <div @click="set_route({'name':'Asignaturas'});set_seccion_num([4,0]);" :class="seccion_num[0] == 4 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 4 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Asignaturas" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Asignaturas
                </p>

            </div>

            <div @click="set_route({'name':'Logros'});set_seccion_num([5,0]);" :class="seccion_num[0] == 5 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 5 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Logros" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Logros
                </p>

            </div>

            <div @click="set_route({'name':'Calificaciones'});set_seccion_num([6,0]);" :class="seccion_num[0] == 6 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 6 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Calificaciones" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Calificaciones
                </p>

            </div>

            <div @click="set_route({'name':'Faltas'});set_seccion_num([13,0]);" :class="seccion_num[0] == 13 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 13 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Calificaciones" class="p-2 rounded-md">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                    </svg>

                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Faltas
                </p>

            </div>

            <div @click="set_route({'name':'Matriculas'});set_seccion_num([7,0]);" :class="seccion_num[0] == 7 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 7 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Matriculas" class="p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                    </svg>
                </div>

                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Matriculas
                </p>

            </div>

            <hr />

            <div @click="set_route({'name':'Docentes'});set_seccion_num([8,0]);" :class="seccion_num[0] == 8 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 8 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Docentes" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                  
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Docentes
                </p>

            </div>

            <div @click="set_route({'name':'Estudiantes'});set_seccion_num([9,0]);" :class="seccion_num[0] == 9 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 9 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Estudiantes" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
                  
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Estudiantes
                </p>

            </div>

            <div @click="set_route({'name':'Personas'});set_seccion_num([10,0]);" :class="seccion_num[0] == 10 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 10 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Personas" class="p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                </div>
                    
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Personas
                </p>

            </div>

            <div @click="set_route({'name':'Directores'});set_seccion_num([11,0]);" :class="seccion_num[0] == 11 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 11 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Rectores" class="p-2 rounded-md">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                  
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Rectores
                </p>

            </div>

            <hr/>

            <div @click="set_route({'name':'Generables'});set_seccion_num([12,0]);" :class="seccion_num[0] == 12 ? 'text-gray-100':'hover:rounded hover:text-gray-100 hover:bg-pink-200 text-gray-500' " class="cursor-pointer flex items-center px-2 group transform transition duration-200 ease-in-out">

                <div :class="seccion_num[0] == 12 ? 'shadow-md shadow-pink-500 bg-pink-800':'' " title="Generables" class="p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                </div>
                  
                <p :class="listado ? 'hidden md:block':'hidden'" class="ml-2 z-10 opacity-90  leading-normal font-semibold text-base text-center">
                    Generables
                </p>

            </div>

        </div>
        
    </div>

</template>
  
<script>
  
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from "@/router"
    import Aplicacion from '@/controllers/Aplicacion'
  
    export default defineComponent({
    
        'name':'Lateral',

        'components':{
            
        },

        
        setup(){
        
            //# data 
            let listado = ref(true)
            
            //# methods
            const set_route = (json)=>{ 
                Router.push(json)
            }
      
            const set_listado = ()=>{
                listado.value = !listado.value
            }

            const set_seccion_num = function(array){
                Store.commit('set_seccion_num',array)
            }

            //# computed
            const seccion_num = computed(()=> Store.state.seccion_num )
            const urlsf = computed(()=> Store.state.urlsf )


            //# watch
            watch(listado,(value) => {

                if(value) {
                  //code
                }
            
            })
      
            return {
                urlsf,
                listado,
                set_route,
                set_listado,
                seccion_num,
                set_seccion_num
            }
      
        },
    
        mounted(){
            this.$nextTick(()=>{
                
                Aplicacion.check_seccion()
                
            })
        }
  
    })
  
</script>