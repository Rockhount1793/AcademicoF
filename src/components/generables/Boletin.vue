
<template>

    <main class="bg-white h-auto min-h-screen max-w-8xl overflow-hidden">
        
        <div class="pt-2 h-4/6 lg:w-2/4 mx-auto px-5">
  
            <div class="mx-2 flex w-full items-center">
  
                <div class="">
                    <img title="logo" class="mx-auto w-24" :src="urlsf+'/images/logo_isnos.jpeg'" />
                </div>

                <div class="flex-1 z-10 text-xs text-black font-semibold text-center">
    
                    <p class=""> REPUBLICA DE COLOMBIA </p>
                    <p class=""> SECRETARÍA DE EDUCACIÓN DEPARTAMENTAL </p>
                    <p class="uppercase"> INSTITUCION EDUCATIVA BELÉN - SEDE {{ boletin_info[0] }} </p> 
                    <p class=""> Decreto 706 de junio de 2004 </p>
                    <p class=""> I.E BELÉN RESOLUCIÓN DE APROBACIÓN 2257 de Marzo 15 del 2024 </p> 
                    <p class=""> NIT: 813.011.815-2 DANE 241359000160 </p>
                    <p class=""> ISNOS - HUILA </p>
                    <p class="uppercase"> BOLETÍN {{ boletin_info[1] }} Periodo - Lectivo {{ boletin_info[2] }}</p>
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
                                {{ filter_identificacion(boletin.estudiante.identificacion) }}
                            </td>
                            
                            <td class="uppercase border border-gray-900">
                                {{ boletin.estudiante.nombres }}
                            </td>
                            
                            <td class="uppercase border border-gray-900">
                                {{ boletin.estudiante.apellidos }}                        
                            </td>
                            
                            <td class="uppercase border border-gray-900">
                                {{ boletin.grado }}
                            </td>
    
                        </tbody>
    
                    </table>

                </div>

                <div class="mt-1 flow-root text-black font-semibold text-xs px-5">
                    
                    <div class="float-left">
                        <p>Puesto {{ boletin.puesto[0] }} de {{ boletin.puesto[1] }}</p>
                    </div>

                    <div class="float-right">
                        FLT. Total {{boletin.faltas }}
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
    
                        <tbody :key="index" v-for="(asignatura, index) in boletin.asignaturas" class="h-auto">
                            
                            <td class="py-3 uppercase border w-28 border-gray-900">
                                {{ asignatura.nombre }}
                            </td>
                            
                            <td class="border border-gray-900">
                                {{ asignatura.logro }}
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                {{ asignatura.nota }}
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                {{ asignatura.faltas }}
                            </td>
    
                        </tbody>
    
                    </table>

                </div>

                <div class="mx-auto py-5">
                
                    <p class="font-semibold">Observaciones:</p>

                    <hr class="mt-5 border-gray-500" />

                </div>

                <div class="py-5 flow-root text-black font-semibold text-xs px-5">
                    
                    <div class="float-left">
                        <hr class="border-gray-500 w-32 md:w-64" />
                        <p class="uppercase">{{ boletin.director }}</p>
                        <p>Director(a) de curso</p>
                    </div>

                    <div class="float-right text-right">
                        <hr class="border-gray-500 w-32 md:w-64" />
                        <p class="uppercase">{{ boletin.rector }}</p>
                        <p>Rector(a)</p>
                    </div>                    

                </div>

            </div>
  
        </div>
  
    </main>
  
</template>
  
<script>
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Aplicacion from '@/controllers/Aplicacion'
    import Router from '@/router'
    import Utilitie from "@/utilities"

    export default defineComponent({
    
        'name':'Boletin',

        'components':{
            
        },

        setup(){
            
            const urlsf = computed(()=> Store.state.urlsf )
            const boletin = computed(()=> Store.state.boletin )
      
            //# computed

            const boletin_info = computed(()=>{

                let sede = Store.state.actual_sede.nombre

                let periodos = {
                    'Periodo':'Periodo',
                    'Primero':'Primer',
                    'Segundo':'Segundo',
                    'Tercero':'Tercer',
                    'Cuarto': 'Cuarto',
                    'Final': 'Final' 
                }

                let periodo = periodos[Store.state.actual_periodo.nombre]
                let lectivo = Store.state.actual_lectivo.numero

                return [ sede, periodo, lectivo ]

            })

            //# filters
            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }

            return {
                urlsf,
                boletin,
                filter_identificacion,
                boletin_info
            }
      
        },
    
        mounted(){
        
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    
                    if(Store.state.boletin.estudiante.estudiante_id === 0){
                        Router.push({'name':'Generables'})
                    }

                })

            })

        }
  
    })
  
</script>