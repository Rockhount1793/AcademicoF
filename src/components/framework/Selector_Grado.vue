<template>
    <div class="relative w-full">

        <button type="button" @click="mostrar_menu()" aria-haspopup="listbox" aria-expanded="true"  aria-labelledby="listbox-label" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            <div class=" flex items-center justify-between space-x-1 w-full">

                <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                   {{grado_select.nombre?grado_select.nombre:'Grado'}}
                </span>
                <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-pink-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
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
                            <input  id="nombre" placeholder="Buscar Nombre.." type="text" v-model="buscador_nombre" class="h-6 w-full px-2 border-l border-gray-400 focus:outline-none  transition duration-300 ease-in-out text-sm" />
                        </div>
                    </div>
                </li>
            </ul>
            
            <div class="h-48 overflow-auto">
                <ul :key="grd.index" v-for="grd in grados_com" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
                    <li  @click="set_grado(grd);mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        <div class="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                            </svg>
                            <span class="font-semibold text-gray-700 text-sm ">
                                {{grd.nombre}} 
                            </span>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

    </div>
</template>
    
<script lang="js">
    
    import Store from '@/store'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Grado from '@/controllers/Grado'
    import Utilities from '@/utilities'
    import Docente from '@/controllers/Docente'

    export default defineComponent({
        name: 'Selector-Grado',
        setup(props, { emit }){

            //# data
            const grado_id = ref(0)
            const buscador_nombre = ref('')
            let modulo = ref(false)

            const grado_select = ref({'grado_id':0,'nombre':'Grado','numero': '#'})

            //# methods
            const set_grado = (json)=>{
                grado_id.value = json.grado_id
                Store.commit('set_actual_grado',json)
            }
            const mostrar_menu = ()=>{
                
                if(!modulo.value){

                    modulo.value = true 
                    
                    if(!Store.state.grados.length){ 
                        Grado.index() 
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

            const closeMenu = () => {
                modulo.value = false
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

            const grados = computed(()=>{ return Store.state.grados })
            
            const grados_com = computed(()=>{

                let todos = []
                var count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4){
                    todos = Store.state.grados
                }

                let temp_n = todos
                if(count_nombre.length > 4){ temp_n = Utilities.buscador_texto(count_nombre,todos,'nombre') }

                if(temp_n.length >= 1){
                    return temp_n.slice(0,10)
                }else{
                    return Store.state.grados.slice(0,100)
                }

            })

  
            const grado = computed(()=>{
                return Store.state.actual_grado
            })

            const actual_sede = computed(() => Store.state.actual_sede)

            watch(grado_id,(value) => {
                if(value > 0) {
                    emitir(value)
                }
            })

            // watch
            watch(buscador_nombre,(value)=>{
                if(value.toString().length > 4){
                    if(!Store.state.grados.length){ Grado.index() }
                }
            })

            watch(grados_com,(value)=>{

                let count_nombre = buscador_nombre.value.toString()

                if(count_nombre.length > 4 ){
                
                    if(value.length){
                        let _id = value[0].id
                        grado_id.value = _id
                        emitir(_id )
                    }else{
                        grado_id.value = 0
                    }
                
                }else{
                    grado_id.value = 0
                }
            })

            watch(actual_sede, (newValue, oldValue)=> {
                grado_id.value = 0
                modulo.value = false
            })
            watch(grado_id, (newValue, oldValue)=> {
                if(newValue > 0){
                    grado_select.value = Store.state.grados.find((p)=>p.grado_id == grado_id.value)
                }else{
                    grado_select.value = {'grado_id':0,'nombre':'Grado','numero': '#'}
                }
            })

            return{
                grado_id,
                buscador_nombre,
                modulo,
                set_grado,
                mostrar_menu,
                emitir,
                color_chart,
                counter_letras_nombre,
                grado,
                grados,
                grados_com,
                grado_select,
                closeMenu,
            }

        },
        mounted(){
            this.$nextTick(()=>{
                if(Store.state.actual_grado.grado_id > 0){
                   this.grado_id = this.grado.grado_id
                }

            })
        }
    })
</script>