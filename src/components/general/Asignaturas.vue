
<template>        
<div class="mt-2 h-[90%] pb-2 flex w-auto lg:px-2">
    <div class="rounded border border-gray-300 h-full w-full">
        <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Asignaturas</p>
        
        <div class="mt-4 flex space-x-2 px-2">
            <p @click="seccion = 0;clearform();" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
            <p @click="seccion = 1;clearform();" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
        </div>

        <hr class="mt-3 border border-gray-200" />
        
        <div v-if="asignatura.asinatura_id == 0" class="flex-1 mx-auto mt-2 w-full lg:w-1/2 px-2 lg:px-1">
            <p class="font-semibold text-gray-500 text-md px-2">Grado</p>
            <SelectorGrado class="mx-auto"></SelectorGrado>
        </div>
        
        <div v-else class="mt-3 mx-auto w-full">
            <p class="font-semibold text-gray-500 text-md text-center">Editar Asignatura</p>
        </div>

        <!-- listado asignaturas -->
        <div v-if="seccion == 0" class="mt-3 px-4 sm:px-6 lg:px-8 h-full">
            <div v-if="!asignaturas.length" class="sm:flex sm:items-center">
                <p class="px-2 font-semibold text-gray-500"> No hay asignaturas creadas</p>
            </div>
            <div v-else class="mt-0 h-[75%] overflow-y-auto">
                <div class="px-4 lg:px-6">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="sticky top-0 bg-white shadow">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                <p class="px-5">
                                    Asignatura
                                </p>
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">IH</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">HCD</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="divide-gray-200 divide-y bg-white">
                            <tr v-for="(asig, index) in asignaturas">
                                <td class="text-sm h-16 px-5">
                                    <div class="flex-1 items-center">
                                        <div class="font-medium text-gray-900 text-xl ">{{ index+1 }}. {{asig.nombre}}</div>
                                        <div class="text-gray-600">{{filter_director(asig.docente_id)}}</div>
                                    </div>
                                </td>
                                <td class="px-3 text-sm text-gray-500">
                                    <div class="text-gray-900">{{asig.ih}}</div>
                                </td>
                                <td class="px-3 text-sm text-gray-500">
                                    <div class="text-gray-900">{{asig.hcd}}</div>
                                </td>
                                <td @click="editar(asig)" class="px-3 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                    Editar
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        
        </div>

        <!-- crear asignaturas -->
        <div v-if="seccion == 1" class="mt-0 flex-1 rounded px-2">
            <div class="mt-3 p-2 flex-1 lg:grid grid-cols-2 lg:gap-2">
            
                <div>
                    <label for="nombre_asig" class="block text-sm font-medium leading-6 text-gray-900">Asignatura</label>
                    <div class="relative mt-2 ">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6  text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                            </svg>
                        </div>
                        <input v-model="asignatura.nombre" id="nombre_asig" type="text" name="nombre_asig" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Español" />
                    </div>
                </div>
                
                <div>
                    <label for="ih" class="block text-sm font-medium leading-6 text-gray-900">IH</label>
                    <div class="relative mt-2 ">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                            </svg>
                        </div>
                        <input v-model="asignatura.ih" id="ih" type="number" min="0" max="999" name="ih" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="IH" />
                    </div>
                </div>
                <div class="flex-1 py-2 w-full lg:w-3/4">
                    <p class="font-semibold text-gray-500 text-md px-2" for="director">Director</p>
                    <SelectorDirector @set_director="set_director" class="mx-auto"></SelectorDirector>
                </div>
                <div>
                    <label for="hcd" class="block text-sm font-medium leading-6 text-gray-900">HCD</label>
                    <div class="relative mt-2 ">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                            </svg>
                        </div>
                        <input v-model="asignatura.hcd" id="ih" type="number" min="0" max="999" name="hcd" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="HCD" />
                    </div>
                </div>
                    
            </div>
            <div class="mt-3 p-2 flex-1 lg:grid lg:grid-cols-2 lg:gap-2">
                <button @click="clearform(); seccion = 0" class="w-full lg:w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                    Cancelar
                </button>
                <div class="w-full lg:w-3/4">
                    <button @click="guardar_actualizar()" class="lg:float-right w-full lg:w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                        {{ asignatura.asignatura_id > 0 ? 'Actualizar' : 'Guardar'}}
                    </button>
                </div>

            </div>   
        </div>
    </div>
