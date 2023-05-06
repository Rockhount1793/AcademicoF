
<template>
    <div class="min-h-full h-screen w-64">

        <!--<div :show="false" class="z-30 lg:hidden" @close="sidebarOpen = false">
            
            <div as="template" enter="z-15 transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </div>
  
          <div class="fixed inset-0 z-40 flex">
            <div enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <div class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                <div enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute top-0 right-0 pt-2">
                    <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <icon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="Academic" />
                </div>
                <div class="mt-5 h-0 flex-1 overflow-y-auto">
                  <RouterLink v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center rounded-md px-2 py-2 text-base font-medium']">
                      <component :is="item.icon"
                                :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 h-6 w-6 flex-shrink-0']"
                                aria-hidden="true" />
                      {{ item.name }}
                </RouterLink>
                </div>
            </div>
            </div>
            <div class="w-14 flex-shrink-0" aria-hidden="true">

            </div>
          </div>
        </div>-->
        
        <div class="flex min-h-full flex-1 flex-col bg-gray-800">

            <div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="Academic" />
                <span class="text-white">Academic</span>
            </div>

            <div class="flex flex-1 flex-col overflow-y-auto">
                <div class="flex-1 space-y-1 px-2 py-4">
                    <RouterLink v-for="item in navigation" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center rounded-md px-2 py-2 text-base font-medium']">
                    
                        <div class="flex space-x-2">
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
  
  const navigation = ref([
    { name: 'Inicio', href: '/', icon: HomeIcon, current: true },
    { name: 'Calificaciones', href: '/calificaciones', icon: PencilSquareIcon, current: false },
    { name: 'Estudiantes', href: '/estudiantes', icon: UsersIcon, current: false },
    { name: 'Asignaturas', href: '/asignaturas', icon: FolderIcon, current: false },
    { name: 'Logros', href: '/logros', icon: InboxIcon, current: false },
    { name: 'Faltas', href: '/faltas', icon: CalendarDaysIcon, current: false },
    { name: 'Matriculas', href: '/matriculas', icon: LinkIcon, current: false },
    { name: 'Grados', href: '/grados', icon: RectangleStackIcon, current: false },
    { name: 'Generables', href: '/generables', icon: DocumentArrowDownIcon, current: false },
    { name: 'Docentes', href: '/docentes', icon: AcademicCapIcon, current: false },
    { name: 'Rectores', href: '/rectores', icon: UsersIcon, current: false },
    // { name: 'Personas', href: '/personas', icon: UserCircleIcon, current: false },
    { name: 'Sedes', href: '/sedes', icon: BuildingLibraryIcon, current: false },
    { name: 'Año Lectivo', href: '/lectivos', icon: RocketLaunchIcon, current: false },
    
  ])

  const cerrar_sesion = async ()=>{ 
    Aplicacion.cerrar_sesion()
  }

  const urlsf = computed(()=> Store.state.urlsf )

  const route = useRoute()
  
  watchEffect(() => {
      
    navigation.value.forEach((item) => {
      item.current = item.href === route.path
    })

  })

    onMounted(()=>{
        
      nextTick(()=>{

      })

    })

  </script>
