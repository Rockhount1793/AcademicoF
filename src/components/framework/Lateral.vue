
<template>
    <div class="h-screen w-60">
        <div class="flex min-h-full flex-1 flex-col bg-gray-800">
            <div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
                <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="Academic" src="/images/logo.svg"  alt="Academic" />
                <span class="text-white">Academic</span>
            </div>

            <div class="flex flex-1 flex-col overflow-y-auto">
                <div class="flex-1 space-y-1 px-2 py-4">
                    <RouterLink 
                      v-slot="{ isActive, href, navigate }"
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.href"
                      class="text-gray-300 group flex items-center rounded-md text-base font-medium"
                    >
                        <div :class="[ isActive ? 'bg-gray-900 text-pink-600':'hover:bg-gray-700 hover:text-white','rounded-md px-2 py-2 flex space-x-2 h-full w-full']">
                            <component :is="item.icon" class="group-text h-6 w-10" aria-hidden="true"></component>
                            <span class="w-full">{{ item.name }}</span>
                        </div>
                    </RouterLink>
                </div>
            </div>

            <div v-if="Config.status == 'development'" class="flex-1 text-sm w-full px-1">
              <div class="w-full inline-flex text-orange-500 leading-4">
                <p>estado:</p><p class="ml-2 capitalize">{{ Config.status }}</p>
              </div>
              <p class="w-full inline-flex text-orange-500 leading-4">
                <p>versión:</p><p class="ml-2 capitalize text-xs">{{ Config.version.split(" ")[1] +" "+ Config.version.split(" ")[2] }}</p>
              </p>
              <p class="text-pink-500"><span class="text-orange-500">login:</span> {{Store.state.login }}</p>
              <p class="w-full leading-4 inline-flex space-x-5">
                <button
                    @click="Getlogin"
                    class="text-indigo-500 rounded h-4 w-20 bg-indigo-100"
                >
                    <p class="capitalize text-xs">
                        GetLogin
                    </p>

                </button>
              </p>
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
import Aplicacion from '@/controllers/Aplicacion'
import Config from '@/config'
import { checkLogin }   from "@/Middleware/helper"
import Store from "@/store"

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
    { name: 'Inicio', href: 'inicio', icon: HomeIcon },
    { name: 'Calificaciones', href: 'calificaciones', icon: PencilSquareIcon },
    { name: 'Estudiantes', href: 'estudiantes', icon: UsersIcon },
    { name: 'Asignaturas', href: 'asignaturas', icon: FolderIcon },
    { name: 'Logros', href: 'logros', icon: InboxIcon },
    { name: 'Faltas', href: 'faltas', icon: CalendarDaysIcon },
    { name: 'Matriculas', href: 'matriculas', icon: LinkIcon },
    { name: 'Grados', href: 'grados', icon: RectangleStackIcon },
    { name: 'Generables', href: 'generables', icon: DocumentArrowDownIcon },
    { name: 'Docentes', href: 'docentes', icon: AcademicCapIcon },
    { name: 'Rectores', href: 'rectores', icon: UsersIcon },
    // { name: 'Personas', href: 'personas', icon: UserCircleIcon, current: false },
    { name: 'Sedes', href: 'sedes', icon: BuildingLibraryIcon },
    { name: 'Año Lectivo', href: 'lectivos', icon: RocketLaunchIcon },
    
])

const Getlogin = async()=>{
    const result = await checkLogin()
    if(!result.status){
        alert("No hay un token de sesión!")
    }
}

const cerrar_sesion = async ()=>{ 
    Aplicacion.cerrar_sesion()
}
  
</script>
