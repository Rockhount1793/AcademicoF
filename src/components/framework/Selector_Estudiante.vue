<template>
        
    <div class="z-1 grid grid-cols-6 lg:grid-cols-12 gap-2">

        <div class="relative col-span-12 lg:col-span-12 ">

            <button type="button" @click="mostrar_menu()" aria-haspopup="listbox" aria-expanded="true"  aria-labelledby="listbox-label" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                <div class=" flex items-center justify-between space-x-1 w-full">

                    <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                       {{estudiante_select.nombres}} {{estudiante_select.apellidos}}
                    </span>

                    <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-pink-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </span>

                </div>

            </button>

            <div v-if="modulo" class="z-10 w-full absolute border border-indigo-500 shadow-lg mt-0.5 rounded bg-white">

                <ul>
                    <li>
                        <div class="w-full px-2">
                     
                            <label for="nombre_estudiante_buscar" class="block text-sm font-semibold text-gray-500"><span v-html="counter_letras_nombre" class=""></span></label>

                            <div class="flex items-center space-x-1 border shadow-lg h-7 focus:border-indigo-500 rounded border-gray-400">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-pink-500 ml-0.5 h-5 w-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                
                                <input id="nombre_estudiante_buscar" placeholder="Buscar Nombre.." type="text" v-model="buscador_nombre" class="h-6 w-full px-2 border-l border-gray-400 focus:outline-none  transition duration-300 ease-in-out text-sm" />
                            
                            </div>
                           
                        </div>
                    </li>
                </ul>
                
                <div class="h-48 overflow-auto">

                    <ul :key="index+10" v-for="(est, index) in estudiantes_com" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">

                        <li  @click="set_estudiante(est);mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        
                            <div class="flex items-center space-x-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-pink-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                                <span class="truncate font-semibold text-gray-700 text-sm ">
                                    {{est.nombres}} {{est.apellidos}} : {{est.identificacion}}
                                </span>

                            </div>

                        </li>

                    </ul>

                </div>

            </div>

        </div>
    
    </div>
    
</template>
    
<script lang="js">
    
    import Store from '@/store'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Anexo_Estudiante from '@/controllers/Anexo_Estudiante'

    import Utilities from '@/utilities'

    export default defineComponent({

        name: 'Selector-Estudiante',

        components:{  },

        props:{
            //title: String
        },

        setup(props, { emit }){

            //# data
            const estudiante_id = ref(0)
            const buscador_nombre = ref('')
            let modulo = ref(false)

            //# methods
            const set_estudiante = (json)=>{

                estudiante_id.value = json.estudiante_id
               Store.commit('set_actual_estudiante',json)

            }

            const mostrar_menu = ()=>{
                
                if(!modulo.value){

                    modulo.value = true 
                    
                    if(!Store.state.estudiantes.length){ 
                        Anexo_Estudiante.index()
                    }
                
                    setTimeout(() => {
                        document.getElementById('nombre_estudiante_buscar').focus()
                    },300)

                }else{ 
                    modulo.value = false
                }
  
            }

            const emitir = (json)=>{
              // emit('set_estudiante',json)
            }
            
            const color_chart = (number, contador_charts)=>{

                if(number <= contador_charts){
                    return 'text-pink-500'
                }
                else{
                    return 'text-gray-500'  
                }

            }

            const closeMenu = () => {
                modulo.value = false;
            }

            //# computed
            
            const counter_letras_nombre = computed(()=>{

                let contador = buscador_nombre.value.toString().length

                var temp = `
                    <span class="${color_chart(1,contador)}">&#8226;<span>
                    <span class="${color_chart(2,contador)}">&#8226;<span>
                    <span class="${color_chart(3,contador)}">&#8226;<span>
                    <span class="${color_chart(4,contador)}">&#8226;<span>
                    <span class="${color_chart(5,contador)}">&#8226;<span>
                `

                return temp;

            })

            const estudiantes = computed(()=>{ return Store.state.estudiantes })
            
            const estudiantes_com = computed(()=>{

                let todos = []

                var count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4){
                    todos = Store.state.estudiantes
                }

                let temp_n = todos
                if(count_nombre.length > 4){ temp_n = Utilities.buscador_texto(count_nombre,todos,'nombres') }

                if(temp_n.length >= 1){
                    return temp_n.slice(0,10)
                }else{
                    return Store.state.estudiantes.slice(0,10)
                }

            })

            const estudiante_select = computed(()=>{

                let estudiantes = Store.state.estudiantes

                let temp = {'estudiante_id':0,'nombres':'Estudiante','identificacion': 0}

                if(estudiante_id.value > 0){
                    temp = estudiantes.find((p)=>p.estudiante_id == estudiante_id.value)
                }
            
                return temp

            })

            const estudiante = computed(()=>{
                return Store.state.actual_estudiante
            })

            watch(estudiante_id,(value) => {
      
                if(value > 0) {
                    emitir(value)
                }

            })

            watch(estudiantes_com,(value)=>{

                let count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4 ){
                
                    if(value.length){
                    
                        let _id = value[0].id
                        estudiante_id.value = _id
                        emitir(_id )
                    
                    }else{
                    
                        estudiante_id.value = 0

                    }
                
                }else{
                
                    estudiante_id.value = 0

                }
            })

            return{
                estudiante_id,
                buscador_nombre,
                modulo,
                set_estudiante,
                mostrar_menu,
                emitir,
                color_chart,
                counter_letras_nombre,
                estudiante,
                estudiantes,
                estudiantes_com,
                estudiante_select,
                closeMenu,
            }

        },


        mounted(){
            this.$nextTick(()=>{
                if(Store.state.actual_estudiante.estudiante_id > 0){
                   this.estudiante_id = this.estudiante.estudiante_id
                }

            })
        }

    })
    
</script>
    
<style scoped>
    
</style>