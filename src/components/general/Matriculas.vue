
<template>
    <Ventana :elemento="matricula_eliminar" @control_acceso="delete_" v-if="ventana_confirmacion">
        <template v-slot:dialog>
            <div class="px-2 font-semibold">
                <h5 class="pb-1 text-center text-pink-500">Detalle de matricula a eliminar</h5>
                <h5>{{ matricula_eliminar.nombres }} {{ matricula_eliminar.apellidos }}</h5>
                <h5><span class="text-gray-400">ID:</span> {{ matricula_eliminar.identificacion }}</h5>
                <h5><span class="text-gray-400">Grado:</span> {{ actual_grado.nombre }}</h5>
                <h5><span class="text-gray-400">Lectivo:</span> {{ actual_lectivo.numero }}</h5>
                <h5><span class="text-gray-400">Sede:</span> {{ actual_sede.nombre }}</h5>
            </div>
        </template>
    </Ventana>
    <div class="mt-2 h-[90%] pb-2 flex w-auto lg:px-2">
        <div class="rounded border border-gray-300 h-full w-full overflow-hidden">

            <p class="text-gray-500 mt-3 text-center font-semibold text-lg">
                Matriculas
                <span v-if="actual_grado.grado_id > 0">
                    <span class="text-indigo-600">{{actual_grado.nombre}}</span>
                </span>
            </p>

            <div class="mt-4 flex space-x-2 px-2">
                <p @click="set_seccion(0)" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                <p @click="set_seccion(1)" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
            </div>

            <hr class="mt-3 border border-gray-200" />

            <div class="flex-1 mt-2 mx-auto py-2 w-full px-2 lg:px-1">
                <div class="mx-auto w-full  lg:w-1/2">
                    <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                    
                </div>
            </div>

            <!-- Matriculas -->
            <div v-if="seccion == 0" class="mt-3 px-4 sm:px-6 lg:px-8 h-full">
                
                <div v-if="!matriculas.length" class="sm:flex sm:items-center">
                    <p class="px-2 font-semibold text-gray-500"> No hay matriculas creadas</p>    
                </div>
                
                <div v-else class="mt-0 h-[70%] overflow-y-auto">
                    <div class="px-4 lg:px-6">
                        <table class="min-w-full divide-y divide-gray-300 mb-4">
                            <thead class="sticky top-0 shadow bg-white">
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        <p class="px-5">
                                            Nombres
                                        </p>
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tipo</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="(matri, index) in matriculas" :key="index+10">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                        <div class="flex items-center">
                                            <div class="h-10 w-10 flex-shrink-0">
                                                <img class="h-10 w-10 rounded-full ml-2" :src="'../public/images/avatar/'+Utilities.firstLetter(matri.nombres)+'.png'" alt="estudiante.nombres" />
                                            </div>
                                            <div class="ml-6">
                                                <div class="font-medium text-base text-gray-900 capitalize">{{ matri.nombres + " " + matri.apellidos  }}</div>
                                                <div class="text-gray-500">ID: {{ matri.identificacion }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                        <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="tipos.find(({tipo})=>tipo === matri.tipo).color">
                                            {{tipos.find(({tipo})=>tipo === matri.tipo).nombre}}
                                        </span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                        <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="matri.estudiante_estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">
                                            {{ matri.estudiante_estado ? 'Activo':'Inactivo'  }}
                                        </span>
                                    </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                        <div class="w-full h-9 truncate">
                                            <button title="eliminar matricula" @click="abrir_ventana_conf(matri)" class="mt-0.5 h-7 px-2 rounded shadow shadow-pink-500 bg-pink-400  hover:bg-pink-600 font-semibold">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-7 h-7">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>                                          
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!-- Crear -->
            <div v-if="seccion == 1" class="h-full overflow-y-auto">
                
                <div class="flex-1 mt-2 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-500 text-md px-2">Estudiante</p>
                    <SelectorEstudiante class="mx-auto"></SelectorEstudiante>
                </div>

                <div class="flex-1 mt-2 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-500 text-md px-2">Tipo</p>
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                        <select id="genero_detalle" v-model="tipo_numero" class="w-full rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option v-for="(item, index) in tipos" :key="index" :value="item.tipo">{{item.nombre}}</option>
                        </select>
                    </div>
                </div>

                <div class="mt-3 h-full px-2 lg:w-1/2 mx-auto">    
            
                    <p class="font-semibold text-gray-500 text-lg text-center">Detalle registro</p>
                    <hr class="mb-3 border border-gray-500" />

                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Identificación:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{filter_identificacion(estudiante.identificacion)}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Nombres:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.nombres}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Apellidos:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{estudiante.apellidos}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Sede:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_sede.nombre}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Lectivo:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_lectivo.numero}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Grado:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{actual_grado.nombre}}</p>
                    </div>
                    <div class="flex-1 lg:flex py-1">
                        <p class="font-semibold text-gray-500 text-md px-2">Tipo:</p>
                        <p class="font-semibold text-pink-500 text-md px-2">{{tipos.find(({tipo})=>tipo === tipo_numero).nombre}}</p>
                    </div>
                    
                    <hr class="mt-3 border border-gray-500" />

                    <div class="flow-root flex-1 pb-2">
                        <div class="float-right">
                            <button @click="guardar()" class="w-64 mt-3 h-7 shadow shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                                Matricular
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>
  
