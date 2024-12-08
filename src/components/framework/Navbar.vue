<template>

<div class="flex sticky top-0 z-30  h-auto lg:h-16 bg-white shadow-md">
          
  <div class="w-full lg:flex grid h-auto lg:h-16 justify-between px-4 content-between">

    <div class="grid gap-2 lg:gap-0 lg:flex text-2xl lg:space-x-2 font-semibold text-gray-900 lg:items-center">

      <Selector 
        :classAux="'border border-gray-200 shadow-md text-left rounded-md w-48 lg:bg-indigo-500/10 px-2 h-8 text-xs font-semibold leading-8 text-indigo-400'" 
        :key="keySelectorSede"
        :items="sedes"
        :beforeText="'Sede actual:'"
        :current="actual_sede"
        @onSelect="set_sede"
      >
      </Selector>

      <Selector 
        :classAux="'border border-gray-200 shadow-md text-left rounded-md w-48 lg:bg-indigo-500/10 px-2 h-8 text-xs font-semibold leading-8 text-indigo-400'" 
        :key="keySelectorLectivo"
        :items="lectivos"
        :beforeText="'Año lectivo actual:'"
        :current="actual_lectivo"
        @onSelect="set_lectivo"
      >
      </Selector>

    </div>

    <div class="mt-3 lg:mt-0 flex items-center space-x-3">
      
      <Loader></Loader>

      <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span class="sr-only">View notifications</span>
        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <Menu as="div" class="">

        <div class="w-8">
          <MenuButton class="max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" :src="`/images/avatar/${user.avatar}`" alt="avatar" />
          </MenuButton>
        </div>

        <transition 
        enter-active-class="transition ease-out duration-100" 
        enter-from-class="transform opacity-0 scale-95" 
        enter-to-class="transform opacity-100 scale-100" 
        leave-active-class="transition ease-in duration-75" 
        leave-from-class="transform opacity-100 scale-100" 
        leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute cursor-pointer border border-gray-200 right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem as="div" v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
              <div @click="cerrar_sesion()" :class="[active ? 'bg-gray-100' : '','block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</div>
            </MenuItem>
          </MenuItems>
        </transition>

      </Menu>

    </div>

  </div>

</div>

</template>
  
<script setup>

  import { ref, computed, onMounted, nextTick, watch } from "vue"
  
  import{
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue'

  import {
    Bars3BottomLeftIcon,
    BellIcon
  } from '@heroicons/vue/24/outline'
  
  import Store from "@/store"
  import Aplicacion from "@/controllers/Aplicacion"
  import Sede from "@/controllers/Sede"
  import Lectivo from '@/controllers/Lectivo'
  import Loader from "@/components/framework/Loader.vue"
  import Selector from "@/components/framework/SelectorOpciones.vue"

  const userNavigation = [
    { name: 'Cerrar Sesión', href: '#' },
  ]

  const sidebarOpen = ()=>{
    // abrir lateral
  }
 
  const keySelectorSede = ref(0)
  const keySelectorLectivo = ref(0)

  const set_sede = (selected) => {
    const {item} = selected
    Store.dispatch('change_sede',{"sede_id":item.id,"nombre":item.name})
  }
  
  const set_lectivo = (selected)=>{
    const {item} = selected
    Store.dispatch('change_lectivo',{"lectivo_id":item.id,"numero":item.name})
  }
  
  // computed
  const user = computed(()=> Store.state.usuario )
  const sedes = computed(() => Store.state.sedes.map((s)=>{ return {"id":s.sede_id,"name":s.nombre}}) )
  const actual_sede = computed(() =>{ return {"id":Store.state.actual_sede.sede_id,"name": Store.state.actual_sede.nombre} })
  const actual_lectivo = computed(()=>{ return{"id":Store.state.actual_lectivo.lectivo_id,"name":Store.state.actual_lectivo.numero } })
  const lectivos = computed(() => Store.state.lectivos.map((s)=>{ return {"id":s.lectivo_id,"name":s.numero}}) ) 

  // watch
  
  watch(sedes,(act,old)=> {
    keySelectorSede.value++
  })

  watch(lectivos,(act,old)=> {
    keySelectorLectivo.value++
  })

  watch(actual_sede,(act,old)=> {
    keySelectorSede.value++
  })

  watch(actual_lectivo,(act,old)=> {
    keySelectorLectivo.value++
  })
  
  onMounted(()=> {
    nextTick(async() => {
          if (!Store.state.sedes.length) {
            const sedesq = await Sede.index()
            if(sedesq.status && !Store.state.lectivos.length){
              Lectivo.index()   
            }
          }

    })
  }) 
  
  const cerrar_sesion = async ()=>{ 
    Aplicacion.cerrar_sesion()
  }

</script>