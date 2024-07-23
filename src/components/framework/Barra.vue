<template>

<div class="flex sticky top-0 z-30  h-auto lg:h-16 bg-white shadow-md">
          
  <div class="w-full lg:flex grid h-auto lg:h-16 justify-between px-4 content-between">

    <div class="grid gap-2 lg:gap-0 lg:flex text-2xl lg:space-x-2 font-semibold text-gray-900 lg:items-center">
 
      <div class="rounded-md w-48 lg:bg-indigo-500/10 px-2 h-8 text-xs font-semibold leading-8 text-indigo-400 ">
        <p>
          Sede actual: <span class="text-gray-900 capitalize">{{ actual_sede.nombre }}</span>
        </p>
      </div>

      <div class="rounded-md w-48 lg:bg-indigo-500/10 px-2 h-8 text-xs font-semibold leading-8 text-indigo-400 ">
        <p>
          Año lectivo actual: <span class="text-gray-900">{{lectivo.numero}}</span>
        </p>
      </div>

      <select v-model="sede_selected" class="rounded-md text-xs w-48 border-0 h-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600">
        <option value="" selected>Cambiar sede</option>
        <option v-for="sede in sedes.value" :key='sede.id' :value='sede'>{{ sede.nombre }} </option>
      </select>

      <select v-model="lectivo_selected" class="rounded-md text-xs w-48 border-0 h-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600">
        <option value="">Cambiar año</option>
        <option v-for="lectivo in lectivos.value" :key="lectivo.lectivo_id" :value="lectivo">{{ lectivo.numero }}</option>
      </select>

    </div>

    <div class="mt-3 lg:mt-0 flex items-center space-x-3">

      <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <span class="sr-only">View notifications</span>
        <BellIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <Menu as="div" class="">

        <div class="w-8">
          <MenuButton class="max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" :src="'../public/images/avatar/'+user.avatar" alt="avatar" />
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

  const userNavigation = [
    { name: 'Cerrar Sesión', href: '#' },
  ]

  const sidebarOpen = ()=>{
    // abrir lateral
  }
 
  const sedes = ref([])
  const lectivos = ref([])
  const sede_selected = ref('')
  const lectivo_selected = ref('')

  sedes.value = computed(() => Store.state.sedes);
  
  lectivos.value = computed(()=> Store.state.lectivos);
  //console.log('lectivos',lectivos);

  const set_sede = (json) => {
    Store.dispatch('change_sede', json)
  }

  const set_lectivo = (json)=>{
      Store.dispatch('change_lectivo',json)
  }

  watch(sede_selected,(act,old)=> {
    set_sede(act)
  })
  watch(lectivo_selected, (newValue,oldValue)=> {
    set_lectivo(newValue)
  })
  
  onMounted(()=> {
    nextTick(() => {
      Aplicacion.check_login(() => {
          if (!Store.state.sedes.length) {
              Sede.index()
          }
          if(!Store.state.lectivos.length){
              Lectivo.index(()=>{})   
          }
      })
    })
  }) 
  
  const cerrar_sesion = async ()=>{ 
    Aplicacion.cerrar_sesion()
  }
 
  const user = computed(()=> Store.state.usuario )
  const lectivo = computed(()=> Store.state.actual_lectivo )
  const actual_sede = computed(() => Store.state.actual_sede)

</script>