<template>
        
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-2">

        <div class="relative col-span-12 lg:col-span-12 ">

            <button type="button" @click="mostrar_menu()" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-blue-900 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                <div class=" flex items-center justify-between space-x-1 w-full">

                    <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                       {{asignatura_select.nombre}} : {{asignatura_select.ih}} : {{asignatura_select.hcd}}
                    </span>

                    <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                        
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-pink-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                          
                    </span>

                </div>

            </button>

            <div v-if="modulo" class="z-10 w-full absolute border border-indigo-500 shadow-lg mt-0.5 rounded bg-white">

                <ul>
                    <li>
                        <div class="w-full px-2">
                     
                            <label for="nombre" class="block text-sm font-semibold text-gray-500"><span v-html="counter_letras_nombre" class=""></span></label>

                            <div class="flex items-center space-x-1 border shadow-lg h-7 focus:border-indigo-500 rounded border-gray-400">

                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-pink-500 ml-0.5 h-5 w-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                
                                <input id="nombre" placeholder="Buscar Nombre.." type="text" v-model="buscador_nombre" class="h-6 w-full px-2 border-l border-gray-400 focus:outline-none  transition duration-300 ease-in-out text-sm" />
                            
                            </div>
                           
                        </div>
                    </li>
                </ul>
                
                <div class="h-48 overflow-auto">

                    <ul :key="asg.index" v-for="asg in asignaturas_com" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">

                        <li  @click="set_asignatura(asg); mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        
                            <div class="flex items-center space-x-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                </svg>
                                
                                <span class="font-semibold text-gray-700 text-sm ">
                                    {{asg.nombre}}        
                                </span>

                            </div>

                        </li>

                    </ul>

                </div>

            </div>

        </div>
    
    </div>
    
</template>
    
<script>
    
    import Store from "@/store"
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Asignatura from "@/controllers/Asignaturas"
    import Utilities from "@/utilities"
    import Docente from "@/controllers/Docente"

    export default defineComponent({

        name: 'Selector-Asignatura',

        components:{  },

        props:{
            //title: String
        },

        setup(props, { emit }){

            //# data
            const asignatura_id = ref(0)
            const buscador_nombre = ref('')
            let modulo = ref(false)

            //# methods
            const set_asignatura = (json)=>{

                asignatura_id.value = json.asignatura_id
                Store.commit('set_actual_asignatura',json)

            }

            const mostrar_menu = ()=>{
                
                if(!modulo.value){

                    modulo.value = true 
                    
                    if(!Store.state.asignaturas.length){ 
                        Asignatura.index(()=>{
                            if(!Store.state.docentes.length){ Docente.index(()=>{}) }
                        }) 
                    }
                
                    setTimeout(() => {
                        document.getElementById('nombre').focus()
                    },300)
                  
                }else{ 
                    modulo.value = false
                }
  
            }

            const emitir = (number)=>{
              // emit('set_grado',number)
            }
            
            const color_chart = (number, contador_charts)=>{

                if(number <= contador_charts){
                    return 'text-pink-500'
                }
                else{
                    return 'text-gray-500'
                }

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
                    
                return temp

            })

            const asignaturas = computed(()=>{ return Store.state.asignaturas })
            
            const asignaturas_com = computed(()=>{

                let todos = []

                var count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4){
                    todos = Store.state.asignaturas
                }

                let temp_n = todos
                if(count_nombre.length > 4){ temp_n = Utilities.buscador_texto(count_nombre,todos,'nombre') }

                if(temp_n.length >= 1){
                    return temp_n.slice(0,10)
                }else{
                    return Store.state.asignaturas.slice(0,100)
                }

            })

            const asignatura_select = computed(()=>{

                let _asignaturas = Store.state.asignaturas

                let temp = {'grado_id':0,'nombre':'Grado','numero': '#'}

                if(grado_id.value > 0){
                    temp = _asignaturas.find((p)=>p.grado_id == grado_id.value)
                }
            
                return temp

            })

            const asignatura = computed(()=>{
                return Store.state.actual_asignatura
            })

            watch(asignatura_id,(value) => {
      
                if(value > 0) {
                    emitir(value)
                }

            })

            watch(buscador_nombre,(value)=>{
                if(value.toString().length > 4){
                    if(!Store.state.asignaturas.length){ Asignatura.index() }
                }
            })

            watch(asignaturas_com,(value)=>{

                let count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4 ){
                
                    if(value.length){
                    
                        let _id = value[0].id
                        asignatura_id.value = _id
                        emitir(_id )
                    
                    }else{
                    
                        asignatura_id.value = 0

                    }
                
                }else{
                
                    asignatura_id.value = 0

                }
            })

            return{
                asignatura_id,
                buscador_nombre,
                modulo,
                set_asignatura,
                mostrar_menu,
                emitir,
                color_chart,
                counter_letras_nombre,
                asignatura,
                asignaturas,
                asignaturas_com,
                asignatura_select
            }

        },


        mounted(){
            this.$nextTick(()=>{
                if(Store.state.actual_asignatura.asignatura_id > 0){
                   this.asignatura_id = this.asignatura.asignatura_id
                }

            })
        }

    })
    
</script>
    
<style scoped>
    
</style>