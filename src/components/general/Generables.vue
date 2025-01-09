
<template>
    <div class="mt-2 h-[90%] pb-2 flex w-auto lg:px-2">
        
        <!-- CONTENEDOR DE OPCIONES PARA GENERARBLES -->
        <div v-if="seccion==0" id="div_generables_grado" class="w-full h-full">
            <div class="rounded border border-gray-300 h-full">

                <p class="text-gray-500 mt-3 text-center font-semibold text-lg">
                    Generables Grado <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span>
                </p>

                <hr class="mt-3 border border-gray-200" />

                <div class="flex flex-1 py-2 mx-auto">

                    <div class="flex-1 lg:flex px-2 lg:px-10 lg:space-x-10">
                        
                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md">Grado</p>
                            <SelectorGrado class="mx-auto w-full"></SelectorGrado>
                        </div>
                        
                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md">Periodo</p>
                            <SelectorPeriodo class="mx-auto w-full"></SelectorPeriodo>
                        </div>

                        <div class="flex-1 mt-2">
                            <p class="font-semibold text-gray-500 text-md">Generable</p>
                            <SelectorGenerable class="mx-auto w-full"></SelectorGenerable>
                        </div>

                    </div>

                </div>

                <div class="block">

                    <div class="mt-3 flex items-center mx-auto">
                        <!-- si el recurso es entre rango 1 - 10 NO REQUIERE selección de estudiante  -->
                        <!-- 
                        <button v-if="actual_generable.recurso < 10" @click="pedir_director_curso()" class="mx-auto w-64 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                        -->
                        <!-- VALIDACIONES PARA SOLICITAR DATOS -->
                        <p v-if="actual_generable.recurso == 0 || actual_periodo.periodo == 0 || actual_grado.grado_id == 0" class="text-pink-600 w-full text-center leading-6 font-semibold text-md">
                            Por favor elija todos los campos...
                        </p>
                        <p v-else-if="actual_generable.recurso == 2 && actual_periodo.periodo < 5" class="text-pink-600 w-full text-center leading-6 font-semibold text-md">
                            Para "Informe" por favor marque el periodo 5. Final ...
                        </p>
                        <p v-else-if="actual_generable.recurso == 3 && actual_periodo.periodo == 5" class="text-pink-600 w-full text-center leading-6 font-semibold text-md">
                            Para "Planilla" por favor marque un periodo entre 1 y 4 ...
                        </p>                           
                        <!--
                        Al hacer clic en el botón "Generar Boletín" o "Generar Informe" solicitar el director de curso cambiando a la sección 1
                        -->
                        <button v-else-if="(actual_generable.recurso == 1)
                                    ||(actual_generable.recurso == 2 && actual_periodo.periodo == 5)"
                                    @click="seccion=1" class="mx-auto w-64 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                            <p class="capitalize">Descargar {{ actual_generable.nombre }}</p>
                        </button>
                        <!-- Al hacer clic en el botón "Generar planilla" generar el archivo de planilla: -->
                        <button v-else-if="(actual_generable.recurso == 3 && actual_periodo.periodo < 5)"
                                    @click="generar_planilla()" class="mx-auto w-64 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                            <p class="capitalize">Descargar {{ actual_generable.nombre }}</p>
                        </button>

                        <!-- si el recurso es entre rango 11 - 20 REQUIERE selección de estudiante  -->
                        <div v-else-if="actual_generable.recurso > 10" class="mx-auto w-96 bg-pink-700 shadow-pink-500 shadow-md rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                            <p class="">Seleccione el estudiante a generar el <span class="capitalize">{{ actual_generable.nombre }}</span></p>
                        </div>

                    </div>
                    
                </div>

                <!-- Matriculas -->
                <div v-if="seccion == 0" class="mt-3 px-4 sm:px-6 lg:px-8 h-full">

                    <div v-if="!matriculas.length" class="sm:flex sm:items-center">
                        <p class="px-2 font-semibold text-gray-500"> No hay matriculas creadas</p>
                    </div>

                    <div v-else class="mt-0 h-[75%] overflow-y-auto">
                        <div class="px-4 lg:px-6">
                            <table class="min-w-full border divide-y divide-gray-300 mb-4">
                                <thead class="sticky h-10 top-0 shadow bg-white">
                                    <tr>
                                        <th scope="col" class="px-3 py-1 border text-left text-sm font-semibold text-gray-900">
                                            Nombres
                                        </th>
                                        <th scope="col" class="px-3 py-1 border text-left text-sm font-semibold text-gray-900">
                                            Estado
                                        </th>
                                        <th v-if="actual_generable.recurso > 10" scope="col" class="px-3 py-1 border text-sm font-semibold text-pink-700 text-center capitalize">
                                            Generar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(matricula, index) in matriculas" :key="index+10">
                                        <td class="py-4 pl-4 pr-3 text-sm sm:pl-0">
                                            <div class="flex items-center">
                                                <div class="h-10 w-10 flex-shrink-0">
                                                    <img class="h-10 w-10 rounded-full ml-2" :src="'/images/avatar/'+Utilities.firstLetter(matricula.nombres)+'.png'" alt="avatar" />
                                                </div>
                                                <div class="ml-6">
                                                    <div class="font-medium text-base text-gray-900 capitalize">{{ matricula.nombres + " " + matricula.apellidos  }}</div>
                                                    <div class="text-gray-500">ID: {{ matricula.identificacion }}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-3 py-4 text-sm">
                                            <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="matricula.estudiante_estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ matricula.estudiante_estado ? 'Activo':'Inactivo'  }} </span>
                                        </td>
                                        <td v-if="actual_generable.recurso > 10" class="text-sm w-52">
                                            <button @click="seccion=2;Matricula_Global=matricula" class="my-1 w-full px-2 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                                Certificado de Estudio
                                            </button>
                                            <button @click="generar_certificado_notas(matricula)" class="my-1 w-full px-2 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                                Certificado de Notas
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

        <!-- CONTENEDOR DE SELECCION DEL DIRECTOR DE CURSO QUE VA A APARECER EN EL GENERABLE -->
        <!-- <div id="div_seleccion_director" style="visibility: hidden; height: 0px;" > -->
        <div v-if="seccion==1" id="div_seleccion_director" >
            
            <!-- Titulo -->
            <div class="w-full text-center pt-5">
                <!-- Texto de descripcion de archivo a generar-->
                <p class="font-semibold text-gray-500 text-md " style="text-transform: uppercase;">GENERANDO {{ actual_generable.nombre }}</p>
            </div>

            <!-- Contenedor Texto descripción-->
            <div class="w-full px-4 mt-5">
                <p class="font-semibold text-gray-500 text-md">Seleccione el director de curso</p>
            </div>

            <!-- Contenedor datos solicitados-->
            <div class="w-full px-4 mt-5">
                <!-- Director de curso -->
                <div class="w-80 mt-3">
                    <p class="mx-2 font-semibold text-gray-500 text-md">Director de curso</p>
                    <SelectorDirector @set_director="set_director()" class="mx-auto"></SelectorDirector>
                </div>
            </div>
            
            <div class="w-full px-4 mt-5">

            <!-- Fecha del boletin -->
            <div v-if="actual_periodo.nombre == 'Final' && actual_generable.nombre == 'boletín'" class="w-full">
                <p class="mx-2 font-semibold text-gray-500 text-md">Fecha del Boletin</p>
                <input id="fecha_boletin" @change="set_fecha_boletin" required type="date" class="mx-2 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            </div>

            </div>

            <!-- Contenedor botón Generar -->
            <div class="w-full px-6 mt-5">
                <button @click="generar_archivo(matri)" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded h-7 leading-6 text-gray-100 font-semibold text-center">
                Generar
                </button>
                <button @click="seccion = 0;clearform()" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded h-7 leading-6 text-gray-100 font-semibold text-center mx-4">
                Volver
                </button>
            </div>

            <label id="labelResultado" style="visibility: hidden">{{ actual_generable.nombre }} generado exitosamente</label>

        </div>

        <!-- CONTENEDOR DE DATOS SOLICITADOS PARA GENERAR CERTIFICADO DE ESTUDIO -->
        <div v-if="seccion==2" class="mx-auto w-1/2" id="div_certificado_datos">
            <!-- Titulo -->
            <div class="w-full text-center pt-5">
                <p class="font-semibold text-gray-500 text-md">CERTIFICADO DE {{ tipo_certificado }}</p>
            </div>

            <!-- Contenedor Nombre del Estudiante -->
            <div class="w-full px-4 py-5">
            
                <!-- Contenedor Nombre del Estudiante -->
                <div class="w-full border px-2 py-3 rounded">
                    <p class="font-semibold text-gray-500 text-md">Estudiante: 
                    <span class="font-semibold text-indigo-500 capitalize text-md">{{Matricula_Global.nombres}} {{Matricula_Global.apellidos}}</span>
                    </p>
                </div>

            </div>
            <!-- 
            Contenedor datos solicitados
            -->
            <div class="w-full px-4 mt-5">

                <!-- Fecha del certificado -->
                <div class="w-full">
                    <p class="mx-2 font-semibold text-gray-500 text-md">Fecha del certificado:</p>
                    <input id="datos_constancia_estudio_fecha" @change="(e)=>set_fecha_certificado_estudio(e.target.value)" required type="date" class="mx-2 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                </div>
            
                <!-- Razón del certificado -->
                <div class="w-full mt-3">
                    <p class="mx-2 font-semibold text-gray-500 text-md">Razón del certificado:</p>
                    <input id="datos_constancia_estudio_razon" @change="(e)=>set_razon_constancia_estudio(e.target.value)" required type="text" class="mx-2 w-full font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                </div>

            </div>

            <!-- Contenedor botón Generar Certificado -->
            <div class="w-full px-6 mt-10 flow-root ">
                <button @click="seccion = 0;clearform()" class="float-left w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-white font-semibold mx-4">
                    Volver
                </button>

                <button @click="generar_certificado_estudio(Matricula_Global);" class="float-right w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold">
                    Generar Certificado
                </button>
            </div>
        </div>

    </div>  
