<template>
        
    <div class="grid grid-cols-6 lg:grid-cols-12 gap-2">

        <div class="relative col-span-12 lg:col-span-12 ">

            <button type="button" @click="mostrar_menu()" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" class="w-full border border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                <div class=" flex items-center justify-between space-x-1 w-full">

                    <span class="block capitalize font-semibold text-sm text-indigo-500 hover:text-indigo-400">
                       {{recurso_select.nombre}}
                    </span>

                    <span class="flex right-0 inset-y-0 items-center pr-2 pointer-events-none">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-pink-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>

                    </span>

                </div>

            </button>

            <div v-if="modulo" class="z-10 w-full absolute border border-indigo-500 shadow-lg mt-0.5 rounded bg-white">
                
                <div class="h-48 overflow-auto">

                    <ul :key="per.index" v-for="per in recursos" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="py-0 text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">

                        <li  @click="set_recurso(per);mostrar_menu();" id="listbox-item-0" role="option" class="h-6 text-gray-900 cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out select-none py-1 pl-3 pr-9">
                        
                            <div class="flex items-center space-x-3">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-600">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                
                                <span class="capitalize font-semibold text-gray-700 text-sm ">
                                    {{per.nombre}} 
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

        name: 'Selector-Generable',

        components:{  },

        props:{
            //title: String
        },

        setup(props, { emit }){

            //# data
            let recurso = ref(0)
            let modulo = ref(false)

            //# methods
            const set_recurso = (json)=>{
                recurso.value = json.recurso
                Store.commit('set_actual_generable',json)
            }

            const mostrar_menu = ()=>{
                modulo.value = !modulo.value
            }

            const emitir = (number)=>{
              // emit('set_recurso',number)
            }
            
            //# computed
            
            const recursos = computed(()=>{ return Store.state.generables })
            
            const recurso_select = computed(()=>{

                let temp = { 'recurso':0, 'nombre': 'Generable' }

                if(recurso.value > 0){
                    temp = recursos.value.find((p)=>p.recurso == recurso.value)
                }
            
                return temp

            })

            const actual_recurso = computed(()=>{
                return Store.state.actual_generable
            })

            watch(recurso,(value) => {
                if(value > 0) {
                    emitir(value)
                }
            })

            return{
                recurso,
                modulo,
                set_recurso,
                actual_recurso,
                mostrar_menu,
                emitir,
                recursos,
                recurso_select
            }

        },


        mounted(){
            this.$nextTick(()=>{
    
                if(Store.state.actual_generable.recurso > 0){
                   this.recurso = this.actual_recurso.recurso
                }

            })
        }

    })
    
</script>
    
<style scoped>
    
</style>