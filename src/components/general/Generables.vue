
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Generables <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span></p>

                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <!--<p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>-->
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div class="lg:flex lg:space-x-3 flex-1 py-2 w-full lg:w-1/4 px-2 lg:px-1">

                    <div class="flex-1 lg:flex mt-2">
                        <p class="font-semibold text-gray-100 text-md px-2">Grado</p>
                        <SelectorGrado class="mx-auto w-full lg:w-64"></SelectorGrado>
                    </div>

                    <div class="mt-2">
                        <button @click="recurso = 'tarjeta' " :class="recurso == 'tarjeta' ? 'bg-pink-700 shadow-pink-500':'bg-cyan-700 shadow-cyan-500' " class="shadow-md w-full lg:w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Tarjetas</button>
                    </div>

                    <div class="mt-2">
                        <button @click="recurso = 'planilla' " :class="recurso == 'planilla' ? 'bg-pink-700 shadow-pink-500':'bg-cyan-700 shadow-cyan-500' " class=" shadow-md w-full lg:w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Planilla</button>
                    </div>
                    
                    <div class="mt-2">
                        <button @click="recurso = 'informe' " :class="recurso == 'informe' ? 'bg-pink-700 shadow-pink-500':'bg-cyan-700 shadow-cyan-500' " class=" shadow-md w-full lg:w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Informe</button>
                    </div>

                    <div class="mt-2">
                        <button @click="recurso = 'boletin' " :class="recurso == 'boletin' ? 'bg-pink-700 shadow-pink-500':'bg-cyan-700 shadow-cyan-500' " class=" shadow-md w-full lg:w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Boletin</button>
                    </div>

                </div>

                <hr class="mt-3 border border-gray-500" />

                <!-- Matriculas -->
                <div v-if="seccion == 0" class="">

                    <ul>

                        <li v-if="!matriculas.length">
                            <p class="px-2 font-semibold text-gray-100 mt-3"> No hay matriculas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in matriculas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div class="w-full">
                                    
                                    <p class="w-full truncate rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        {{item.nombres}}  {{item.apellidos}} : {{item.identificacion }}
                                    </p>
                                    
                                </div>

                                <div class="w-full h-8 ">
                                    <button title="generar pdf" @click="generar(item)" class="flex space-x-1 mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                        
                                        <p class="capitalize">Generar {{ recurso }}</p>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mt-1 text-gray-100 w-4 h-4">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                         
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>

                </div>


            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import Barra from "@/components/framework/Barra.vue"
    import Lateral from "@/components/framework/Lateral.vue"
    import SelectorDirector from "@/components/framework/Selector_Docente.vue"
    import SelectorGrado from "@/components/framework/Selector_Grado.vue"
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Generable from "@/controllers/Generable"
    import Utilitie from "@/utilities"
  
    export default defineComponent({
    
        'name':'Generables',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let seccion = ref(0)
            let recurso = ref('boletin')

            //# methods

            const generar = (json)=>{

                Router.push({'name':'Boletin'})
               //Generable[recurso.value]({'archivo': json.nombres+'_'+json.identificacion ,'estudiante_id': json.estudiante_id, 'recurso': recurso.value },()=>{})
            
            }


            const filter_estudiante = (estudiante_id)=>{

                let array = estudiantes.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.estudiante_id == estudiante_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }

            }


            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
           
            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    
                    Matricula.index(()=>{})
                
                }
                
            })

            return {
                urlsf,
                generar,
                actual_sede,
                actual_lectivo,
                actual_grado,
                matriculas,
                seccion,
                filter_estudiante,
                filter_identificacion,
                recurso
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0 && this.actual_sede.sede_id > 0 && this.actual_lectivo.lectivo_id > 0){
                                    
                        Matricula.index(()=>{})

                    }

                })

            })

        }
  
    })
  
</script>