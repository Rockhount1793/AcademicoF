
<template>

    <div class="">
        
        <div class="mt-2 min-h-full w-auto px-2 md:space-x-2">

            <div class="ml-2 p-1 rounded border border-gray-300 h-auto">

                <p class="text-gray-500 mt-3 text-center font-semibold text-lg">Generables Grado <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span></p>

                <hr class="mt-3 border border-gray-200" />

                <div class="flex flex-1 py-2 mx-auto">

                    <div class="flex-1 lg:flex px-2 lg:px-10 lg:space-x-10">

                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md">Grado</p>
                            <SelectorGrado class="mx-auto w-full"></SelectorGrado>
                        </div>
                        
                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md px-2">Periodo</p>
                            <SelectorPeriodo class="mx-auto w-full"></SelectorPeriodo>
                        </div>

                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md px-2">Generable</p>
                            <SelectorGenerable class="mx-auto w-full"></SelectorGenerable>
                        </div>

                    </div>

                </div>

                <div class="block">

                    <div class="mt-3 flex items-center mx-auto">
                        <!-- si el recurso es entre rango 1 - 10 NO REQUIERE selección de estudiante  -->
                        <button v-if="actual_generable.recurso < 10" @click="generar_archivo()" class="mx-auto w-64 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                            <p class="capitalize">Descargar {{ actual_generable.nombre }}</p>
                        </button>

                        <!-- si el recurso es entre rango 11 - 20 REQUIERE selección de estudiante  -->
                        <div v-else-if="actual_generable.recurso > 10" class="mx-auto w-96 bg-pink-700 shadow-pink-500 shadow-md rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                            <p class="">Seleccione el estudiante a generar el <span class="capitalize">{{ actual_generable.nombre }}</span></p>
                        </div>

                        <p v-else class="text-pink-600 w-full text-center leading-6 font-semibold text-md">
                            Por favor elija en todos los campos...
                        </p>

                    </div>
                    
                </div>

                <!-- Matriculas -->
                <div v-if="seccion == 0" class="overflow-y-auto">

                    <div class="px-0 sm:px-2 lg:px-4">

                        <div v-if="!matriculas.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay matriculas creados</p>    
                        </div>

                        <div v-else class="mt-2">
                            <div class="overflow-x-auto">
                                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table class="min-w-full border divide-y divide-gray-300 mb-4">
                                        
                                        <thead>
                                            <tr>
                                                <th scope="col" class="px-3 py-1 border text-left text-sm font-semibold text-gray-900">
                                                    Nombres
                                                </th>
                                                <th scope="col" class="px-3 w-24 py-1 border text-left text-sm font-semibold text-gray-900">
                                                    Estado
                                                </th>
                                                <th v-if="actual_generable.recurso > 10" scope="col" class="px-3 w-32 py-1 border text-sm font-semibold text-pink-700 text-center capitalize">
                                                    Generar
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="divide-y divide-gray-200 bg-white">
                                            <tr v-for="(matri, index) in matriculas" :key="index+10">

                                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div class="flex items-center">
                                                        <div class="h-10 w-10 flex-shrink-0">
                                                            <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(matri.nombres) + '.png'" alt="estudiante.nombres" />
                                                        </div>
                                                        <div class="ml-6">
                                                            <div class="font-medium text-base text-gray-900 capitalize">{{ matri.nombres + " " + matri.apellidos  }}</div>
                                                            <div class="text-gray-500">ID: {{ matri.identificacion }}</div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="matri.estudiante_estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ matri.estudiante_estado ? 'Activo':'Inactivo'  }} </span>
                                                </td>

                                                <td v-if="actual_generable.recurso > 10" class="flex py-4 text-sm">
                                                    <button @click="generar_archivo(matri)" class="mx-auto w-24 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                                        <p class="capitalize">{{ actual_generable.nombre }}</p>
                                                    </button>
                                                </td>

                                            </tr>

                                        </tbody>

                                    </table>
                                </div>
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
    import SelectorPeriodo from "@/components/framework/Selector_Periodo.vue"
    import SelectorGenerable from "@/components/framework/Selector_Generable.vue"
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Generable from "@/controllers/Generable"
    import Utilitie from "@/utilities"
  
    export default defineComponent({
    
        'name':'Generables',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado, SelectorPeriodo, SelectorGenerable
        },

        setup(){
        
            //# data
            let seccion = ref(0)
            let errores = ref([])

            //# methods
            
            const generar_boletines = ()=>{
                
                if(actual_periodo.value.periodo < 5){
                   Generable.boletin_todos_file(()=>{ })
                }
                
                if(actual_periodo.value.periodo == 5){
                    Generable.boletin_final_todos_file(()=>{ })
                }

            }

            const generar_informe = ()=>{
                
                if(actual_periodo.value.periodo < 5){
                   // Generable.informe_todos_file(()=>{ })
                   alert("en construcción")
                }

                if(actual_periodo.value.periodo == 5){
                    Generable.informe_final_todos_file(()=>{ })
                }

            }

            const generar_planilla = ()=>{
                Generable.planilla_file(()=>{ })
            }

            const generar_certificado = (matricula)=>{
                if(actual_periodo.value.periodo < 5){
                   // Generable.certificado_periodo_file(matricula,()=>{ })
                   alert("en construcción")
                }

                if(actual_periodo.value.periodo == 5){
                    Generable.certificado_final_file(matricula,()=>{ })
                }
            }

            const generar_archivo = (matricula)=>{

                errores.value = []
                if(!matriculas.value.length){ errores.value.push('No hay matriculas creadas!') }
                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }
                
                if(!errores.value.length){

                    switch (actual_generable.value.recurso) {
                        // rango 1-10
                        case 1: generar_boletines(); break;
                        case 2: generar_informe(); break;
                        case 3: generar_planilla(); break;
                        //rango 11-20
                        case 11: generar_certificado(matricula); break;
                    }

                }else{
                    alert(errores.value[0])
                }
            }

            const generar_estudiante_pdf = (json)=>{

                errores.value = []

                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }
                
                if(!errores.value.length){

                    if(actual_periodo.value.periodo < 5){
                        Generable.boletin_estudiante_file(json,()=>{ })
                    }

                    if(actual_periodo.value.periodo == 5){
                        alert('boletín final')
                    }

                }else{
                    alert(errores.value[0])
                }
            }

            const generar_estudiante_vista = (json)=>{

                errores.value = []

                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }

                if(!errores.value.length){

                    if(actual_periodo.value.periodo < 5){
                        
                        Generable.boletin_estudiante_vista(json,()=>{

                            Router.push({ name: "Boletin" })

                        })

                    }

                    if(actual_periodo.value.periodo == 5){

                        alert('boletín final')

                    }


                }else{
                    alert(errores.value[0])
                }
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
      
            const firstLetter = (name)=>{
                return name.charAt(0).toLowerCase() || 'default'
            }

            const verfificar_matriculas = ()=>{
                
                if(matriculas.value.length && (matriculas.value[0].grado_id != actual_grado.value.grado_id) || !matriculas.value.length){
                                    
                    Matricula.index(()=>{})
            
                }
            }
           
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_periodo = computed(()=> Store.state.actual_periodo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_generable = computed(()=> Store.state.actual_generable )

            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    Matricula.index(()=>{})
                }
                
            })

            return {
                urlsf,
                generar_archivo,
                generar_boletines,
                generar_informe,
                generar_estudiante_pdf,
                generar_estudiante_vista,
                actual_sede,
                actual_lectivo,
                actual_grado,
                actual_periodo,
                actual_generable,
                matriculas,
                seccion,
                filter_estudiante,
                filter_identificacion,
                firstLetter,
                verfificar_matriculas
            }

        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    this.verfificar_matriculas()
                })

            })

        }
  
    })
  
</script>