
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Calificaciones</p>

                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Estudiantes</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Asignaturas</p>
                    <p @click="seccion = 2" :class="seccion == 2 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Calificaciones</p>
                </div>

                <hr class="mt-3 border border-gray-500" />
                
                <div class="mt-3 space-y-2 lg:space-y-0 flex-1 lg:flex lg:space-x-2 px-2">
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-100">Estudiante:</span> {{estudiante.nombres}} {{estudiante.apellidos}}</p>
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-100">Identificación:</span> {{filter_identificacion(estudiante.identificacion)}}</p>
                    <p class="text-center h-7 leading-6 text-pink-500 font-semibold text-md"> <span class="text-gray-100">Asignatura:</span> {{asignatura.nombre}}</p>
                </div>
        
                <hr class="mt-3 border border-gray-500" />

                <!-- Estudiantes matriculados-->
                <div v-if="seccion == 0" class="mt-0">

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
                                
                                <div class="w-full">
                                    
                                    <div class="w-full px-2 truncate rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        {{item.nombres}}  {{item.apellidos}} : {{item.identificacion }}
                                    </div>
                                    
                                </div>

                                <div class="w-full h-8 lg:w-1/2 truncate">
                                    <button @click="set_estudiante(item)" class="mt-0.5 h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                       ver estudiante
                                    </button>
                                </div>

                            </div>
                        
                        </li>

                    </ul>

                </div>

                <!-- Asignaturas -->
                <div v-if="seccion == 1" class="mt-0">

                    <ul>
            
                        <li v-if="!asignaturas.length">
                            <p class="px-2 font-semibold text-gray-100 mt-3"> No hay asignaturas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in asignaturas ">
                
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                    
                                <div class="w-full">
                                    
                                    <div class="w-full px-2 truncate rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
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
                <div v-if="seccion == 2" class="mt-3">
                    
                    <div v-if="!calificaciones.length">
                        <p class="px-2 font-semibold text-gray-100 mt-3"> No hay calificaciones creadas </p>
                    </div>

                    <!-- 4 periodos --->
                    <div v-else class="flex-1 space-y-2">
                        
                        <div :key="index" v-for="(item, index, key) in calificaciones" class="pb-3 w-full lg:w-3/4 px-2">
    
                            <div class="px-2 flow-root w-full rounded bg-cyan-900 h-7 leading-6 text-gray-100 font-semibold text-md">
                                
                                <p class="float-left">Periodo: {{item.periodo}}</p>

                                <div @click="item.estado = ((valor)=>{ return valor == 1 ? 0 : 1 })(item.estado) " class="rounded-md border border-cyan-500 text-cyan-500 group float-right mt-0.5 cursor-pointer">
                                    <svg :class="item.estado == 1 ? 'trasform rotate-180':'' " class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>

                            </div>

                            <section v-if="item.estado == 1" class="">

                                <div class="p-1 bg-gray-800 px-2 mt-1 rounded border border-gray-500">
    
                                    <div class="mt-3">
                                        <input id="nota_1" class="rounded w-16 text-center" type="number" v-model="item.nota_1" min="0" max="5" step="1">
                                        <label for="nota_1" class="px-2 font-semibold text-md text-gray-100">Prueba escrita</label>
                                    </div>
        
                                    <div class="mt-1">
                                        <input id="nota_2" class="rounded w-16 text-center" type="number" v-model="item.nota_2" min="0" max="5" step="1">
                                        <label for="nota_2" class="px-2 font-semibold text-md text-gray-100">Prueba escrita</label>
                                    </div>
        
                                    <div class="mt-1">
                                        <input id="nota_3" class="rounded w-16 text-center" type="number" v-model="item.nota_3" min="0" max="5" step="1">
                                        <label for="nota_3" class="px-2 font-semibold text-md text-gray-100">Prueba oral</label>
                                    </div>
        
                                    <div class="mt-1">
                                        <input id="nota_4" class="rounded w-16 text-center" type="number" v-model="item.nota_4" min="0" max="5" step="1">
                                        <label for="nota_4" class="px-2 font-semibold text-md text-gray-100">Trabajo escrito</label>
                                    </div>
         
                                    <div class="mt-1">
                                        <input id="nota_5" class="rounded w-16 text-center" type="number" v-model="item.nota_5" min="0" max="5" step="1">
                                        <label for="nota_5" class="px-2 font-semibold text-md text-gray-100">Taller</label>
                                    </div>
    
                                    <div class="mt-1 flex-1">
                                        <button id="primera" class="w-16 sahdow-md border border-pink-800 text-pink-500 rounded">{{promedios_periodo[index].primarias}}</button>
                                        <span for="primera" class="px-2 font-semibold text-md text-pink-100">Preliminar</span>
                                    </div>
             
                                </div>

                                <div class="p-1 bg-gray-800 px-2 mt-1 rounded border border-gray-500">

                                    <div class="mt-1">
                                        <input id="nota_6" class="rounded w-16 text-center" type="number" v-model="item.nota_6" min="0" max="5" step="1">
                                        <label for="nota_6" class="px-2 font-semibold text-md text-gray-100">Puntualidad</label>
                                    </div>
        
                                    <div class="mt-1">
                                        <input id="nota_7" class="rounded w-16 text-center" type="number" v-model="item.nota_7" min="0" max="5" step="1">
                                        <label for="nota_7" class="px-2 font-semibold text-md text-gray-100">Presentación personal</label>
                                    </div>
    
                                    <div class="mt-1 flex-1">
                                        <button id="primera" class="w-16 sahdow-md border border-pink-800 text-pink-500 rounded">{{promedios_periodo[index].secundarias}}</button>
                                        <span for="primera" class="px-2 font-semibold text-md text-pink-100">Preliminar</span>
                                    </div>
    
                                </div>

                                <div class="p-1 bg-gray-800 px-2 mt-1 rounded border border-gray-500">

                                    <div class="mt-1">
                                        <input id="nota_8" class="rounded w-16 text-center" type="number" v-model="item.nota_8" min="0" max="5" step="1">
                                        <label for="nota_8" class="px-2 font-semibold text-md text-gray-100">Comportamiento</label>
                                    </div>
                                    
                                    <div class="mt-1">
                                        <input id="nota_9" class="rounded w-16 text-center" type="number" v-model="item.nota_9" min="0" max="5" step="1">
                                        <label for="nota_9" class="px-2 font-semibold text-md text-gray-100">Interes y participación</label>
                                    </div>
    
                                    <div class="mt-1 flex-1">
                                        <button id="primera" class="w-16 sahdow-md border border-pink-800 text-pink-500 rounded">{{promedios_periodo[index].terciarias}}</button>
                                        <span for="primera" class="px-2 font-semibold text-md text-pink-100">Preliminar</span>
                                    </div>
    
                                </div>

                                <div class="flow-root pt-2">
    
                                    <div class="float-left flex-1 px-2">
                                        <button id="primera" class="w-16 sahdow-md border border-cyan-800 text-cyan-500 rounded">{{ ((promedios_periodo[index].primarias +promedios_periodo[index].secundarias + promedios_periodo[index].terciarias)/3).toFixed(2) }}</button>
                                        <span for="primera" class="px-2 font-semibold text-md text-pink-100">Final {{item.periodo}} periodo</span>
                                    </div>
    
                                    <button @click="update_calificacion(item)" class="float-right h-6 px-2 rounded shadow-md shadow-pink-500  bg-pink-800 text-gray-100 font-semibold">
                                        Guardar
                                    </button>

                                </div>
    
                            </section>

                        </div>
                        
                    </div>
        
                    <!-- 5 periodo --->
                    <div v-if="calificaciones.length" class="flex-1 space-y-2">
                        
                        <div class="pb-3 w-full lg:w-3/4 px-2">
    
                            <div class="w-full rounded bg-pink-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                Promedio Final {{promedio_final}}
                            </div>
    
                        </div>
                        
                    </div>

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
    import Grado from "@/controllers/Grado"
    import Docente from "@/controllers/Docente"
    import Logro from "@/controllers/Logro"
    import Matricula from "@/controllers/Matricula"
    import Asignatura from "@/controllers/Asignatura"
    import Calificacion from "@/controllers/Calificacion"
    import Utilitie from "@/utilities"
  
    export default defineComponent({
    
        'name': 'Calificaciones',

        'components': {
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data
            let listado = ref(false)
            let estudiante = ref({'estudiante_id': 0, 'nombres': 'Nombres', 'apellidos': 'Apellidos', 'identificacion': 0})
            let asignatura = ref({'asignatura_id': 0, 'nombre': 'Asignatura'})
            let seccion = ref(0)
            let errores = ref([])

            //# methods

            const update_calificacion = (json)=>{
                
                errores.value = []

                if(typeof Number(json.nota_1) != 'number' || Number(json.nota_1) > 5 || Number(json.nota_1) < 0){ errores.value.push('nota 1 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_2) != 'number' || Number(json.nota_2) > 5 || Number(json.nota_2) < 0){ errores.value.push('nota 2 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_3) != 'number' || Number(json.nota_3) > 5 || Number(json.nota_3) < 0){ errores.value.push('nota 3 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_4) != 'number' || Number(json.nota_4) > 5 || Number(json.nota_4) < 0){ errores.value.push('nota 4 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_5) != 'number' || Number(json.nota_5) > 5 || Number(json.nota_5) < 0){ errores.value.push('nota 5 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_6) != 'number' || Number(json.nota_6) > 5 || Number(json.nota_6) < 0){ errores.value.push('nota 6 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_7) != 'number' || Number(json.nota_7) > 5 || Number(json.nota_7) < 0){ errores.value.push('nota 7 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_8) != 'number' || Number(json.nota_8) > 5 || Number(json.nota_8) < 0){ errores.value.push('nota 8 no debe ser menor a 0 o mayor a 5!') }
                if(typeof Number(json.nota_9) != 'number' || Number(json.nota_9) > 5 || Number(json.nota_9) < 0){ errores.value.push('nota 9 no debe ser menor a 0 o mayor a 5!') }
                
                if(!errores.value.length){

                    Calificacion.update(json)

                }else{

                    alert(errores.value[0])
                
                }

            }
            
            const set_estudiante = (json)=>{

                estudiante.value = json
                seccion.value = 1

            }

            const get_calificaciones = (item)=>{
                
                let params = { 
                    'estudiante_id': estudiante.value.estudiante_id,
                    'asignatura_id': item.asignatura_id
                }

                if(estudiante.value.estudiante_id > 0 && item.asignatura_id > 0){

                    Calificacion.index(params,()=>{
                        asignatura.value = item
                        seccion.value = 2
                    })

                }else{
                    alert('Selecione un estudiante!') 
                }


            }
            
            const get_asignaturas = ()=>{
        
                Asignatura.index(()=>{
                    
                })

            }

            const filter_identificacion = (number)=>{
                return Utilitie.format_tnumber(number)
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const matriculas = computed(()=> Store.state.matriculas )
            const asignaturas = computed(()=> Store.state.asignaturas )
            const calificaciones = computed(()=> Store.state.calificaciones )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_asignatura = computed(()=> Store.state.actual_asignatura )
           
            const promedios_periodo = computed(()=>{

                let promedios = {
                    0: {'primarias': 0, 'secundarias': 0, 'terciarias': 0},
                    1: {'primarias': 0, 'secundarias': 0, 'terciarias': 0},
                    2: {'primarias': 0, 'secundarias': 0, 'terciarias': 0},
                    3: {'primarias': 0, 'secundarias': 0, 'terciarias': 0}
                }

                for (let index = 0; index < calificaciones.value.length; index++) {
                    
                    const element = calificaciones.value[index]
                    
                    // 70%
                    const promedio_15 = (element.nota_1 + element.nota_2 + element.nota_3 + element.nota_4 + element.nota_5)/5
                    
                    // 15%
                    const promedio_67 = (element.nota_6 + element.nota_7)/2 
                    
                    // 15%
                    const promedio_89 = (element.nota_8 + element.nota_9 )/2 
                    
                    promedios[index] = {'primarias': promedio_15 , 'secundarias': promedio_67 , 'terciarias': promedio_89 } 
                
                }

               return promedios

            })

            const  promedio_final = computed(()=>{

                let primero = (promedios_periodo.value[0].primarias + promedios_periodo.value[0].secundarias + promedios_periodo.value[0].terciarias)/3
                let segundo = (promedios_periodo.value[1].primarias + promedios_periodo.value[1].secundarias + promedios_periodo.value[1].terciarias)/3
                let tercero = (promedios_periodo.value[2].primarias + promedios_periodo.value[2].secundarias + promedios_periodo.value[2].terciarias)/3
                let cuarto = (promedios_periodo.value[3].primarias + promedios_periodo.value[3].secundarias + promedios_periodo.value[3].terciarias)/3

                return ((primero + segundo + tercero + cuarto)/4).toFixed(2)

            })

            //# watch
            watch(seccion,(value) => {

                if(value == 1 && actual_grado.value.grado_id > 0 ) {
                    Asignatura.index(()=>{})
                }
                
            })

            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    
                    Matricula.index(()=>{})
                
                }
            
            })

            watch(estudiante,(value) => {

                let params = { 
                    'estudiante_id': value.estudiante_id,
                    'asignatura_id': asignatura.value.asignatura_id
                }

                if(value.estudiante_id > 0 && asignatura.value.asignatura_id > 0){

                    Calificacion.index(params,()=>{
                       seccion.value = 2
                    })

                }
            
            })

            watch(asignatura,(value) => {

                let params = { 
                    'estudiante_id': estudiante.value.estudiante_id,
                    'asignatura_id': value.asignatura_id
                }

                if(estudiante.value.estudiante_id > 0 && value.asignatura_id > 0){

                    Calificacion.index(params,()=>{
                       seccion.value = 2
                    })

                }
            
            })

            watch(matriculas,(value) => {

                estudiante.value = {'estudiante_id': 0, 'nombres': 'Nombres', 'apellidos': 'Apellidos', 'identificacion': 0}
                asignatura.value = {'asignatura_id': 0, 'nombre': 'Asignatura'}
                Store.commit('set_calificaciones',[])

            })

            return {
                urlsf,
                listado,
                estudiante,
                matriculas,
                calificaciones,
                seccion,
                actual_lectivo,
                actual_asignatura,
                actual_grado,
                get_asignaturas,
                set_estudiante,
                get_calificaciones,
                asignatura,
                asignaturas,
                filter_identificacion,
                promedios_periodo,
                promedio_final,
                update_calificacion
                
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(!Store.state.matriculas.length && this.actual_grado.grado_id > 0 && this.actual_lectivo.lectivo_id > 0){

                        Matricula.index(()=>{})

                    }

                })

            })

        }
  
    })
  
</script>