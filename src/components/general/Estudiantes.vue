<template>
<div class="">

    <div class="mt-2 h-5/6 flex w-auto px-2 md:space-x-2">

        <div class="ml-2 p-1 rounded border border-gray-300 h-auto w-full">


            <div class="flex w-full justify-between">
                <div class="mt-4 flex space-x-2 px-2">
                    <p @click="secc.ion = 0, mode = 'list', clearForm()" :class="seccion == 0 ? 'bg-indigo-800' : 'bg-indigo-300 text-gray-500'" class="shadow-gray-200 shadow-md w-32 cursor-pointer rounded  text-center h-7 leading-6 text-gray-100 font-semibold text-md"> Lista</p>
                    <p @click="seccion = 1, mode = 'create', clearForm()" :class="seccion == 1 ? 'bg-indigo-800 text-gray-50' : 'bg-indigo-200'" class="shadow-gray-200 shadow-md w-10 cursor-pointer rounded text-center h-7 leading-6 text-gray-400 font-semibold text-md"> +</p>

                </div>

                <div class="w-1/3 mt-3 mr-4" v-if="seccion == 0">
                    <label for="search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>

                        </div>
                        <input @input="filter(0, $event.target.value)" v-model="search" id="search" name="search" class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Buscar estudiante ..." type="search" />
                    </div>
                </div>

            </div>
            <hr class="mt-3 border border-gray-200" />

            <div v-if="seccion == 0" class="mt-3 h-5/6 overflow-y-auto">
                <ul>

                    <li v-if="!estudiantes.length">
                        <p class="px-2 font-semibold text-gray-500"> No hay estudiantes creados</p>
                    </li>

                </ul>

                
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="sm:flex sm:items-center">

                    </div>
                    <div class="mt-8 flow-root">
                        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table class="min-w-full divide-y divide-gray-300 mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nombres</th>
                                            

                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estado</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">RH</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha nacimiento</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Edad</th>
                                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>

                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr v-if="!(search && search.length > 0)" v-for="estudiante in estudiantes" :key="estudiante.email">

                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(estudiante.nombres) + '.png'" alt="estudiante.nombres" />

                                                        <!-- :src="urlsf+'/images/avatar/'+user.avatar" -->
                                                    </div>
                                                    <div class="ml-6">
                                                        <div class="font-medium text-base text-gray-900 ">{{ estudiante.nombres + " " + estudiante.apellidos  }}</div>
                                                        <div class="text-gray-500">T.I: {{ estudiante.identificacion }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                       

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Activo(a)</span>
                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ estudiante.rh }}</div>

                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ formatDate(estudiante.fecha_nacimiento) }}</div>

                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getBirthDate(estudiante.fecha_nacimiento) }}</td>
                                            <td @click="editarestudiante(estudiante)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Editar</td>

                                        </tr>

                                        <tr v-else v-for="estudiante in filteredEstudiantes" :key="estudiante.id">

                                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                <div class="flex items-center">
                                                    <div class="h-10 w-10 flex-shrink-0">
                                                        <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(estudiante.nombres) + '.png'" alt="estudiante.nombres" />

                                                        <!-- :src="urlsf+'/images/avatar/'+user.avatar" -->
                                                    </div>
                                                    <div class="ml-6">
                                                        <div class="font-medium text-base text-gray-900 ">{{ estudiante.nombres + " " + estudiante.apellidos  }}</div>
                                                        <div class="text-gray-500">T.I: {{ estudiante.identificacion }}</div>
                                                    </div>
                                                </div>
                                            </td>
                                       

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Activo(a)</span>
                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ estudiante.rh }}</div>

                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div class="text-gray-900">{{ formatDate(estudiante.fecha_nacimiento) }}</div>

                                            </td>

                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ getBirthDate(estudiante.fecha_nacimiento) }}</td>
                                            <td @click="editarestudiante(estudiante)" class="whitespace-nowrap px-3 py-4 text-sm text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Editar</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                
            </div>

            <!-- Here is the Registration form for Students -->

            <div v-if="seccion == 1" class="mt-3 flex-1 lg:grid lg:grid-cols-2 gap-2 rounded p-1 px-2">

             <div class="mt-3">
                 <h5>Informacion de estudiante</h5>
                 </div>

                  <div class=""></div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                        </div>
                        <input v-model="nombre" id="nombre" type="email" name="email" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis nombres" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                        </div>
                        <input v-model="apellido" type="email" name="email" id="apellido" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Mis apellidos" />
                    </div>
                </div>


                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Identificacion</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                        <input v-model="identificacion" type="email" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1061487222" />
                    </div>
                </div>

                <div>
                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                        </svg>
                      </div>
                      <select v-model="status" name="status" id="status" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <!-- Add your status options here -->
                        <option value="1" selected>Activo</option>
                        <option value="0">Inactivo</option>
                      </select>
                    </div>
                </div>
                  

                <div>
                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900">RH</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                       <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                        </div>
                      <select v-model="rh" name="status" id="status" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <!-- Add your status options here -->
                        <option value="O+" selected>O+</option>
                        <option value="O-">O-</option>
                        <option value="O-">A+</option>
                        <option value="A+">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Fecha de Nacimiento</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>

                        </div>
                        <input v-model="fecha_nacimiento" type="date" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="3126665895" />
                    </div>
                </div>



                 <div class="mt-10">
                 <h5>Informacion de acudiente</h5>
                 </div>

                  <div class=""></div>


                <!-- Cedula acudiente -->

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Cedula</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                        <input v-model="cedula_acudiente" type="number" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1061487222" />
                    </div>
                </div>

                 <!-- Nombres acudiente -->

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                        <input v-model="nombres_acudiente" type="text" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1061487222" />
                    </div>
                </div>

                <!-- Apellidos acudiente -->

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                        <input v-model="apellidos_acudiente" type="text" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1061487222" />
                    </div>
                </div>

                 <!-- Celular acudiente -->

                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Celular</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>

                        </div>
                        <input v-model="celular_acudiente" type="number" name="email" id="identificacion" class="block w-1/2 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="1061487222" />
                    </div>
                </div>




                <div class=""></div>

                <div class="">

                    <button v-if="mode === 'create'" @click="guardar()" class="w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                        Guardar
                    </button>

                    <button v-else @click="actualizarProfesor()" class="w-32 mt-3 mb-3 h-7 shadow-md shadow-indigo-500 rounded bg-indigo-800 text-gray-50 px-2">
                        Actualizar
                    </button>

                </div>

                <div class="mb-5"></div>

            </div>


        </div>

    </div>

