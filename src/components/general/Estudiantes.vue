<template>
    <div class="mt-2 h-[90%] pb-2 flex w-auto lg:px-2">
        <div class="rounded border border-gray-300 w-full">

            <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Estudiantes</p>

            <div class="flex w-full justify-between">

                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="set_seccion(0)" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="set_seccion(1)" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-2xl"> +</p>
                </div>

                <div class="w-1/3 mt-3 mr-4" v-if="seccion == 0">
                    <label for="search" class="sr-only">Buscar estudiante</label>
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input v-model="search" id="search" name="search" class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Buscar estudiante.." type="search" />
                    </div>
                </div>

            </div>

            <hr class="mt-2 border border-gray-200" />

            <!-- listado -->
            <div v-if="seccion == 0" class="mt-2 h-full">

                <div class="px-0 sm:px-2 lg:px-4 h-[86%] overflow-y-auto">

                    <div v-if="!estudiantes.length" class="sm:flex sm:items-center">
                        <p class="px-2 font-semibold text-gray-500"> No hay estudiantes creados</p>    
                    </div>

                    <div v-else class="">
                        <div class="px-4 lg:px-6 h-full">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-white sticky top-0 shadow">
                                    <tr>
                                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        <p class="px-5">
                                            Nombres
                                        </p>
                                        </th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">RH</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha nacimiento</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edad</th>
                                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="estudiante in estudiantes" :key="estudiante.id">
                                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                            <div class="flex items-center">
                                                <div class="h-10 w-10 flex-shrink-0">
                                                    <img class="h-10 w-10 rounded-full ml-2" :src="'/images/avatar/'+Utilities.firstLetter(estudiante.nombres)+'.png'" alt="icon.letter" />
                                                </div>
                                                <div class="ml-6">
                                                    <div class="font-medium text-base text-gray-900 capitalize">{{ estudiante.nombres + " " + estudiante.apellidos  }}</div>
                                                    <div class="text-gray-500">ID: {{ estudiante.identificacion }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="estudiante.estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ estudiante.estado ? 'Activo':'Inactivo'  }} </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div class="text-gray-900">{{ estudiante.rh }}</div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div class="text-gray-900">{{ formatDate(estudiante.nacimiento) }}</div>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getBirthDate(estudiante.nacimiento) }} años</td>
                                        <td @click="consultar_estudiante(estudiante.estudiante_id)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                            Editar
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>

            </div>

            <!-- crear --->
            <div v-if="seccion == 1" class="mt-3 h-[86%] overflow-y-auto rounded px-2">

                <div class="mt-3">
                    <h5 class="font-semibold ">Crear nuevo estudiante</h5>
                    <hr/>
                </div>

                <div class="mt-3 p-2 flex-1 lg:grid grid-cols-2 lg:gap-2">

                    <div>
                        <label for="nombre" class="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
                        <div class="relative mt-2 ">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <input v-model="nombre" id="nombre" type="text" name="nombre" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis nombres" />
                        </div>
                    </div>

                    <div>
                        <label for="apellido" class="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                            </div>
                            <input v-model="apellido" type="text" name="apellido" id="apellido" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis apellidos" />
                        </div>
                    </div>

                    <div>
                        <label for="identificacion" class="block text-sm font-medium leading-6 text-gray-900">Identificacion</label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>

                            </div>
                            <input v-model="identificacion" type="text" name="identificacion" id="identificacion" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="12345678" />
                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Nacimiento</label>
                        <div class="flex items-center space-x-2">

                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>

                            </div>

                            <select v-model="nacimiento.day" class="w-32 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option :value="0">Día</option>
                                <option v-for="(item, index) in days" :key="index" :value="item">{{item}}</option>
                            </select>

                        </div>

                        <div class="relative mt-2">
                            
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>

                            </div>

                            <select v-model="nacimiento.month" class="w-32 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option :value="0">Mes</option>
                                <option v-for="(item, index) in months" :key="index" :value="item.num">{{item.name}}</option>
                            </select>

                        </div>
                        
                        <div class="relative mt-2">
                            
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>

                            </div>

                            <select v-model="nacimiento.year" class="w-32 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option :value="0">Año</option>
                                <option v-for="(item, index) in years" :key="index" :value="item">{{item}}</option>
                            </select>
                            
                        </div>
                    </div>

                    </div>
                    
                    <div class="">
                        <button @click="guardar()" class="w-full lg:w-32 mt-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                            Guardar
                        </button>
                    </div>

                </div>

            </div>

            <!-- actualizar --->
            <div v-if="seccion == 2" class="mt-3 h-[86%] overflow-y-auto rounded px-2">

                <!-- Detalles Personales -->
                <div class="mt-3">
                    <h5 class="font-semibold ">Editar estudiante</h5>
                </div>

                <hr/>

                <div class="lg:grid lg:grid-cols-2 lg:gap-2">

                    <div>
                        <label for="nombre_ed" class="block text-sm font-medium leading-6 text-gray-900">Nombres<span class="text-red-500">*</span></label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <input v-model="estudiante_temp.nombres" id="nombre_ed" type="text" name="nombre_ed" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis nombres" />
                        </div>
                    </div>

                    <div>
                        <label for="apellido_ed" class="block text-sm font-medium leading-6 text-gray-900">Apellidos<span class="text-red-500">*</span></label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <input v-model="estudiante_temp.apellidos" type="text" name="apellido_ed" id="apellido_ed" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis apellidos" />
                        </div>
                    </div>

                    <div>
                        <label for="identificacion_ed" class="block text-sm font-medium leading-6 text-gray-900">Identificación<span class="text-red-500">*</span></label>
                        <div class="relative mt-2">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>

                            </div>
                            
                            <input v-model="estudiante_temp.identificacion" 
                            type="number" 
                            name="identificacion_ed" id="identificacion_ed" 
                            class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            placeholder="12345678" />
                        
                        </div>
                    </div>
                </div>

                <!-- Detalles Adicionales -->
                <div class="mt-3">
                    <h5 class="font-semibold ">Detalles Adicionales</h5>
                </div>

                <hr/>

                <div class="mt-3 lg:grid lg:grid-cols-2 gap-2">

                    <div>
                        <label for="activo_detalle" class="block text-sm font-medium leading-6 text-gray-900">Activo <span class="text-red-500 font-thin">*Disponibilidad en consultas</span></label>
                        <div class="relative mt-2 space-x-10">
                            <Switch v-model="enabled" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                                <span class="sr-only">Activo</span>
                                <span :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                                  <span :class="[enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                    <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                      <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                  </span>
                                  <span :class="[enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                    <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                    </svg>
                                  </span>
                                </span>
                            </Switch>
                        </div>
                    </div>
                    
                    <div>
                        <label for="genero_detalle" class="block text-sm font-medium leading-6 text-gray-900">Genero</label>
                        <div class="relative mt-2">

                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                            </div>

                            <select id="genero_detalle" v-model="estudiante_temp.genero" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="#">Seleccionar</option>
                                <option v-for="(item, index) in generos" :key="index" :value="item">{{item}}</option>
                            </select>

                        </div>
                    </div>

                    <div>
                        <label for="rh_detalle" class="block text-sm font-medium leading-6 text-gray-900">RH</label>
                        <div class="relative mt-2">

                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                </svg>
                            </div>
                        
                            <select id="rh_detalle" v-model="estudiante_temp.rh" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="#">Seleccionar</option>
                                <option v-for="(item, index) in rhs" :key="index" :value="item">{{item}}</option>
                            </select>

                        </div>
                    </div>

                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Nacimiento</label>
                        
                        <div class="flex items-center space-x-2">

                            <div class="relative mt-2">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
    
                                </div>
    
                                <select v-model="nacimiento.day" class="w-32 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option value="0">Día</option>
                                    <option v-for="(item, index) in days" :key="index" :value="item">{{item}}</option>
                                </select>
    
                            </div>

                            <div class="relative mt-2">
                                
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
    
                                </div>
    
                                <select v-model="nacimiento.month" class="w-32 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option :value="0">Mes</option>
                                    <option v-for="(item, index) in months" :key="index" :value="item.num">{{item.name}}</option>
                                </select>
    
                            </div>
                        
                            <div class="relative mt-2">
                                
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
    
                                </div>
    
                                <select v-model="nacimiento.year" class="w-22 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option :value="0">Año</option>
                                    <option v-for="(item, index) in years" :key="index" :value="item">{{item}}</option>
                                </select>
                                
                            </div>
                        </div>

                    </div>

                    <div>
                        <label for="direccion_detalle" class="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                        <div class="relative mt-2 ">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <input v-model="estudiante_temp.direccion" id="direccion_detalle" type="text" name="direccion_detalle" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="K0 #0-0" />
                        </div>
                    </div>

                    <div>
                        <label for="telefono_detalle" class="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                        <div class="relative mt-2 ">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </div>
                            <input v-model="estudiante_temp.telefono" id="telefono_detalle" type="text" name="telefono_detalle" class="w-full lg:w-3/4 rounded-md shadow-sm border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="000000" />
                        </div>
                    </div>

                </div>

                <!-- Detalles Parentesco -->
                <div class="mt-3">
                    <h5 class="font-semibold ">Detalles Parentales</h5>
                    <hr/>
                </div>

                <div class="mt-3 flex-1">

                    <div class="">
                        <label for="identificacion_padre" class="block text-sm font-medium leading-6 text-gray-900">Buscar Padre Por Identificación </label>
                        <div class="relative mt-2">

                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>

                            <input v-model="search_identificacion_padre" id="identificacion_padre" name="identificacion_padre" class="mr-2 lg:w-1/4 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Identificación Padre" type="number" />

                            <button type="button" @click="buscar_personal('padre')" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800">
                                Buscar..
                            </button>

                        </div>

                        <div class="mt-3 font-thin text-normal">
                            <h5 class="text-gray-500">Nombres:</h5>
                            <h5 class="text-gray-500">Identificación:</h5>
                            <h5 class="text-gray-500">Teléfono:</h5>
                        </div>

                    </div>

                    <div class="mt-3">
                        <label for="identificacion_madre" class="block text-sm font-medium leading-6 text-gray-900">Buscar Madre Por Identificación </label>
                        <div class="relative mt-2">

                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>

                            <input v-model="search_identificacion_madre" id="identificacion_madre" name="identificacion_madre" class="mr-2 lg:w-1/4 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Identificación Madre" type="number" />

                            <button type="button" @click="buscar_personal('madre')" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800">
                                Buscar..
                            </button>

                        </div>

                        <div class="mt-3 font-thin text-normal">
                            <h5 class="text-gray-500">Nombres:</h5>
                            <h5 class="text-gray-500">Identificación:</h5>
                            <h5 class="text-gray-500">Teléfono:</h5>
                        </div>

                    </div>

                </div>

                <!-- Detalles Acudiente -->
                <div class="mt-3">
                    <h5 class="font-semibold ">Detalles Acudiente</h5>
                    <hr/>
                </div>

                <div class="mt-3">

                    <div class="">
                        <label for="identificacion_acudiente" class=" text-sm font-medium leading-6 text-gray-900">Buscar Acudiente Por Identificación </label>
                        <div class="relative mt-2">
                            
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>

                            <input v-model="search_identificacion_acudiente" type="number" id="identificacion_acudiente" name="identificacion_acudiente" class="mr-2 lg:w-1/4 rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Identificación Acudiente" />

                            <button type="button" @click="buscar_personal('acudiente')" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800">
                                Buscar..
                            </button>

                        </div>

                        <div class="mt-3 font-thin text-normal">
                            <h5 class="text-gray-500">Nombres:</h5>
                            <h5 class="text-gray-500">Identificación:</h5>
                            <h5 class="text-gray-500">Teléfono:</h5>
                        </div>

                    </div>

                </div>

                <div class="flex-1 lg:flow-root">

                    <button @click="cancelar()" class="float-left w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 border border-gray-400 rounded bg-white text-indigo-500 px-2">
                        Cancelar
                    </button>

                    <button @click="actualizar()" class="float-right w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                        Actualizar
                    </button>

                </div>

            </div>

        </div>
    </div>
</template>

<script lang="js">
    import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
    import Store from '@/store'
    import Estudiante from '@/controllers/Estudiante'
    import Anexo_Estudiante from '@/controllers/Anexo_Estudiante'
    import Utilities from '@/utilities'
    import { Switch } from '@headlessui/vue'

export default defineComponent({
    'name': 'Estudiantes',
    'components':{ Switch },
    setup(){
        // dates
        const days = ref([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
        const months = ref([
            {'num':1,'name':'Enero'},
            {'num':2,'name':'Febrero'},
            {'num':3,'name':'Marzo'},
            {'num':4,'name':'Abril'},
            {'num':5,'name':'Mayo'},
            {'num':6,'name':'Junio'},
            {'num':7,'name':'julio'},
            {'num':8,'name':'Agosto'},
            {'num':9,'name':'Septiembre'},
            {'num':10,'name':'Octubre'},
            {'num':11,'name':'Noviembre'},
            {'num':12,'name':'Diciembre'}])
        const years = ref([1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024])
        const search = ref('')
        const errores = ref([])
        const seccion = ref(0)
        const rhs = ref(['0+','0-','A+','A-','B+','B-','AB+','AB-'])
        const generos = ref(['Masculino','Femenino'])
        const enabled = ref(true)
        const search_identificacion_padre = ref(0)
        const search_identificacion_madre = ref(0)
        const search_identificacion_acudiente = ref(0)

        // nuevo estudiante
        const nombre = ref('')
        const apellido = ref('')
        const identificacion = ref('')
        const nacimiento = ref({'day':0,'month':0,'year':0})

        // editar estudiante
        const estudiante_temp = ref({
            'acudiente_id':'',
            'anexo_estudiante_id':0,
            'nombres':'',
            'apellidos':'',
            'identificacion':'',
            'nacimiento':null,
            'rh':'#',
            'madre_id':0,
            'padre_id':0,
            'telefono':'',
            'genero':'#',
            'estado':1,
            'direccion':'#',
            'anexo_id':0
        })

        //# methods
        const buscar_personal = async(key)=>{

            errores.value = []
            let identificacion = 0

            switch(key){
                case 'padre': identificacion = search_identificacion_padre.value; break;
                case 'madre': identificacion = search_identificacion_madre.value; break;
                case 'acudiente': identificacion = search_identificacion_acudiente.value; break;
            }

            if(identificacion <= 0 ){ errores.value.push('ingrese una identificación para el/la '+ key) }

            if(errores.value.length){
                alert(errores.value[0])
            }else{
                console.log(identificacion)
            }

        }

        const formatDate = (date)=>{        
            return new Date(date).toLocaleDateString()
        }

        function getBirthDate(date) {
            if(date != '#'){
                let date1 = new Date(date).getFullYear()
                let date2 = new Date().getFullYear()
                return  date2 - date1
            }
            return date
        }

        const clearForm = () => {
            nombre.value = ''
            apellido.value = ''
            identificacion.value = ''
            nacimiento.value = {'day':0,'month':0,'year':0}
        }

        const clear_estudiante_temp = ()=>{
            estudiante_temp.value = {
                'acudiente_id':'',
                'anexo_estudiante_id':0,
                'nombres':'',
                'apellidos':'',
                'identificacion':'',
                'nacimiento':'',
                'rh':'#',
                'madre_id':0,
                'padre_id':0,
                'telefono':'',
                'genero':'#',
                'estado':1,
                'direccion':'#',
                'anexo_id':0
            }
        }

        const consultar_estudiante = async (estudiante_id)=>{
            
            clearForm()
            const anexoestudianteq = await Anexo_Estudiante.index_estudiante_id({"estudiante_id": estudiante_id})
            
            if(anexoestudianteq.status){
                estudiante_temp.value = anexoestudianteq.estudiante
                if(anexoestudianteq.estudiante.estado == 0) enabled.value = false 
                const nacimiento_q = new Date(anexoestudianteq.estudiante.nacimiento).toLocaleDateString().split("/")
                nacimiento.value = {'day': Number(nacimiento_q[0]) ,'month': Number(nacimiento_q[1]),'year': Number(nacimiento_q[2])}
                seccion.value = 2
            }
            
        } 

        const set_seccion = (num)=>{
            seccion.value = num
            clearForm()
        }

        const guardar = async () => {

            errores.value = []

            if (!nombre.value.length || nombre.value.length > 99) { errores.value.push('ingrese nombres') }
            if (!apellido.value.length || apellido.value.length > 99) { errores.value.push('ingrese apellidos') }
            if (!identificacion.value || identificacion.value.length > 99) { errores.value.push('ingrese identificación') }
            if (nacimiento.value.day === 0) { errores.value.push('ingrese día') }
            if (nacimiento.value.month === 0) { errores.value.push('ingrese mes') }
            if (nacimiento.value.year === 0) { errores.value.push('ingrese año') }
            if (actual_sede.value.sede_id == 0) { errores.value.push('seleccione sede') }

            if(errores.value.length){
                alert(errores.value[0])
            }else{

                const estudiantestoreq = await Estudiante.store({
                    'nombres': nombre.value,
                    'apellidos': apellido.value,
                    'identificacion': identificacion.value,
                    'sede_id': actual_sede.value.sede_id,
                    'estado': 1,
                    'nacimiento': `${ nacimiento.value.year+'-'+nacimiento.value.month+'-'+nacimiento.value.day }`
                })

                if(estudiantestoreq.status){
                    Utilities.show_save('Estudiante creado');
                }
                
                clearForm()
            }

        }

        const cancelar = ()=>{
            clear_estudiante_temp()
            seccion.value = 0
        }

        const actualizar = () => {

            errores.value = []
            if(!estudiante_temp.value.nombres.length || estudiante_temp.value.length > 99){ errores.value.push('ingrese nombres') }
            if(!estudiante_temp.value.apellidos.length || estudiante_temp.value.length > 99){ errores.value.push('ingrese apellidos') }
            if(!estudiante_temp.value.identificacion || estudiante_temp.value.identificacion.length > 99){ errores.value.push('ingrese identificación') }
            if (nacimiento.value.day === 0) { errores.value.push('ingrese día') }
            if (nacimiento.value.month === 0) { errores.value.push('ingrese mes') }
            if (nacimiento.value.year === 0) { errores.value.push('ingrese año') }

            if(errores.value.length){
                alert(errores.value[0])
            }else{
                estudiante_temp.value.nacimiento = `${ nacimiento.value.year+'-'+nacimiento.value.month+'-'+nacimiento.value.day }`
                estudiante_temp.value.estado = enabled.value ? 1 : 0
                Estudiante.update(estudiante_temp.value)
                clearForm()
                cancelar()
            }

        }

        // computed
        const estudiantes_all = computed(() => Store.state.estudiantes)
        
        const estudiantes = computed(() => {

            let key = search.value.toLowerCase()
            if (key.length > 3) {
                return estudiantes_all.value.filter((e) => {
                    return (
                        e.nombres.toLowerCase().includes(key) ||
                        e.apellidos.toLowerCase().includes(key) ||
                        e.identificacion.toString().includes(key)
                    )
                })
            } else {
                return estudiantes_all.value
            }
        })

        const actual_sede = computed(() => Store.state.actual_sede)

        //# watch
        watch(enabled,(newValue,oldValue)=>{
            newValue ?  estudiante_temp.value.estado = 1 : estudiante_temp.value.estado = 0
        })

        watch(actual_sede,(newValue, oldValue)=> {
            Anexo_Estudiante.index()
        })
        
        return {
            Utilities,
            search,
            estudiantes,
            seccion,
            nombre,
            apellido,
            identificacion,
            guardar,
            formatDate,
            getBirthDate,
            nacimiento,
            clearForm,
            set_seccion,
            actualizar,
            cancelar,
            consultar_estudiante,
            estudiante_temp,
            rhs,
            generos,
            enabled,
            search_identificacion_padre,
            search_identificacion_madre,
            search_identificacion_acudiente,
            buscar_personal,
            days,
            months,
            years
        }

    },
    mounted() {
        this.$nextTick(() => {
            if (!Store.state.estudiantes.length) {
                Anexo_Estudiante.index()
            }
        })
    }
})
</script>
