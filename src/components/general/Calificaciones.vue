<template>
<div class="h-full overflow-y-auto overflow-x-hidden">  
    <div class="rounded border border-gray-300 h-auto">

        <p class="text-gray-500 text-center mt-3 font-semibold text-lg">Calificaciones</p>

        <div class="pr-12 lg:pr-0 mt-0">
            <div class="flex-1 lg:flex">

                <div class="block mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="mx-auto w-full lg:w-1/2 font-semibold text-gray-500 text-md px-2">Grado</p>
                    <SelectorGrado class="mx-auto lg:w-1/2"></SelectorGrado>
                </div>

                <div class="block mx-auto py-2 w-full lg:w-1/2 px-2 lg:px-1">
                    <p class="mx-auto w-full lg:w-1/2 font-semibold text-gray-500 text-md px-2">Periodo</p>
                    <SelectorPeriodo class="mx-auto w-full lg:w-1/2"></SelectorPeriodo>
                </div>

            </div>
        </div>

        <hr class="mt-3 border border-gray-200" />

        <!-- Calificaciones -->
        <div class="mx-auto mt-3 max-w-7xl w-full">

            <div v-if="!matriculas_comp.length">
                <p class="px-2 font-semibold text-gray-500 mt-3"> No hay matriculas o asignaturas creadas </p>
            </div>

            <!-- tabla 4 peridos y final --->
            <div v-else class="mx-auto w-full">

                <div class="p-1 h-auto rounded px-4 overflow-y-auto relative">

                    <div class="mt-5">
                        <p class="font-semibold text-gray-500">Ingreso de Calificaciones <hr/></p>
                    </div>

                    <div style="margin-left: 150px;" class="px-1 overflow-x-auto h-auto  mb-10">
                        <table class="table border-separate">
                            <thead class="">
                                <tr class="">
                                    <th style="margin-left: -10rem;" class="pt-1 absolute h-10 w-40 text-gray-600">
                                        <div class="w-40 h-10 content-center">
                                            <p class="text-medium font-semibold">Estudiante</p>
                                        </div>
                                    </th>
                                    <th class="h-10 w-28 table-cell border-l border-gray-50 text-gray-600" :key="key" v-for="(item, index, key) in matriculas_comp[0].calificaciones">
                                        <p class="leading-4 text-xs font-semibold">{{item.nombre }}</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr class="even:bg-gray-200 odd:bg-gray-100 " :key="key" v-for="(matricula, index_1, key) in matriculas_comp">
                                    <td style="margin-left: -10rem; " class="absolute w-40 text-gray-500 font-semibold truncate text-ellipsis text-xs">
                                        <div :class="index_1 % 2 == 0 ? 'bg-white' : 'bg-gray-200'" class="h-8 border border-gray-300 rounded-md content-center">
                                            <p :title="`${matricula.nombres} ${matricula.apellidos}`" class="px-0.5 text-center truncate text-ellipsis">
                                                {{matricula.apellidos}}
                                                {{matricula.nombres}}
                                            </p>
                                        </div>
                                    </td>
                                    <td class="table-cell bg-gray-50" :key="key" v-for="(matri, index, key) in matricula.calificaciones">
                                        <input  v-if="periodo != 'nota_5'" @blur="update_calificacion(matri)" class=" w-28 h-8 text-md  font-semibold text-center border rounded-md border-gray-300  hover:bg-gray-300" :class="index_1 % 2 == 0 ? 'bg-white focus:bg-white' : 'bg-gray-200 focus:bg-gray-200'"  type="number" min="1" max="5" name="nota" v-model="matri[periodo]" id="">
                                        <button v-else class="text-center w-32 h-8 border border-gray-300 rounded-md" type="button" disabled>
                                            <span :class="matricula.nota_5[index] > 4 ? 'text-green-600' : matricula.nota_5[index] > 3 ? 'text-blue-500' : matricula.nota_5[index] > 2 ? 'text-yellow-500' : 'text-red-500'">{{ matricula.nota_5[index] }} / <strong>{{ matricula.nota_5[index] - 5 }}</strong> </span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>

    </div>
</div>
</template>

<script>
import Barra from "@/components/framework/Barra.vue"
import Lateral from "@/components/framework/Lateral.vue"
import SelectorDirector from "@/components/framework/Selector_Docente.vue"
import SelectorGrado from "@/components/framework/Selector_Grado.vue"
import SelectorPeriodo from "@/components/framework/Selector_Periodo.vue"
import { RouterView } from "vue-router"
import { watchEffect, watch, ref, defineComponent, computed, getCurrentInstance } from "vue"
import Store from "@/store"
import Router from "@/router"
import Aplicacion from "@/controllers/Aplicacion"
import Grado from "@/controllers/Grado"
import Docente from "@/controllers/Docente"
import Logro from "@/controllers/Logro"
import Matricula from "@/controllers/Matricula"
import Asignatura from "@/controllers/Asignatura"
import Calificacion from "@/controllers/Calificacion"
import Utilitie from "@/utilities"



