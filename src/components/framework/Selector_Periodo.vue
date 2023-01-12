<template>
        
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-2">

        <div class="relative col-span-12 lg:col-span-12 ">

            <button type="button" @click="mostrar_menu()" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-blue-900 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                <div class=" flex items-center justify-between space-x-1 w-full">

                    <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                        {{periodo_select.periodo}} : {{periodo_select.nombre}} 
                    </span>

                    <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-pink-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                    </span>

                </div>

            </button>

            <div v-if="modulo" class="z-10 w-full absolute border border-indigo-500 shadow-lg mt-0.5 rounded bg-white">
                
                <div class="h-48 overflow-auto">

                    <ul :key="per.index" v-for="per in periodos" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">

                        <li  @click="set_periodo(per);mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        
                            <div class="flex items-center space-x-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-600">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                
                                <span class="font-semibold text-gray-700 text-sm ">
                                    {{per.periodo}}: {{per.nombre}}       
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
    
    import Store from '@/store'
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Utilities from '@/utilities'

    export default defineComponent({

        name: 'Selector-Periodo',

        components:{  },

        props:{
            //title: String
        },

        setup(props, { emit }){

            //# data
            const periodo = ref(0)
            let modulo = ref(false)

            //# methods
            const set_periodo = (json)=>{

                periodo.value = json.periodo
                Store.commit('set_actual_periodo',json)

            }

            const mostrar_menu = ()=>{
                
                modulo.value = !modulo.value
  
            }

            const emitir = (number)=>{
              // emit('set_periodo',number)
            }
            

            //# computed
            
            const periodos = computed(()=>{ return Store.state.periodos })
            
            const periodo_select = computed(()=>{

                let temp = { 'periodo':0, 'nombre': 'Periodo' }

                if(periodo.value > 0){
                    temp = periodos.value.find((p)=>p.periodo == periodo.value)
                }
            
                return temp

            })

            const actual_periodo = computed(()=>{ return Store.state.actual_periodo })

            watch(periodo,(value) => {
      
                if(value > 0) {
                    emitir(value)
                }

            })

            watch(actual_periodo,(value) => {
      
                if(value.periodo > 0) {
                    periodo.value = value.periodo
                }

            })

            return{
                periodo,
                modulo,
                set_periodo,
                actual_periodo,
                mostrar_menu,
                emitir,
                periodos,
                periodo_select
            }

        },


        mounted(){
            this.$nextTick(()=>{
    
                if(Store.state.actual_periodo.periodo > 0){
                   this.periodo = this.actual_periodo.periodo
                }

            })
        }

    })
    
</script>
    
<style scoped>
    
</style>