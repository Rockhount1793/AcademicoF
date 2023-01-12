
<template>

    <div class="">
        
        <Barra></Barra>
        
        <div class="mt-2 h-4/6 min-h-full flex w-auto px-2 md:space-x-2">
            
            <Lateral></Lateral>

            <div class="ml-2 p-1 rounded border border-gray-600 h-auto w-full">

                <p class="text-gray-100 text-center font-semibold text-lg">Asignaturas</p>

                <div class="mt-3 flex space-x-2 px-2">
                    <p @click="seccion = 0" :class="seccion == 0 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1" :class="seccion == 1 ? 'bg-pink-800':'bg-pink-400' " class="shadow-pink-500 shadow-md w-32 cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Crear</p>
                </div>

                <hr class="mt-3 border border-gray-500" />

                <div class="flex-1 mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="font-semibold text-gray-100 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto"></SelectorGrado>
                </div>

                <div v-if="seccion == 0" class="mt-3 overflow-y-auto h-5/6 ">
                    <ul>

                        <li v-if="!asignaturas.length">
                            <p class="px-2 font-semibold text-gray-100 mt-3"> No hay asignaturas creadas</p>
                        </li>
                    
                        <li :key="index" v-for="(item, index, key) in asignaturas ">
            
                            <div class="lg:space-x-2 px-2 mb-2 flex-1 lg:flex lg:items-center mt-3">
                                
                                <div>
                                    
                                    <div class="w-64 rounded bg-cyan-900 text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                        {{ index+1 }}. {{item.nombre}}
                                    </div>
                                    
                                </div>
                                
                                <div class="w-full lg:w-1/2 truncate">
                                    <p class="mt-2 lg:mt-0.5 px-2 p-0.5 rounded bg-gray-900 capitalize text-gray-100 font-semibold"> Director: {{filter_director(item.docente_id)}}</p>
                                </div>

                            </div>
                        
                        </li>

                    </ul>
                </div>

                <div v-if="seccion == 1" class="mt-0 flex-1 rounded px-2">

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="nombre">Nombre</p>
                        <input v-model="nombre" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="text" placeholder=" Asignatura"/>
                    </div>
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="numero_ih">IH</p>
                        <input v-model="numero_ih" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="999" step="1" placeholder=" 0"/>
                    </div>

                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="numero_hcd">HCD</p>
                        <input v-model="numero_hcd" class="appearance-none shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-blue-900 p-1 text-center font-semibold text-md placeholder:text-md placeholder:text-center rounded w-full" id="numero"  type="number" min="0" max="999" step="1" placeholder=" 0"/>
                    </div>
                    
                    <div class="flex-1 mx-auto py-2 w-full lg:w-1/2">
                        <p class="font-semibold text-gray-100 text-md px-2" for="director">Director</p>
                        <SelectorDirector @set_director="set_director" class="mx-auto"></SelectorDirector>
                    </div>

                    <div class="mx-auto w-1/2">
                        <button @click="guardar()" class="mx-auto mt-3 h-7 shadow-md w-full lg:w-32 shadow-pink-500 rounded float-right bg-pink-800 text-gray-100 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>
  
        </div>

    </div>
  
</template>
  
<script lang="js">
  
    import Barra from '@/components/framework/Barra.vue'
    import Lateral from '@/components/framework/Lateral.vue'
    import SelectorDirector from '@/components/framework/Selector_Docente.vue'
    import SelectorGrado from '@/components/framework/Selector_Grado.vue'
    import { RouterView } from 'vue-router'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Router from '@/router'
    import Aplicacion from '@/controllers/Aplicacion'
    import Asignatura from '@/controllers/Asignatura'
    import Grado from '@/controllers/Grado'
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

                let array = directores.value

                if(array.length){
                    let res = array.filter((d)=>{ return d.docente_id == director_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
                
            }
      
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const asignaturas = computed(()=> Store.state.asignaturas.reverse() )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const directores = computed(()=> Store.state.docentes )

            watch(actual_grado,(value) => {

                if(value.grado_id > 0) {
                    Asignatura.index(()=>{})
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
                filter_director
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