export default defineComponent({

    'name': 'Calificaciones',

    'components': {
        Barra,
        Lateral,
        SelectorDirector,
        SelectorGrado,
        SelectorPeriodo
    },

    setup() {

        //###### data
        let errores = ref([])

        //###### methods
        const update_calificacion = (json) => {

            errores.value = []

            if (typeof Number(json.nota_1) != 'number' || Number(json.nota_1) > 5 || Number(json.nota_1) < 0) { 
                json.nota_1 = 0;
                errores.value.push('¡valor de nota primer periodo no debe ser menor a 0 o mayor a 5!') 
            }
            if (typeof Number(json.nota_2) != 'number' || Number(json.nota_2) > 5 || Number(json.nota_2) < 0) {
                json.nota_2 = 0;
                errores.value.push('¡valor de nota segundo periodo no debe ser menor a 0 o mayor a 5!') 
            }
            if (typeof Number(json.nota_3) != 'number' || Number(json.nota_3) > 5 || Number(json.nota_3) < 0) {
                json.nota_3 = 0;
                errores.value.push('¡valor de nota tercer periodo no debe ser menor a 0 o mayor a 5!') 
            }
            if (typeof Number(json.nota_4) != 'number' || Number(json.nota_4) > 5 || Number(json.nota_4) < 0) {
                json.nota_4 = 0;
                errores.value.push('¡valor de nota cuarto periodo no debe ser menor a 0 o mayor a 5!') 
            }

            if (!errores.value.length) {

                Calificacion.update(json)

            } else {

                alert(errores.value[0])

            }

        }

        

        const filter_identificacion = (number) => {
            return Utilitie.format_tnumber(number)
        }

        const verfificar_matriculas = ()=>{
                
            if(matriculas.value.length && (matriculas.value[0].grado_id != actual_grado.value.grado_id) || !matriculas.value.length){
                                    
                Matricula.index(()=>{})
            
            }
        }

        //###### computed
        const calificaciones = computed(() => Store.state.calificaciones)
        const matriculas = computed(() => Store.state.matriculas)
        const actual_sede = computed(() => Store.state.actual_sede)
        const actual_lectivo = computed(() => Store.state.actual_lectivo)
        const actual_grado = computed(() => Store.state.actual_grado)
        const actual_asignatura = computed(() => Store.state.actual_asignatura)
        const actual_periodo = computed(() => { return Store.state.actual_periodo })

        const periodo = computed(() => {

            let periodos = {
                1: 'nota_1',
                2: 'nota_2',
                3: 'nota_3',
                4: 'nota_4',
                5: 'nota_5'
            }
            return periodos[actual_periodo.value.periodo]
        })

        const matriculas_comp = computed(() => {

            let calificaciones_all = calificaciones.value
            let matriculas_all = matriculas.value

            let m_comp = []

            if (matriculas_all.length && calificaciones_all.length) {

                for (let index = 0; index < matriculas_all.length; index++) {

                    let calificaciones_filter = calificaciones_all.filter((c) => c.estudiante_id == matriculas_all[index].estudiante_id)

                    let nota_5 = calificaciones_filter.map((c) => {
                        return (c.nota_1 + c.nota_2 + c.nota_3 + c.nota_4)/4
                    }).reverse()

                    let registro = { ...matriculas_all[index], 'nota_5': nota_5, 'calificaciones': calificaciones_filter.sort(function (x, y) { return y.asignatura_id - x.asignatura_id }) }
                    m_comp.push(registro)

                }

            }

            return m_comp

        })

        //###### watch
        watch(actual_grado, (value) => {
            if (value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                Matricula.index(() => {})
            }
        })

        watch(matriculas, (value) => {
            if (value.length && actual_grado.value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                Calificacion.index_matriculas(() => {
                    Store.commit('set_actual_periodo', { 'periodo': 1, 'nombre': 'Primero' })
                })
            }
        })

        return {
            periodo,
            matriculas,
            calificaciones,
            matriculas_comp,
            actual_lectivo,
            actual_asignatura,
            actual_grado,
            filter_identificacion,
            update_calificacion,
            verfificar_matriculas

        }

    },

    mounted() {

        this.$nextTick(() => {

            Aplicacion.check_login(() => {

                this.verfificar_matriculas()

                if (Store.state.matriculas.length && Store.state.actual_sede.sede_id > 0 && Store.state.actual_grado.grado_id > 0 && Store.state.actual_lectivo.lectivo_id > 0) {

                    Calificacion.index_matriculas(() => {
                        Store.commit('set_actual_periodo', { 'periodo': 1, 'nombre': 'Primero' })
                    })

                }

            })

        })

    }

})
</script>

<style scoped>

</style>
