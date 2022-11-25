
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Calificaciones <span v-if="asignatura.asignatura_id > 0">{{asignatura.nombre}} </span></p>

                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Asignaturas</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Calificaciones</p>
                </div>
              

                <hr class="mt-3 border border-gray-500" />

                <!-- Asignaturas -->
                <div v-if="seccion == 0" class="mt-3">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                        <p class="font-semibold text-gray-100 text-md px-2">Grado</p>
                        <SelectorGrado class="mx-auto"></SelectorGrado>
                    </div>

                    <ul>

                        <li v-if="!matriculas.length">
                            <p class="px-2 font-semibold text-gray-100 mt-3"> No hay matriculas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in matriculas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div>
                                    
                                    <div class="w-64 rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        {{item.nombre}}
                                    </div>
                                    
                                </div>

                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="get_calificaciones(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                       ver calificaciones
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>

                </div>

                <!-- Calificaciones -->
                <div v-if="seccion == 1" class="mt-3">
                    
                    <div v-if="!calificaciones.length">
                        <p class="px-2 font-semibold text-gray-100 mt-3"> No hay calificaciones creados </p>
                    </div>

                    <div v-else class="flex-1 space-y-2">
                        
                        <div :key="index" v-for="(item, index, key) in calificaciones" class="pb-3 w-full lg:w-3/4 px-2">
    
                            <div class="w-full rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                Periodo: {{item.periodo}}
                            </div>
    
                            <div class="mt-1">
                               {{item.nota_1}}
                            </div>

                            <div class="mt-1">
                                {{item.nota_2}}
                            </div>
    
                            <div class="mt-1">
                                {{item.nota_3}}
                            </div>

                            <div class="mt-1">
                                {{item.nota_4}}
                            </div>
 
                            <div class="mt-1">
                                {{item.nota_5}}
                            </div>
     
                            <div class="mt-1">
                                {{item.nota_6}}
                            </div>                            

                            <div class="flow-root">
                                <button @click="update_logro(item)" class="float-right h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                    Guardar
                                </button>
                            </div>
    
                        </div>
                        
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Asignartura from "@/controllers/Asignatura"
    import Grado from "@/controllers/Grado"
    import Docente from "@/controllers/Docente"
    import Logro from "@/controllers/Logro"
  
    export default defineComponent({
    
        'name':'Calificaciones',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let asignatura = ref({'asignatura_id': 0, 'nombre':''}) 
            let seccion = ref(0)
            let aprobado = ref(true)
            let nombre = ref('')
            let numero_ih = ref(0)
            let numero_hcd = ref(0)
            let director_id = ref(0)
            let errores = ref([])

            //# methods
            const update_logro = (_logro)=>{

                if(_logro.aprobado.length == 0 || _logro.aprobado.length > 500){ errores.push('texto aprobado menor a 500 caracteres') } 
                if(_logro.no_aprobado.length == 0 || _logro.no_aprobado.length > 500){ errores.push('texto no aprobado menor a 500 caracteres') } 

                Logro.update(_logro)
            
            }

            const set_aprobado = (bool)=>{
                aprobado.value = bool
            }

            const set_director = (number)=>{ 
                director_id.value = number
            }

            const guardar = ()=>{

                errores = []

                if(nombre.value.length < 0 || nombre.value.length > 100){ errores.push('ingrese nombre') }
                if(typeof numero_ih.value != 'number' || numero_ih.value < 1 || numero_ih.value > 999 ){ errores.push('ingrese ih') }
                if(typeof numero_hcd.value != 'number' || numero_hcd.value < 1 || numero_hcd.value > 999 ){ errores.push('ingrese hcd') }
                if(typeof director_id.value != 'number' || director_id.value < 1){ errores.push('seleccione director') }
                if(actual_sede.value.sede_id == 0){ errores.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.push('seleccione grado') }
                
                if(errores.length){
                    alert(errores[0])
                }else{
                    
                    Asignartura.store({
                        'nombre': nombre.value,
                        'ih': numero_ih.value,
                        'hcd': numero_hcd.value,
                        'docente_id': director_id.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'grado_id': actual_grado.value.grado_id,
                        'estado':1
                    })

                    seccion.value = 0
                    nombre.value = ''
                    numero_ih.value = 0
                    numero_hcd.value = 0

                }

            }

            const filter_director = (director_id)=>{

                let array = directores.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.docente_id == director_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
                
            }

            const get_logros = (_asignatura)=>{
                Logro.index(_asignatura.asignatura_id,()=>{
                    asignatura.value = _asignatura
                    seccion.value = 1
                })
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const matriculas = computed(()=> Store.state.matriculas )
            const calificaciones = computed(()=> Store.state.calificaciones )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_asignatura = computed(()=> Store.state.actual_asignatura )
            const directores = computed(()=> Store.state.docentes )

            watch(actual_grado,(value) => {

                if(value.grado_id > 0) {
                    Asignartura.index(()=>{})
                }
                
            })

            return {
                urlsf,
                listado,
                matriculas,
                calificaciones,
                seccion,
                nombre,
                numero_ih,
                numero_hcd,
                director_id,
                actual_lectivo,
                actual_asignatura,
                actual_grado,
                guardar,
                set_director,
                filter_director,
                get_logros,
                asignatura,
                aprobado,
                set_aprobado,
                update_logro
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0 && this.actual_asignatura.asignatura_id > 0){
                                    
                        Asignartura.index(()=>{
                            
                        })

                    }

                })

            })

        }
  
    })
  
</script>