</div>
</template>

<script>
import Barra from '@/components/framework/Barra.vue'
import Lateral from '@/components/framework/Lateral.vue'
import { RouterView } from 'vue-router'
import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
import Store from '@/store'
import Router from '@/router'
import Aplicacion from '@/controllers/Aplicacion'
import Estudiante from '@/controllers/Estudiante'
import Utilities from '@/utilities'

import { DateTime, Settings } from "luxon";
Settings.defaultLocale = "es";

export default defineComponent({

    'name': 'Estudiantes',

    'components': {
        Barra,
        Lateral
    },

    setup() {

        //# data estudiantes
        const listado = ref(false);
        let seccion = ref(0);

        let nombre = ref('');
        let apellido = ref('');
        let identificacion = ref('');
        let errores = ref([]);
        let status = ref(1);
        let rh = ref('O+');
        let fecha_nacimiento = ref('');

        // data acudiente
            //   'cedula_acudiente': 0,
            //     'nombres_acudiente': '',
            //     'apellidos_acudiente': '',
            //     'celular_acudiente': 0,

        let cedula_acudiente = ref(0);
        let nombres_acudiente = ref('');
        let apellidos_acudiente = ref('');
        let celular_acudiente = ref(0);
        



        //# methods

        const firstLetter = (name) => {
            return name.charAt(0).toLowerCase() || 'default';
        }

        const formatDate = (date) => {
            let myDate = DateTime.fromISO(date);

            return myDate.toLocaleString({ locale: "es" , ...DateTime.DATE_FULL });   
        }

        //get the age from a date with luxon library

        function getBirthDate(date) {

            const inputDate = DateTime.fromISO(date);
            const now = DateTime.local();
            const diff = now.diff(inputDate, ['years']).toObject();
            const age = Math.floor(diff.years);

            return `${age} años`;
        }

        const clearForm = (seccionIncoming) => {

            console.log("clearForm")

            nombre.value = ''
                apellido.value = ''
                identificacion.value = ''
                seccion.value = 1
                status.value = 1
                rh.value = 'O+',
                fecha_nacimiento.value = '',
                cedula_acudiente.value = 0,
                nombres_acudiente.value = '',
                apellidos_acudiente.value = '',
                celular_acudiente.value = 0

                errores.value = []
        }


        const guardar = () => {

            errores.value = []

            if (!nombre.value.length) { errores.value.push('ingrese nombres') }
            if (!apellido.value.length) { errores.value.push('ingrese apellidos') }
            if (!identificacion.value) { errores.value.push('ingrese identificación 1') }
            if (!status.value) { errores.value.push('Seleccion estado del estudiante') }
            if (!rh.value.length) { errores.value.push('Seleccione RH de estudiante') }
            if (!fecha_nacimiento.value) { errores.value.push('Seleccione la fecha de nacimiento') }


            if (actual_sede.value.sede_id == 0) { errores.value.push('seleccione sede') }

            console.log("cedula acudiene1", cedula_acudiente)
            console.log("cedula acudiene2", cedula_acudiente.value)
            console.log("cedula acudiene3", cedula_acudiente?.length)


            if (!cedula_acudiente.value) { errores.value.push('ingrese identificación 2') }
            if (!nombres_acudiente.value) { errores.value.push('Seleccion estado del estudiante') }
            if (!apellidos_acudiente.value) { errores.value.push('Seleccione RH de estudiante') }
            if (!celular_acudiente.value) { errores.value.push('Seleccione la fecha de nacimiento') }


            console.debug("Errres", errores)


            if (errores.value.length) {
                alert(errores.value[0])
            } else {

                Estudiante.store({
                    'nombres': nombre.value,
                    'apellidos': apellido.value,
                    'identificacion': identificacion.value,
                    'sede_id': actual_sede.value.sede_id,
                    'estado': 1,
                    'rh': rh.value,
                    'fecha_nacimiento': fecha_nacimiento.value,
                    'cedula_acudiente': cedula_acudiente.value,
                    'nombres_acudiente': nombres_acudiente.value,
                    'apellidos_acudiente': apellidos_acudiente.value,
                    'celular_acudiente': celular_acudiente.value
                });

                //clearForm();

            }

        }

        const urlsf = computed(() => Store.state.urlsf)
        const actual_sede = computed(() => Store.state.actual_sede)
        const estudiantes = computed(() => Store.state.estudiantes)

        return {
            urlsf,
            listado,
            estudiantes,
            seccion,
            nombre,
            apellido,
            identificacion,
            guardar,
            firstLetter,
            formatDate,
            getBirthDate,
            status,
            rh,
            fecha_nacimiento,
            cedula_acudiente,
            nombres_acudiente,
            apellidos_acudiente,
            celular_acudiente,
            clearForm
        }

    },

    mounted() {

        this.$nextTick(() => {

            Aplicacion.check_login(() => {
                if (!Store.state.estudiantes.length) {
                    Estudiante.index()
                }
            })

        })

    }

})
</script>
