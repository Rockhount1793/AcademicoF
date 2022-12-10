
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
                    <p class=""> INSTITUCION EDUCATIVA BELÉN - SEDE nombre_sede </p> 
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
                                {{ filter_identificacion(boletin.estudiante.identificacion) }}
                            </td>
                            
                            <td class="uppercase border border-gray-900">
                                {{boletin.estudiante.nombres}}
                            </td>
                            
                            <td class="uppercase border border-gray-900">
                                {{boletin.estudiante.apellidos}}                        
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
    
                        <tbody :key="index" v-for="(asignatura, index) in boletin.asignaturas">
                            
                            <td class="uppercase border w-28 border-gray-900">
                                {{asignatura.nombre}}
                            </td>
                            
                            <td class="border border-gray-900">
                                {{ logro_comp(asignatura)[0] }}
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                {{ logro_comp(asignatura)[1] }}
                            </td>
                            
                            <td class="border w-10 border-gray-900">
                                1
                            </td>
    
                        </tbody>
    
                    </table>

                </div>

                <div class="mt-5 flow-root text-black font-semibold text-xs px-5">
                    
                    <div class="float-left">
                        <hr class="border border-black w-32 md:w-64" />
                        <p>OLGA LUCIA</p>
                        <p>Director(a) de curso</p>
                    </div>

                    <div class="float-right text-right">
                        <hr class="border border-black w-32 md:w-64" />
                        <p>MARIA MELBA MUÑOZ</p>
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
      
            // # methods

            const logro_comp = (asig)=>{

                let nota = {'nota_1': 0, 'nota_2': 0,'nota_3': 0,'nota_4': 0,'nota_5': 0,'nota_6': 0,'nota_7': 0,'nota_8': 0, 'nota_9': 0,}
                let nota_f = boletin.value.calificaciones.filter((l)=>l.asignatura_id == asig.asignatura_id )

                if(nota_f.lenght){ nota = nota_f[0] }

                let logro = { 'aprobado': 'calificaciones pendientes', 'no_aprobado': 'calificaciones pendientes' }
                let logro_f = boletin.value.logros.filter((l)=>l.asignatura_id == asig.asignatura_id )

                if(logro_f.lenght){ logro = logro_f[0] }


                // 70%
                const promedio_15 = (nota.nota_1 + nota.nota_2 + nota.nota_3 + nota.nota_4 + nota.nota_5)/5
                    
                // 15%
                const promedio_67 = (nota.nota_6 + nota.nota_7)/2 
                    
                // 15%
                const promedio_89 = (nota.nota_8 + nota.nota_9 )/2 
                    
                let valor_nota = ((promedio_15 + promedio_67 + promedio_89)/3).toFixed(2)
                let valor_logro = Number(valor_nota) > 3 ? logro.aprobado : logro.no_aprobado

                return [ valor_logro , valor_nota ]
 
            }

            //# filters
            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }

            return {
                urlsf,
                boletin,
                filter_identificacion,
                logro_comp
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