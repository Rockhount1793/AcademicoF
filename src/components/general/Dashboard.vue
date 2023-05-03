
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    -->
    <div class="h-full bg-gray-100">
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </TransitionChild>
  
          <div class="fixed inset-0 z-40 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute top-0 right-0 -mr-12 pt-2">
                    <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="Academic" />
                </div>
                <div class="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav class="space-y-1 px-2">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center rounded-md px-2 py-2 text-base font-medium']">
                      <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 h-6 w-6 flex-shrink-0']" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
            <div class="w-14 flex-shrink-0" aria-hidden="true">
              <!-- Dummy element to force sidebar to shrink to fit close icon -->
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Static sidebar for desktop -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <img class="w-10 h-10 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" title="Academic" :src="urlsf+'/images/logo.svg'"  alt="Academic" />

            <span class="text-white">Academic</span>
          </div>
          <div class="flex flex-1 flex-col overflow-y-auto">
            <nav class="flex-1 space-y-1 px-2 py-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center rounded-md px-2 py-2 text-sm font-medium']">
                <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 h-6 w-6 flex-shrink-0']" aria-hidden="true" />
                {{ item.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:pl-64">
        <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button type="button" class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden" @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div class="flex flex-1 justify-between px-4 items-center">
            <div class="flex text-2xl font-semibold text-gray-900">

            
                <div class="mr-4 rounded-full sm:text-end lg:bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20 ">
                    Sede actual: <span class="text-gray-900">Belen</span>
                </div>

                <div class="rounded-full lg:bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                    Año lectivo actual: <span class="text-gray-900">2023</span>
                </div>
           
                

            </div>
            <div class="ml-4 flex items-center lg:ml-6">
              <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
  
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem as="div" v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <Router-link :to="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</Router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
  
        <main class="flex-1 ">
          <div class="py-6">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <h1 class="text-2xl font-semibold text-gray-900 capitalize">{{route.path}}</h1>
            </div>
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <RouterView></RouterView>
          </div>
        </main>


      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue'
  import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
    BuildingLibraryIcon,
    PencilSquareIcon,
    BookmarkIcon,
    CalendarDaysIcon,
    LinkIcon,
    DocumentArrowDownIcon,
    AcademicCapIcon,
    UserCircleIcon,
  } from '@heroicons/vue/24/outline'
  import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
  

  const userNavigation = [
    { name: 'Cerrar Sesión', href: '#' },
  ]
  
  const sidebarOpen = ref(false)

  const navigation = ref([
    { name: 'Inicio', href: '/inicio', icon: HomeIcon, current: true },
    { name: 'Calificaciones', href: '/calificaciones', icon: PencilSquareIcon, current: false },
    { name: 'Estudiantes', href: '/estudiantes', icon: UsersIcon, current: false },
    { name: 'Asignaturas', href: '/asignaturas', icon: FolderIcon, current: false },
    { name: 'Logros', href: '/logros', icon: InboxIcon, current: false },
    { name: 'Faltas', href: '/faltas', icon: CalendarDaysIcon, current: false },
    { name: 'Matriculas', href: '/matriculas', icon: LinkIcon, current: false },

    { name: 'Generables', href: '/generables', icon: DocumentArrowDownIcon, current: false },
   
    { name: 'Docentes', href: '/docentes', icon: AcademicCapIcon, current: false },
    { name: 'Personas', href: '/personas', icon: UserCircleIcon, current: false },
    { name: 'Sedes', href: '/sedes', icon: BuildingLibraryIcon, current: false },
    
  ]);


  import { watchEffect, watch, defineComponent, computed, getCurrentInstance } from "vue"
  import { useRoute, RouterLink, RouterView } from 'vue-router'
  import Store from '@/store';

  const urlsf = computed(()=> Store.state.urlsf )

  //Method to change the active link in the sidebar

    const route = useRoute()
    watchEffect(() => {
      navigation.value.forEach((item) => {
        item.current = item.href === route.path
      })
    })




  </script>