<template>
    <Listbox as="div" v-model="selected" v-slot="{ open }" class="relative w-full">
        <ListboxButton :id="`selector-${idInput}-${index}`" :class="[classAux,'relative w-full cursor-pointer rounded-md px-1 text-gray-900 ring-0 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs leading-3']">
            <span :title="selected.name" class="block truncate">{{ beforeText }} <span class="text-gray-900">{{ selected.name }}</span></span>
            <div v-if="showIcon" :class="[ open ? 'rotate-160 text-ui-secondary':'text-ui-gray-strong' ,'pointer-events-none transform transition ease-in duration-200 absolute inset-y-0 right-0 flex items-center']">
                <BaseIcon color="currentColor" :size="1.2" fill="currentColor" name="chevronRight" />
            </div>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                <ChevronDownIcon :class="[ open ? 'transform rotate-180':'' ,' transition ease-in duration-200 h-5 w-5 text-indigo-500']" aria-hidden="true" />
            </span>
        </ListboxButton>
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions @blur="onBlur" :class="[width,'absolute z-10 mt-1 max-h-60 overflow-auto border border-ui-gray-secondary rounded-md bg-white text-base shadow-lg focus:outline-none sm:text-sm']">
                <li v-if="search" class="px-1 py-1 bg-white shadow z-10 top-0 sticky">
                    <input @keydown="selectActive" type="text" maxlength="20" placeholder="Buscar.." v-model="query" class="w-full rounded h-5 truncate cursor-pointer text-xs leading-5 text-ellipsis"/>
                </li>
                <ListboxOption as="template" v-for="item in filterelements" :key="item.id" :value="item" v-slot="{ active, selected }">
                    <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'px-1 relative select-none']">
                        <p :class="[selected ? 'font-semibold' : 'font-normal', 'truncate cursor-pointer text-xs leading-5 text-ellipsis ']">
                            {{ item.name || '...' }}
                        </p>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </transition>
    </Listbox>
</template>

<script lang="js">
import { defineComponent, ref, reactive, watch, computed } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon,ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import BaseIcon from "@/components/framework/BaseIcon.vue"

export default defineComponent({
    name:"SelectorSimple",
    components:{ Listbox, BaseIcon, CheckIcon, ChevronUpDownIcon, ChevronRightIcon,ChevronDownIcon, ListboxLabel, ListboxOptions, ListboxOption, ListboxButton },
    props :{
        items:{ type: Object, default:[], required: true }, // array de objetos a listar [{"id":0,"name":"name 0"}]
        node:{ type: Object, default:{}, required: false }, // nodo cuando se usa dentro de un for
        index:{ type: Number, default:0, required: false }, // index cuando se usan dentro de un for
        current:{ type: Object, default:{id: 0, name: "..."}, required: false }, // selección por defecto {"id":1,"name":"name 1"}
        idInput:{ type: String, default:'input', required: false }, // id identificador
        width:{ type: String, default:'w-full', required: false }, // ancho del selector de opciones
        classAux:{ type: String, default:'bg-white'}, // class auxilares del boton
        search:{ type: Boolean, default:false}, // mostrar el buscador
        showIcon:{ type: Boolean, default: false}, // mostrar icono (sobreescribe el icono primario cuando no hay selección) 
        beforeText:{type: String, default: ""} // texto prefijo
    },
    
    setup(props,{emit}){

        // props
        const { items, node, index, current, idInput, width, classAux , search, showIcon, beforeText} = props

        // data
        const elements = reactive(items)
        const selected = ref(current)
        const query = ref("")

        // methods
        const selectActive =(e)=>{
            if(e.type == "keydown" && e.code === "Space" ){
                e.preventDefault()
                query.value += " "
            }
        }

        const onBlur = ()=>{
            setTimeout(()=>{
                emit("onBlur",{ node:node, index:index, idInput: idInput})
            },200)
        }

        const setItem = (item)=>{
            selected.value = item
        }

        // comnputed
        const filterelements = computed(()=>
            query.value === '' ? elements
            : elements.filter((element) => {
                return element.name.toLowerCase().includes(query.value.toLowerCase())
            })
        )

        // watch
        watch(selected,(newSelected, prevSelected )=> {
            if(newSelected.id > 0) emit("onSelect",{node:node,index:index,item:selected.value,idInput:idInput})
        })

        return{query,selectActive, filterelements, elements, selected, index, current, idInput, width,classAux, search, showIcon, setItem, onBlur, beforeText }
    }
})
</script>