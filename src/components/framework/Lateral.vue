
<template>
  <div class="min-h-full h-screen w-64">
    <div class="flex min-h-full flex-1 flex-col bg-gray-800">
        <div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="Academic" />
            <span class="text-white">Academic</span>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto">
            <div class="flex-1 space-y-1 px-2 py-4">
                <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-pink-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center rounded-md px-2 py-2 text-base font-medium']">                  <div class="flex space-x-2">
                    <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'h-6 w-10']" aria-hidden="true"></component>
                    <span class="w-full">{{ item.name }}</span>
                  </div>
                </RouterLink>
            </div>
        </div>
        <div class="space-y-1 px-2 py-4">                    
            <button @click="cerrar_sesion()" class="w-full cursor-pointer border-transparent transition duration-300 ease-in-out hover:border-gray-600 border p-2 rounded-md px-2 flex items-center">
              <component :is="ArrowLeftOnRectangleIcon" class="h-6 w-6 text-gray-400 group-hover:text-gray-300"></component>
              <span class="ml-2 text-gray-400 text-base font-medium">Salir</span>
            
            </button>
        </div>
        
    </div>
  </div>
</template>
  
<script setup>

  import { ref, watchEffect, watch, defineComponent, onMounted,nextTick, computed, getCurrentInstance } from "vue"
  import { useRoute, RouterLink, RouterView } from 'vue-router'
  import Store from "@/store"
  import Aplicacion from '@/controllers/Aplicacion'
  
  import{
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    BuildingLibraryIcon,
    PencilSquareIcon,
    CalendarDaysIcon,
    ArrowLeftOnRectangleIcon,
    LinkIcon,
    DocumentArrowDownIcon,
    AcademicCapIcon,
    RectangleStackIcon,
    RocketLaunchIcon
  } from '@heroicons/vue/24/outline'
  
  const route = useRoute()
  
  const currentPath = computed(()=> route.path.split("/")[2])
  const urlsf = computed(()=> Store.state.urlsf )
  
  const navigation = ref([
    { name: 'Inicio', href: 'inicio', icon: HomeIcon, current: true },
    { name: 'Calificaciones', href: 'calificaciones', icon: PencilSquareIcon, current: false },
    { name: 'Estudiantes', href: 'estudiantes', icon: UsersIcon, current: false },
    { name: 'Asignaturas', href: 'asignaturas', icon: FolderIcon, current: false },
    { name: 'Logros', href: 'logros', icon: InboxIcon, current: false },
    { name: 'Faltas', href: 'faltas', icon: CalendarDaysIcon, current: false },
    { name: 'Matriculas', href: 'matriculas', icon: LinkIcon, current: false },
    { name: 'Grados', href: 'grados', icon: RectangleStackIcon, current: false },
    { name: 'Generables', href: 'generables', icon: DocumentArrowDownIcon, current: false },
    { name: 'Docentes', href: 'docentes', icon: AcademicCapIcon, current: false },
    { name: 'Rectores', href: 'rectores', icon: UsersIcon, current: false },
    // { name: 'Personas', href: 'personas', icon: UserCircleIcon, current: false },
    { name: 'Sedes', href: 'sedes', icon: BuildingLibraryIcon, current: false },
    { name: 'Año Lectivo', href: 'lectivos', icon: RocketLaunchIcon, current: false },
    
  ])

  const cerrar_sesion = async ()=>{ 
    Aplicacion.cerrar_sesion()
  }

  watch(currentPath,(path) => {
    navigation.value.forEach((item) => {
      item.current = (item.href === path)
    })
  })

  onMounted(()=>{
    nextTick(()=>{

    })
  })

  </script>
