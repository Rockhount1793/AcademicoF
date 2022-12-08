
<template>

    <main class="bg-white h-auto min-h-screen max-w-8xl overflow-hidden">
        
        <div class="h-4/6 lg:w-2/4 mx-auto px-5">
  
            <div class="mx-2 flex w-full items-center">
  
                <div class="">
                    <img title="logo" class="mx-auto w-24" :src="urlsf+'/images/logo_isnos.jpeg'" />
                </div>

                <div class="flex-1 z-10 text-xs text-black font-semibold text-center">
    
                    <p class=""> REPUBLICA DE COLOMBIA </p>
                    <p class=""> SECRETARÍA DE EDUCACIÓN DEPARTAMENTAL </p>
                    <p class=""> iNSTITUCION EDUCATIVA BELÉN - SEDE nombre_sede </p> 
                    <p class=""> Decreto 706 de junio de 2004 </p>
                    <p class=""> I.E BELÉN RESOLUCIÓN DE APROBACIÓN 1953 de Abril 29 del 2021 </p> 
                    <p class=""> NIT: 813.011.815-2 DANE 241359000160 </p>
                    <p class=""> ISNOS - HUILA </p>
                    <p class=""> BOLETÍN PRIMER PERIODO - LECTIVO 2022</p>
                </div>
  
                <div class="">
                    <img title="logo" class="mx-auto w-24" :src="urlsf+'/images/logo_belen.jpeg'" />
                </div>
  
            </div>

            <div class="mx-auto mt-3">

                <div class="mx-auto ">

                    <table class="w-full text-xs text-black font-semibold text-center">
    
                        <thead>

                            <th class="border border-gray-900">
                                IDENTIFICACIÓN    
                            </th>
                            
                            <th class="border border-gray-900">
                                NOMBRES
                            </th>
                            
                            <th class="border border-gray-900">
                                APELLIDOS
                            </th>

                            <th class="border border-gray-900">
                                GRADO
                            </th>

                        </thead>
    
                        <tbody>
                            
                            <td class="border border-gray-900">
                                654654
                            </td>
                            
                            <td class="border border-gray-900">
                                    LUIS
                            </td>
                            
                            <td class="border border-gray-900">
                                GARCÍA
                            </td>
                            
                            <td class="border border-gray-900">
                                PRIMERO
                            </td>
    
                        </tbody>
    
                    </table>

                </div>

                <div class="mt-1 flow-root text-black font-semibold text-xs px-5">
                    
                    <div class="float-left">
                        <p>Puesto 1 de 15</p>
                    </div>

                    <div class="float-right">
                        FLT. Total 10
                    </div>                    

                </div>

                <div class="mx-auto mt-1">

                    <table class="w-full text-xs text-black font-semibold text-center">
    
                        <thead>

                            <th class="border border-gray-900">
                                ASIGNATURA
                            </th>
                            
                            <th class="border border-gray-900">
                                DESEMPEÑO
                            </th>

                            <th class="border border-gray-900">
                                NOTA
                            </th>

                            <th class="border border-gray-900">
                                FLT.
                            </th>

                        </thead>
    
                        <tbody>
                            
                            <td class="border w-28 border-gray-900">
                                MATEMATICAS
                            </td>
                            
                            <td class="border border-gray-900">
                                Sabe sumar
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                5.0
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                1
                            </td>
    
                        </tbody>
    
                    </table>

                </div>

                <div class="mt-5 flow-root text-black font-semibold text-xs px-5">
                    
                    <div class="float-left">
                        <hr class="border border-black w-64" />
                        <p>OLGA LUCIA</p>
                        <p>Director(a) de curso</p>
                    </div>

                    <div class="float-right text-right">
                        <hr class="border border-black w-64" />
                        <p>MARIA MELBA MUÑOZ</p>
                        <p>Rector(a)</p>
                    </div>                    

                </div>

            </div>
  
        </div>
  
    </main>
  
</template>
  
<script lang="js">
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Aplicacion from '@/controllers/Aplicacion'
    import Router from '@/router'

    export default defineComponent({
    
        'name':'Boletin',

        'components':{
            
        },

        setup(){
        
            //# data 
            const listado = ref(false)
            
            //# methods
            const consultar_anterior = ()=>{ 
            
            }
      
            const urlsf = computed(()=> Store.state.urlsf )

            watch(listado,(value) => {

                if(value) {
                  //code
                }
            
            })
      
            return {
                urlsf,
                listado,
                consultar_anterior
            }
      
        },
    
        mounted(){
        
            this.$nextTick(()=>{
                
                //Aplicacion.check_login(()=>{
                //    //Router.push({'name':'Sedes'})
                //})

            })

        }
  
    })
  
</script>