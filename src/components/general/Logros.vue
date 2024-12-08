
<template>  
    <div class="mt-2 h-[90%] pb-2 flex w-auto lg:px-2">
        <div class="rounded border border-gray-300 overflow-hidden h-full w-full">

            <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Logros <span v-if="asignatura.asignatura_id > 0">{{asignatura.nombre}} </span></p>

            <div class="mt-4 flex space-x-2 px-2">
                
                <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-50'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                    Asignaturas
                </p>
                
                <span v-if="seccion == 1" class="hidden lg:inline-flex text-cyan-500 font-semibold"> | </span>
                
                <p v-if="seccion == 1 && logros.length" @click="set_nivel_logro('bajo')" :class="nivel_logro == 'bajo' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                    Bajo
                </p>
                <p v-if="seccion == 1 && logros.length" @click="set_nivel_logro('basico')" :class="nivel_logro == 'basico' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                    Basico
                </p>
                <p v-if="seccion == 1 && logros.length" @click="set_nivel_logro('alto')" :class="nivel_logro == 'alto' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                    Alto
                </p>
                <p v-if="seccion == 1 && logros.length" @click="set_nivel_logro('superior')" :class="nivel_logro == 'superior' ? 'bg-indigo-800':'bg-indigo-400' " class="shadow-indigo-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                    Superior
                </p>

            </div>

            <hr class="mt-3 border border-gray-200" />

            <!-- Asignaturas -->
            <div v-if="seccion == 0" class="h-full mt-1">

                <div class="flex-1 mx-auto mt-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                </div>

                <div class="mt-1 px-4 h-full sm:px-6 lg:px-8">

                    <div v-if="!asignaturas.length" class="sm:flex sm:items-center">
                        <p class="px-2 font-semibold text-gray-500"> No hay asignaturas creadas</p>
                    </div>

                    <div v-else class="mt-3 h-[75%] overflow-y-auto">
                        <div class="px-4 lg:px-6">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="sticky top-0 shadow bg-white">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        <p class="px-5">
                                            Asignatura
                                        </p>
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-gray-200 divide-y bg-white">
                                    <tr v-for="(asig, index) in asignaturas" >
                                        <td class="h-16 px-5 text-sm">
                                            <div class="flex items-center">
                                                <div class="">
                                                    <div class="font-medium text-gray-900 text-xl ">{{ index + 1 }}. {{asig.nombre}}</div>
                                                    <div class="text-gray-600">{{filter_director(asig.docente_id)}}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td @click="get_logros(asig)" title="ver logros" class="text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                            Ver Logros
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Logros -->
            <div v-if="seccion == 1" class="mt-3 flex-1 h-[84%] pb-3 overflow-y-auto space-y-3">
                <div :key="index" v-for="(item, index, key) in logros" class="mx-auto w-full lg:w-3/4 px-2">
                    <div class="w-full rounded rounded-b-none shadow shadow-teal-500 bg-teal-600 text-center h-7 text-gray-50 font-semibold text-lg">
                        {{ comp_periodo(item.periodo)}} Periodo
                    </div>
                    <div class="">
                        <textarea v-model="item[nivel_logro]" class="appearance-none shadow focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-teal-500 focus:shadow-none text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded border-t-0 rounded-t-none w-full" name="" id="edit_apro" rows="3"></textarea>
                    </div>
                    <div class="flow-root">
                        <button @click="update_logro(item)" class="float-right w-64 h-6 px-2 rounded shadow shadow-indigo-500  bg-indigo-800 text-gray-50 font-semibold">
                            Actualizar {{ comp_periodo(item.periodo)}} periodo
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="js">
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Navbar from '@/components/framework/Navbar.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import Store from "@/store"
    import Asignatura from "@/controllers/Asignatura"
    import Logro from "@/controllers/Logro"
  
    export default defineComponent({
        'name':'Logros',
        'components':{ Navbar, Lateral, SelectorDirector, SelectorGrado },
        setup(){
        
            //# data
            let listado = ref(false)
            let asignatura = ref({"asignatura_id": 0,"nombre":""}) 
            let seccion = ref(0)
            let nivel_logro = ref('bajo') //ref('bajo'): Nivel de logro seleccionado por defecto cuando se hace clic en "Ver Logros"
            let errores = ref([])
            
            //# methods
            const update_logro = (_logro)=>{

                errores.value = []

                if(_logro.bajo == null)     _logro.bajo = "";
                if(_logro.basico == null)   _logro.basico = "";
                if(_logro.alto == null)     _logro.alto = "";
                if(_logro.superior == null) _logro.superior = "";

                if(nivel_logro == 'bajo' && (_logro.bajo.length == 0 || _logro.bajo.length > 500)){ errores.value.push('el texto debe tener menos de 500 caracteres') } 
                if(nivel_logro == 'basico' && (_logro.basico.length == 0 || _logro.basico.length > 500)){ errores.value.push('el texto debe tener menos de 500 caracteres') } 
                if(nivel_logro == 'alto' && (_logro.alto.length == 0 || _logro.alto.length > 500)){ errores.value.push('el texto debe tener menos de 500 caracteres') } 
                if(nivel_logro == 'superior' && (_logro.superior.length == 0 || _logro.superior.length > 500)){ errores.value.push('el texto debe tener menos de 500 caracteres') } 

                if(!errores.value.length){
                    Logro.update(_logro)
                }else{
                    alert(errores.value[0])
                }
            }

            const set_nivel_logro = (string)=>{
                nivel_logro.value = string
            }

            const get_logros = async(_asignatura)=>{
                const logrosq = await Logro.index(_asignatura.asignatura_id)
                if(logrosq.status){
                    asignatura.value = _asignatura
                    seccion.value = 1
                }
            }

            const filter_director = (director_id)=>{
                let array = docentes.value
                if(array.length){
                    let res = array.filter((d)=>{ return d.docente_id == director_id })
                    return 'Director: '+res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
            }

            const comp_periodo = ((numero)=>{
                const periodos = {
                    1:'Primer',
                    2:'Segundo',
                    3:'Tercer',
                    4:'Cuarto',
                    5:'Final'
                }
                return periodos[numero]
            })

            //# computed
            const asignaturas = computed(()=> Store.state.asignaturas )
            const logros = computed(()=> Store.state.logros )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const docentes = computed(()=> Store.state.docentes )
            
            //# watch
            watch(actual_grado,(value) => {
                if(value.grado_id > 0) {
                    Asignatura.index()
                }
                Store.commit('set_logros',[])
            })

            return {
                listado,
                asignaturas,
                logros,
                seccion,
                actual_lectivo,
                actual_grado,
                get_logros,
                asignatura,
                //aprobado,
                //set_aprobado,
                nivel_logro,
                set_nivel_logro,
                update_logro,
                filter_director,
                comp_periodo
            }
      
        },
        mounted(){
            this.$nextTick(()=>{
                if(!Store.state.asignaturas.length && this.actual_grado.grado_id > 0){         
                    Asignatura.index()
                }
            })
        }
    })
</script>