</template>
  
<script lang="js">
    import { watchEffect, watch, ref, defineComponent, computed } from "vue"
    import Navbar from "@/components/framework/Navbar.vue"
    import Lateral from "@/components/framework/Lateral.vue"
    import SelectorDirector from "@/components/framework/Selector_Docente.vue"
    import SelectorGrado from "@/components/framework/Selector_Grado.vue"
    import SelectorPeriodo from "@/components/framework/Selector_Periodo.vue"
    import SelectorGenerable from "@/components/framework/Selector_Generable.vue"
    import Nuevo_Certificado from "@/components/framework/Nuevo_Certificado.vue"
    import Store from "@/store"
    import Matricula from "@/controllers/Matricula"
    import Generable from "@/controllers/Generable"
    import Utilities from "@/utilities"

    export default defineComponent({
        'name':'Generables',
        'components':{
            Navbar, Lateral, SelectorDirector, SelectorGrado, SelectorPeriodo, SelectorGenerable, Nuevo_Certificado
        },
        setup(){
        
            //# data
            let seccion = ref(0)
            let errores = ref([])

            let Matricula_Global = ref(undefined)
            let fecha_constancia_estudio = ref("")
            let razon_constancia_estudio = ref("")
            let fecha_certificado_estudio = ref("")
            let fecha_boletin = ""
            let director_id = 0
            let tipo_certificado = ref('')
            //# methods
            
            const clearform = ()=>{
                director_id = 0
                Store.commit('set_actual_generable_director',{"docente_id":director_id })
                set_tipo_certificado('')
                if(tipo_certificado==='ESTUDIO') set_fecha_constancia_estudio("")
                if(tipo_certificado==='NOTAS') set_fecha_constancia_estudio("")
                if(tipo_certificado==='ESTUDIO') set_razon_constancia_estudio("")
                Matricula_Global = undefined
            }

            //GENERAR BOLETINES
            const generar_boletines = ()=>{
                if(actual_periodo.value.periodo < 5){
                    Generable.boletin_todos_file()
                }else if(actual_periodo.value.periodo == 5){
                    Generable.boletin_final_todos_file()
                }
            }

            //GENERAR INFORME FINAL
            const generar_informe = ()=>{
                if(actual_periodo.value.periodo == 5){
                    Generable.informe_final_todos_file()
                }
            }

            //GENERAR PLANILLA
            const generar_planilla = ()=>{
                if (actual_periodo.value.periodo < 5) {
                    Generable.planilla_file()
                }
            }
            
            //GENERAR CERTIFICADO
            const generar_certificado = (matricula)=>{
                if(actual_periodo.value.periodo < 5){
                    alert("En construcción!")
                    //Generable.certificado_estudio_file(matricula)
                } else if(actual_periodo.value.periodo == 5){
                    Generable.certificado_final_file(matricula)
                }
            }
            
            const validar_datos = (() => {
                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }
                if (!errores.value.length) {
                    console.log("Datos válidos ...")
                    return true
                } else {
                    alert(errores.value[0])
                    return false
                }
            })

            const set_tipo_certificado = (tipo)=>{
                tipo_certificado.value = tipo
            }

            const set_fecha_boletin = () => {
                fecha_boletin = document.getElementById('fecha_boletin').value
            }
            const set_fecha_constancia_estudio = (fecha) => {
                fecha_constancia_estudio.value = fecha
            }
            const set_fecha_certificado_estudio = (fecha) => {
                fecha_certificado_estudio.value = fecha
            }

            const set_razon_constancia_estudio = (razon) => {
                razon_constancia_estudio.value = razon
            }

            const showAlert = ()=>{
                alert('Por favor selecciona el periodo No. 5')
            }

            const generar_certificado_estudio = (matricula) => {
                // console.log("Generando el Certificado de estudio...")
                console.log("Validando datos del Certificado de estudio...")
                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }

                if (!errores.value.length) {
                    if (actual_periodo.value.periodo <= 5) {

                        //Validar datos de interfaz
                        if(fecha_certificado_estudio.value === "")
                        {
                            alert("La fecha del certificado de estudio es requerida, por favor seleccione una fecha!")
                        }else if(razon_constancia_estudio.value === "")
                        {
                            alert("La razón del certificado de estudio es requerida, no puede ser un texto vacío. Por favor digite la razón del certificado!")
                        }
                        else{
                            //Generar certificado
                            Store.commit('set_actual_datos_certificado_estudio', { 'razon': razon_constancia_estudio.value, 'fecha': fecha_certificado_estudio.value })                            
                            Generable.certificado_estudio_file_front(matricula)
                        }

                    }
                    if (actual_periodo.value.periodo == 5) {
                        Generable.certificado_final_file(matricula)
                    }
                } else {
                    alert(errores.value[0])
                }
            }

            const generar_certificado_notas = (matricula) => {
                
                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }

                if (!errores.value.length) {
                    //Validar datos de interfaz
                    
                    if(fecha_constancia_estudio.value === "")
                        {
                            alert("La fecha del certificado de notas es requerida, por favor seleccione una fecha!")
                        }else{
                            //Generar certificado

                            let datos_certificado_notas = {'fecha': fecha_constancia_estudio.value }
                            Store.commit('set_actual_datos_certificado_notas', datos_certificado_notas)
                            
                            generar_certificado(matricula)
                        }
                } else {
                    alert(errores.value[0])
                }

            }

            const generar_archivo = (matricula)=>{

                errores.value = []
                if(!matriculas.value.length){ errores.value.push('No hay matriculas creadas!') }
                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }
                
                if(!errores.value.length){
                    //Obtener id de director del Store
                    let director_id = Store.state.actual_generable_director.docente_id;
                    Matricula_Global = matricula
                    //Validar selección
                    console.log('director id', director_id)
                    if(director_id === 0)
                    {
                        alert("Director no seleccionado. Por favor seleccione un director de curso!")
                    }
                    else {
                        switch (actual_generable.value.recurso) {
                            // rango 1-10
                            case 1: generar_boletines(); break;
                            case 2: generar_informe(); break;
                            case 3: generar_planilla(); break;
                            //rango 11-20
                            case 11: generar_certificado(matricula); break;
                        }
                    }

                }else{
                    alert(errores.value[0])
                }
            }

            const generar_estudiante_pdf = (json)=>{

                errores.value = []

                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }
                
                if(!errores.value.length){
                    if(actual_periodo.value.periodo < 5){
                        Generable.boletin_estudiante_file(json)
                    }
                    if(actual_periodo.value.periodo == 5){
                        alert('boletín final')
                    }
                }else{
                    alert(errores.value[0])
                }
            }

            const filter_estudiante = (estudiante_id)=>{
                let array = estudiantes.value
                if(array.length){
                    let res = array.filter((d)=>{ return d.estudiante_id == estudiante_id })
                    return res[0].nombres +' '+ res[0].apellidos
                }else{
                    return ''
                }
            }

            const filter_identificacion = (number)=>{
                return Utilities.format_tnumber(number)
            }
      
            const verfificar_matriculas = ()=>{
                if(matriculas.value.length && (matriculas.value[0].grado_id != actual_grado.value.grado_id) || !matriculas.value.length){
                    Matricula.index()
                }
            }

            const set_director = (number)=>{ 
                director_id = number
            }

            //# computed
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> {
                
                // console.log("Actualizando matriculas...",actual_generable.value)

                if(actual_generable.value.nombre === 'boletín' || actual_generable.value.nombre === 'informe' || actual_generable.value.nombre === 'planilla'){
                    const matriculasActivas = Store.state.matriculas.filter((matri)=>{
                        return matri.estado == 1
                    })
                    // console.log("Matriculas activas: ",matriculasActivas)
                    return matriculasActivas
                }

                return Store.state.matriculas
            } )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_periodo = computed(()=> Store.state.actual_periodo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_generable = computed(()=> Store.state.actual_generable )

            // #watch
            watch(actual_grado,(value) => {
                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    Matricula.index()
                }
            })

            return {
                Utilities,
                generar_archivo,
                generar_boletines,
                generar_informe,
                generar_planilla,
                generar_estudiante_pdf,
                generar_certificado_estudio,
                generar_certificado_notas,
                actual_sede,
                actual_lectivo,
                actual_grado,
                actual_periodo,
                actual_generable,
                matriculas,
                Matricula_Global,
                fecha_constancia_estudio,
                fecha_certificado_estudio,
                razon_constancia_estudio,
                director_id,
                set_director,
                set_fecha_constancia_estudio,
                set_razon_constancia_estudio,
                set_fecha_boletin,
                seccion,
                filter_estudiante,
                filter_identificacion,
                verfificar_matriculas,
                validar_datos,
                clearform,
                tipo_certificado,
                set_tipo_certificado,
                set_fecha_certificado_estudio,
                showAlert
            }

        },
        mounted(){
            this.$nextTick(()=>{
                this.verfificar_matriculas()
            })
        }
    })
</script>