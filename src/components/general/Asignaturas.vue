
<template>

    <div class="">
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">

            <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">

                <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Asignaturas</p>

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                </div>

                <hr class="mt-3 border border-gray-200" />

                <div v-if="seccion == 0" class="mt-3">

                    <div class="px-4 sm:px-6 lg:px-8">
                
                        <div v-if="!asignaturas.length" class="sm:flex sm:items-center">
                            <p class="px-2 font-semibold text-gray-500"> No hay asignaturas creadas</p>
                        </div>
                
                        <div v-else class="mt-8 flow-root">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table class="min-w-full divide-y divide-gray-300 mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Asignatura</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">IH</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">HCD</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        
                                        <tr v-for="(asig, index) in asignaturas" >
                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <!--<div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(asig.nombre) + '.png'" alt="asignatura.nombres" />
                                                    </div>-->
                                                    <div class="ml-6">
                                                        <div class="font-medium text-gray-900 text-xl ">{{ index+1 }}. {{asig.nombre}}</div>
                                                        <div class="text-gray-600">{{filter_director(asig.docente_id)}}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="asig.estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ asig.estado ? 'Activo':'Inactivo'  }} </span>
                                            </td>
                                            
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{asig.ih}}</div>
                                            </td>
                
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{asig.hcd}}</div>
                
                                            </td>
                                            
                                            <td @click="editar(asig)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Editar</td>
                
                                        </tr>
                
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>
                
                    </div>
                </div>

                <div v-if="seccion == 1" class="mt-0 flex-1 rounded px-2">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="nombre">Nombre</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="text" placeholder=" Asignatura"/>
                    </div>
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="numero_ih">IH</p>
                        <input v-model="numero_ih" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="999" step="1" placeholder=" 0"/>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="numero_hcd">HCD</p>
                        <input v-model="numero_hcd" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="999" step="1" placeholder=" 0"/>
                    </div>
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-500 text-md px-2" for="director">Director</p>
                        <SelectorDirector @set_director="set_director" class="mx-auto"></SelectorDirector>
                    </div>

                    <div class="mx-auto w-1/2">
                        <button @click="guardar()" class="mx-auto mt-3 h-7 shadow-md w-full lg:w-32 shadow-pink-500 rounded float-right bg-pink-800 text-gray-500 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script>
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import Store from '@/store'
    import Aplicacion from '@/controllers/Aplicacion'
    import Asignatura from '@/controllers/Asignatura'
    import Docente from '@/controllers/Docente'
  
    export default defineComponent({
    
        'name':'Asignaturas',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado
        },

        setup(){
        
            //# data 
            let listado = ref(false)
            let seccion = ref(0)

            let nombre = ref('')
            let numero_ih = ref(1)
            let numero_hcd = ref(1)
            let director_id = ref(0)
            let errores = ref([])

            //# methods
            const set_director = (number)=>{ 
                director_id.value = number
            }

            const guardar = ()=>{

                errores.value = []

                if(nombre.value.length <= 0 || nombre.value.length > 100){ errores.value.push('ingrese nombre') }
                if(typeof numero_ih.value != 'number' || numero_ih.value < 1 || numero_ih.value > 999 ){ errores.value.push('ingrese ih') }
                if(typeof numero_hcd.value != 'number' || numero_hcd.value < 1 || numero_hcd.value > 999 ){ errores.value.push('ingrese hcd') }
                if(typeof director_id.value != 'number' || director_id.value < 1){ errores.value.push('seleccione director') }
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.value.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.value.push('seleccione grado') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    Asignatura.store({
                        'nombre': nombre.value,
                        'ih': numero_ih.value,
                        'hcd': numero_hcd.value,
                        'docente_id': director_id.value,
                        'sede_id':  actual_sede.value.sede_id,
                        'lectivo_id': actual_lectivo.value.lectivo_id,
                        'grado_id': actual_grado.value.grado_id,
                        'estado':1
                    },()=>{
                        seccion.value = 0
                        nombre.value = ''
                        numero_ih.value = 1
                        numero_hcd.value = 1
                    })

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

            const firstLetter = (name) => {
                return name.charAt(0).toLowerCase() || 'default';
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const asignaturas = computed(()=> Store.state.asignaturas.reverse() )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const docentes = computed(()=> Store.state.docentes )
    
            watch(actual_grado,(value) => {

                if(value.grado_id > 0) {
                    Asignatura.index(()=>{
                        if (!Store.state.docentes.length) {
                            Docente.index(() => {})
                        }
                    })
                }
                
            })

            return {
                urlsf,
                listado,
                asignaturas,
                seccion,
                nombre,
                numero_ih,
                numero_hcd,
                director_id,
                actual_lectivo,
                actual_grado,
                guardar,
                set_director,
                filter_director,
                firstLetter,
                docentes
            }
      
        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{

                    if(this.actual_grado.grado_id > 0){
                                    
                        Asignatura.index(()=>{

                        })

                    }
                    

                })

            })

        }
  
    })
  
</script>