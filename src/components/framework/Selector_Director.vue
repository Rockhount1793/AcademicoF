<template>
        
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-2">

        <div class="relative col-span-12 lg:col-span-12 ">

            <button type="button" @click="mostrar_menu()" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-blue-900 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                <div class=" flex items-center justify-between space-x-1 w-full">

                    <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                       {{director_select.nombres}}  {{director_select.apellidos}}
                    </span>

                    <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-pink-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </span>

                </div>

            </button>

            <div v-if="modulo" @mouseleave="()=> modulo = !modulo" class="z-10 w-full absolute border border-indigo-500 shadow-lg mt-0.5 rounded bg-white">

                <ul>
                    <li>
                        <div class="w-full px-2">
                     
                            <label for="nombre" class="block text-sm font-semibold text-gray-500"><span v-html="counter_letras_nombre" class=""></span></label>

                            <div class="flex items-center space-x-1 border shadow-lg h-7 focus:border-indigo-500 rounded border-gray-400">

                                <svg xmlns="http://www.w3.org/2000/svg" class="text-pink-500 ml-0.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                
                                <input id="nombre" placeholder="Buscar Nombre.." type="text" v-model="buscador_nombre" class="h-6 w-full px-2 border-l border-gray-400 focus:outline-none  transition duration-300 ease-in-out text-sm" />
                            
                            </div>
                           
                        </div>
                    </li>
                </ul>
                
                <div class="h-48 overflow-auto">

                    <ul :key="dir.index" v-for="dir in directores_com" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">

                        <li  @click="set_director(dir);mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        
                            <div class="flex items-center space-x-3">

                                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4 text-pink-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                <span class="font-semibold text-gray-700 text-sm ">
                                    {{dir.nombres}} - {{dir.apellidos}}       
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
    import Director from '@/controllers/Director'
    import Utilities from '@/utilities'

    export default defineComponent({

        name: 'Selector-Director',

        components:{  },

        props:{
            //title: String
        },

        setup(props, { emit }){


            //# data
            const director_id = ref(0)
            const buscador_nombre = ref('')
            let modulo = ref(false)

            //# methods
            const set_director = (json)=>{
                director_id.value = json.director_id
                console.log('docente_id: ' + director_id.value)
                let actual_generable_director = { 'docente_id': director_id }
                Store.commit('set_actual_generable_director', actual_generable_director)
            }

            const mostrar_menu = ()=>{
                
                if(!modulo.value){

                    modulo.value = true 
                    
                    if(!Store.state.directores.length){ Director.index() }
                
                    setTimeout(() => {
                        document.getElementById('nombre').focus()
                    },300)
                  
                }else{ 
                    modulo.value = false
                }
  
            }

            const emitir = (number)=>{
               emit('set_director',number)
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

            const directores = computed(()=>{ return Store.state.directores })
            
            const directores_com = computed(()=>{

                let todos = []

                var count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4){
                    todos = Store.state.directores
                }

                let temp_n = todos
                if(count_nombre.length > 4){ temp_n = Utilities.buscador_texto(count_nombre,todos,'nombres') }

                if(temp_n.length >= 1){
                    return temp_n.slice(0,10)
                }else{
                    return Store.state.directores.slice(0,500)
                }

            })

            const director_select = computed(()=>{

                let directores = Store.state.directores

                let temp = {'director_id':0,'nombres':'Rector','apellidos':''}

                if(director_id.value > 0){
                    temp = directores.find((p)=>p.director_id == director_id.value)
                }
            
                return temp

            })

            watch(director_id,(value) => {
      
                if(value > 0) {
                    emitir(value)
                }

            })

            watch(buscador_nombre,(value)=>{
                if(value.toString().length > 4){
                    if(!Store.state.directores.length){ Director.index() }
                }
            })

            watch(directores_com,(value)=>{

                let count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4 ){
                
                    if(value.length){
                    
                        let _id = value[0].id
                        director_id.value = _id
                        emitir(_id )
                    
                    }else{
                    
                        director_id.value = 0

                    }
                
                }else{
                
                    director_id.value = 0

                }
            })

            return{
                director_id,
                buscador_nombre,
                modulo,
                set_director,
                mostrar_menu,
                emitir,
                color_chart,
                counter_letras_nombre,
                directores,
                directores_com,
                director_select
            }

        },


        mounted(){
            this.$nextTick(()=>{
              
            })
        }

    })
    
</script>
    
<style scoped>
    
</style>