<script>

    import Ventana from "@/components/framework/Ventana_Emergente.vue"
    import Barra from "@/components/framework/Barra.vue"
    import Lateral from "@/components/framework/Lateral.vue"
    import SelectorDirector from "@/components/framework/Selector_Docente.vue"
    import SelectorGrado from "@/components/framework/Selector_Grado.vue"
    import SelectorEstudiante from "@/components/framework/Selector_Estudiante.vue"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from "@/store"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Estudiante from "@/controllers/Estudiante"
    import Utilities from "@/Utilities"
  
    export default defineComponent({
        'name':'Matriculas',
        'components':{
            Ventana, Barra, Lateral, SelectorDirector, SelectorGrado, SelectorEstudiante
        },
        setup(props, {emit}){
        
            //# data 
            const seccion = ref(0)
            const errores = ref([])
            const ventana_confirmacion = ref(false)
            const identificacion_ = ref('')
            const estudiante = ref({'estudiante_id': 0, 'nombres': '', 'apellidos': '', 'identificacion': '0'})
            const tipo_numero = ref(0)
            const tipos = ref([
                {"tipo": 0, "nombre":"Inicial", "color":"text-teal-500"},
                {"tipo": 1, "nombre":"Extraordinario", "color":"text-yellow-500"},
                {"tipo": 2, "nombre":"Traslado", "color":"text-blue-500"},
                {"tipo": 3, "nombre":"Desertor", "color":"text-red-500"}
            ])

            const matricula_eliminar = ref({})
            
            //# methods 

            const set_seccion = (num)=>{
                seccion.value = num
                if(num == 1)Store.commit("set_actual_estudiante",{"estudiante_id":0,"nombres":"","identificacion":0})
            }

            const abrir_ventana_conf = (json)=>{
                matricula_eliminar.value = json
                ventana_confirmacion.value = true
            }

            const delete_ = (res)=>{
                const { status, password } = res
                if(status){
                    matricula_eliminar.value.password = password
                    Matricula.delete(matricula_eliminar.value)
                    matricula_eliminar.value = {}
                }
                ventana_confirmacion.value = false
            }

            const guardar = ()=>{

                errores.value = []

                if( Number(estudiante.value.identificacion) <= 0 ){ errores.value.push('identificación estudiante') }
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.value.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.value.push('seleccione grado') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Matricula.store({
                        'estudiante_id': estudiante.value.estudiante_id,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'grado_id': actual_grado.value.grado_id,
                        'tipo': tipo_numero.value,
                        'estado': 1
                    },()=>{
                        identificacion_.value = 0
                        seccion.value = 0
                        estudiante.value = {"estudiante_id":0,"nombres":"","apellidos":"","identificacion":"0"}
                    })
                    Utilities.show_save('Matricula creada')
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
                return Utilities.format_tnumber(number)
            }
      
            const verfificar_matriculas = ()=>{
                if(matriculas.value.length && (matriculas.value[0].grado_id != actual_grado.value.grado_id) || !matriculas.value.length){
                    Matricula.index(()=>{})
                }
            }

            //# computed
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_estudiante = computed(()=> Store.state.actual_estudiante )
           
            watch(actual_estudiante,(value) => {
                estudiante.value = value
            })

            watch(actual_grado,(value) => {
                if(value.grado_id > 0 ) {
                    Matricula.index(()=>{})
                }
            })

            return {
                Utilities,
                ventana_confirmacion,
                delete_,
                identificacion_,
                tipos,
                tipo_numero,
                actual_sede,
                actual_lectivo,
                actual_grado,
                estudiante,
                matriculas,
                seccion,
                guardar,
                filter_estudiante,
                filter_identificacion,
                abrir_ventana_conf,
                matricula_eliminar,
                set_seccion,
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