</div>
</template>
  
<script>
  
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Navbar from '@/components/framework/Navbar.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import Store from '@/store'
    import Asignatura from '@/controllers/Asignatura'
    import Docente from '@/controllers/Docente'
    import Utilities from '@/utilities'

    export default defineComponent({
        'name':'Asignaturas',
        'components':{
            Navbar, Lateral, SelectorDirector, SelectorGrado
        },
        setup(){
        
            //# data 
            const seccion = ref(0)
            const errores = ref([])

            // Asignatura
            const asignatura = ref({
                asignatura_id: 0,
                nombre : "",
                ih : 0,
                hcd : 0,
                docente_id : 0,
                asinatura_id: 0,
                sede_id:  0,
                lectivo_id: 0,
                grado_id: 0,
                estado:1
            })

            //# methods
            const clearform = ()=>{
                asignatura.value = {
                    asignatura_id: 0,
                    nombre : "",
                    ih : 0,
                    hcd : 0,
                    docente_id : 0,
                    asinatura_id: 0,
                    sede_id:  0,
                    lectivo_id: 0,
                    grado_id: 0,
                    estado:1
                }   
            }
            const set_director = (number)=>{ 
                asignatura.value.docente_id = number
            }

            const editar = (json)=>{
                asignatura.value = json
                seccion.value = 1
            }

            const guardar_actualizar = ()=>{

                errores.value = []

                if(asignatura.value.nombre.length <= 0 || asignatura.value.nombre.length > 100){ errores.value.push('ingrese nombre') }
                if(typeof asignatura.value.ih != 'number' || asignatura.value.ih < 1 || asignatura.value.ih > 999 ){ errores.value.push('ingrese ih') }
                if(typeof asignatura.value.hcd != 'number' || asignatura.value.hcd < 1 || asignatura.value.hcd > 999 ){ errores.value.push('ingrese hcd') }
                if(typeof asignatura.value.docente_id != 'number' || asignatura.value.docente_id < 1){ errores.value.push('seleccione director de grado') }
                
                if(actual_sede.value.sede_id == 0){ errores.value.push('seleccione sede') }
                if(actual_lectivo.value.lectivo_id == 0){ errores.value.push('seleccione lectivo') }
                if(actual_grado.value.grado_id == 0){ errores.value.push('seleccione grado') }
                
                if(errores.value.length){
                    alert(errores.value[0])
                }else{
                    
                    if(asignatura.value.asignatura_id > 0){
                        Asignatura.update(asignatura.value)
                    }else{

                        asignatura.value.sede_id =  actual_sede.value.sede_id,
                        asignatura.value.lectivo_id = actual_lectivo.value.lectivo_id,
                        asignatura.value.grado_id = actual_grado.value.grado_id,
                        
                        Asignatura.store(asignatura.value)

                    }
                    Utilities.show_save('Asignatura creada')

                    clearform()
                    seccion.value = 0

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

            //# computed
            const asignaturas = computed(()=> Store.state.asignaturas.reverse() )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const docentes = computed(()=> Store.state.docentes )
    
            watch(actual_grado,async(value) => {

                if(value.grado_id > 0) {
                    const asignaturasq = await Asignatura.index()
                    if (asignaturasq.status && !Store.state.docentes.length) {
                        Docente.index()
                    }
                }
                
            })

            return {
                seccion,
                editar,
                asignatura,
                asignaturas,
                actual_lectivo,
                actual_grado,
                guardar_actualizar,
                set_director,
                filter_director,
                docentes,
                clearform
            }
      
        },
        mounted(){
            this.$nextTick(async()=>{
                if(this.actual_grado.grado_id > 0){
                    const asignatuasq = await Asignatura.index()
                    if (asignatuasq.status && !Store.state.docentes.length) {
                        Docente.index()
                    }
                }
            })
        }
  
    })
  
</script>