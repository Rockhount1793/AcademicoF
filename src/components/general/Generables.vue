
<template>

    <div id="contenedor_principal" style="height:min-content;">

    
        <!-- CONTENEDOR DE DATOS SOLICITADOS PARA GENERAR CERTIFICADO DE ESTUDIO -->
        <div id="div_certificado_datos" style="visibility: hidden; height: 0px;" >
            <!-- Titulo -->
            <div class="w-full text-center pt-5">
                <p class="font-semibold text-gray-500 text-md">CERTIFICADO DE ESTUDIO</p>
            </div>

            <!-- Contenedor Nombre del Estudiante -->
            <div class="w-full px-4 py-5">
            
                <!-- Contenedor Nombre del Estudiante -->
                <div class="w-full border px-2 py-3 rounded">
                    <p class="font-semibold text-gray-500 text-md">Generando certificado a:</p>
                </div>

                <div class="w-full border px-2 py-3 rounded">
                    <p id="p_certificado_datos_nombre_estudiante" class="font-semibold text-gray-500 text-md">Estudiante</p>
                </div>

            </div>
            <!-- 
            Contenedor datos solicitados
            -->
            <div class="w-full px-4 mt-5">

                <!-- Fecha del certificado -->
                <div class="w-full">
                    <p class="mx-2 font-semibold text-gray-500 text-md">Fecha del certificado</p>
                    <input id="datos_constancia_estudio_fecha" required type="date" class="mx-2 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                    <!-- <input @click="Store.state().actual_datos_certificado_estudio.fecha ='Hola'" type="date" class="mx-2 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        -->
                </div>
            
                <!-- Razón del certificado -->
                <div class="w-full mt-3">
                    <p class="mx-2 font-semibold text-gray-500 text-md">Razón del certificado</p>
                    <!-- <input @click="Store.state().actual_datos_certificado_estudio.razon = 'Razon'" type="text" class="mx-2 w-64 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    -->
                    <input id="datos_constancia_estudio_razon" required type="text" value="" class="mx-2 w-64 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">

                </div>

            </div>

            <!-- Contenedor botón Generar Certificado -->
            <div class="w-full px-6 mt-5">
                <button @click="generar_certificado_estudio()" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center">
                Generar Certificado
                </button>
                <button @click="cancelar_certificado_estudio()" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center mx-4">
                Cancelar
                </button>
            </div>
        </div>

        <!-- CONTENEDOR DE SELECCION DEL DIRECTOR DE CURSO QUE VA A APARECER EN EL GENERABLE -->
        <!-- <div id="div_seleccion_director" style="visibility: hidden; height: 0px;" > -->
        <div id="div_seleccion_director" style="visibility: hidden; height: 0px;" >
            
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
                    <SelectorDirector className="seldir" id="selector_director_generable" @set_director="set_director" @reset_director="reset_director" class="mx-auto"></SelectorDirector>
                </div>
            </div>
            
            <!-- Contenedor botón Generar -->
            <div class="w-full px-6 mt-5">
                <button @click="generar_archivo()" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center">
                Generar
                </button>
                <button @click="volver_generar_archivo()" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center mx-4">
                Volver
                </button>
            </div>

            <label id="labelResultado" style="visibility: hidden">{{ actual_generable.nombre }} generado exitosamente</label>

        </div>

        <!-- CONTENEDOR DE OPCIONES PARA GENERARBLES -->
        <div class="" id="div_generables_grado" style="visibility: visible; height: auto;">
            
            <div class="mt-2 min-h-full w-auto px-2 md:space-x-2">

                <div class="ml-2 p-1 rounded border border-gray-300 h-auto">

                    <p class="text-gray-500 mt-3 text-center font-semibold text-lg">Generables Grado <span v-if="actual_grado.grado_id > 0">{{actual_grado.nombre}} </span></p>

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
                            <button v-if="actual_generable.recurso < 10" @click="pedir_director_curso()" class="mx-auto w-64 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                <p class="capitalize">Descargar {{ actual_generable.nombre }}</p>
                            </button>

                            <!-- si el recurso es entre rango 11 - 20 REQUIERE selección de estudiante  -->
                            <div v-else-if="actual_generable.recurso > 10" class="mx-auto w-96 bg-pink-700 shadow-pink-500 shadow-md rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                <p class="">Seleccione el estudiante a generar el <span class="capitalize">{{ actual_generable.nombre }}</span></p>
                            </div>

                            <p v-else class="text-pink-600 w-full text-center leading-6 font-semibold text-md">
                                Por favor elija en todos los campos...
                            </p>

                        </div>
                        
                    </div>

                    <!-- Matriculas -->
                    <div v-if="seccion == 0" class="overflow-y-auto">

                        <div class="px-0 sm:px-2 lg:px-4">

                            <div v-if="!matriculas.length" class="sm:flex sm:items-center">
                                <p class="px-2 font-semibold text-gray-500"> No hay matriculas creados</p>
                            </div>

                            <div v-else class="mt-2">
                                <div class="overflow-x-auto">
                                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table class="min-w-full border divide-y divide-gray-300 mb-4">
                                            
                                            <thead>
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
                                                <tr v-for="(matri, index) in matriculas" :key="index+10">

                                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div class="flex items-center">
                                                            <div class="h-10 w-10 flex-shrink-0">
                                                                <img class="h-10 w-10 rounded-full ml-2" :src="urlsf + '/images/avatar/' + firstLetter(matri.nombres) + '.png'" alt="estudiante.nombres" />
                                                            </div>
                                                            <div class="ml-6">
                                                                <div class="font-medium text-base text-gray-900 capitalize">{{ matri.nombres + " " + matri.apellidos  }}</div>
                                                                <div class="text-gray-500">ID: {{ matri.identificacion }}</div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td class="whitespace-nowrap px-3 py-4 text-sm">
                                                        <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5" :class="matri.estudiante_estado ? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'">{{ matri.estudiante_estado ? 'Activo':'Inactivo'  }} </span>
                                                    </td>

                                                    <td v-if="actual_generable.recurso > 10" class="text-sm w-52">
                                                        <button @click="pedir_datos_certificado_estudio(matri)" class="my-1 w-full px-2 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
                                                            Certificado de Estudio
                                                        </button>
                                                        <button @click="generar_certificado_notas(matri)" class="my-1 w-full px-2 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-md">
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
    import SelectorGenerable from "@/components/framework/Selector_Generable.vue"
    import Nuevo_Certificado from "@/components/framework/Nuevo_Certificado.vue"
    import { RouterView } from "vue-router"
    import { watchEffect, watch, ref, defineComponent, computed } from "vue"
    import Store from "@/store"
    import Router from "@/router"
    import Aplicacion from "@/controllers/Aplicacion"
    import Matricula from "@/controllers/Matricula"
    import Generable from "@/controllers/Generable"
    import Utilitie from "@/utilities"

  
    export default defineComponent({
    
        'name':'Generables',

        'components':{
            Barra, Lateral, SelectorDirector, SelectorGrado, SelectorPeriodo, SelectorGenerable, Nuevo_Certificado
        },

        setup(){
        
            //# data
            let seccion = ref(0)
            let errores = ref([])

            let Matricula_Global
            let director_id
            //# methods
            
            //GENERAR BOLETINES
            const generar_boletines = ()=>{
                if(actual_periodo.value.periodo < 5){
                    Generable.boletin_todos_file(()=>{ })
                }else if(actual_periodo.value.periodo == 5){
                    Generable.boletin_final_todos_file(()=>{ })
                }
            }

            //GENERAR INFORME FINAL
            const generar_informe = ()=>{
                if(actual_periodo.value.periodo == 5){
                    Generable.informe_final_todos_file(()=>{ })
                }
            }

            //GENERAR PLANILLA
            const generar_planilla = ()=>{
                if (actual_periodo.value.periodo < 5) {
                    Generable.planilla_file(() => { })
                }
            }
            
            //GENERAR CERTIFICADO
            const generar_certificado = (matricula)=>{
                if(actual_periodo.value.periodo < 5){
                    alert("En construcción!")
                    //Generable.certificado_estudio_file(matricula,()=>{ })
                } else if(actual_periodo.value.periodo == 5){
                    Generable.certificado_final_file(matricula,()=>{ })
                }
            }
            
            const mostrar_seleccion_director = () => {
                //let actual_generable_director = { 'docente_id': 0 }
                //Store.commit('set_actual_generable_director', actual_generable_director)
               
                //let selector_director_generable = document.getElementById('selector_director_generable').value
                //selector_director_generable.setup(0)

                document.getElementById('div_seleccion_director').style.visibility = 'visible';
                document.getElementById('div_seleccion_director').style.height = 0;

                document.getElementById('div_generables_grado').style.visibility = 'hidden';
                document.getElementById('div_generables_grado').style.height = 0
                document.getElementById('div_generables_grado').style.height = 'auto';

            }

            const ocultar_seleccion_director = () => {
                document.getElementById('div_seleccion_director').style.visibility = 'hidden';
                document.getElementById('div_seleccion_director').style.height = 0;

                document.getElementById('div_generables_grado').style.visibility = 'visible';
                document.getElementById('div_generables_grado').style.height = 0
                document.getElementById('div_generables_grado').style.height = 'auto';

            }
            
            const volver_generar_archivo = () => {
                ocultar_seleccion_director()
            }
            
            const mostrar_datos_certificado_estudio = () => {

                document.getElementById('div_generables_grado').style.visibility = 'hidden'
                document.getElementById('div_generables_grado').style.height = 0

                document.getElementById('div_certificado_datos').style.visibility = 'visible'
                document.getElementById('div_certificado_datos').style.height = 'auto'
                
                document.getElementById('p_certificado_datos_nombre_estudiante').textContent = Matricula_Global.nombres + " " + Matricula_Global.apellidos
                document.getElementById('datos_constancia_estudio_fecha').value = ""
                document.getElementById('datos_constancia_estudio_razon').value = ""

            }
            
            const ocultar_datos_certificado_estudio = () => {

                document.getElementById('div_certificado_datos').style.visibility = 'hidden';
                document.getElementById('div_certificado_datos').style.height = 0;

                document.getElementById('div_generables_grado').style.visibility = 'visible';
                document.getElementById('div_generables_grado').style.height = 0
                document.getElementById('div_generables_grado').style.height = 'auto';

            }

            const cancelar_certificado_estudio = () => {
                ocultar_datos_certificado_estudio()
            }

            const pedir_director_curso = (() => {
                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }
                if (!errores.value.length) {
                    //Mostrar div_seleccion_director
                    console.log("Generando el Certificado de estudio...")
                    
                    //document.getElementById('labelResultado').style.visibility = 'hidden'
                    //document.getElementById('selector_director_generable').value = ""
                    switch (actual_generable.value.recurso) {
                        // rango 1-10
                        case 1: 
                            mostrar_seleccion_director();
                        break;
                        case 2: 
                            if(actual_periodo.value.periodo < 5){
                                alert("Para generar el informe final por favor seleccione el Periodo '5. Final'")
                            }else if(actual_periodo.value.periodo == 5){
                                mostrar_seleccion_director()
                            }
                        break;
                        case 3: 
                            if (actual_periodo.value.periodo == 5) {
                                alert("Para generar la planilla por favor seleccione un periodo de 1 a 4")
                            }
                            else
                                generar_planilla()
                        break;
                    }
                    

                } else {
                    alert(errores.value[0])
                }
            })
            
            const pedir_datos_certificado_estudio = (matricula => {
                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }

                if (!errores.value.length) {
                    //Mostrar div_datos_certificado_estudio
                    Matricula_Global = matricula
                    console.log("Generando el Certificado de estudio...")

                    mostrar_datos_certificado_estudio()
                } else {
                    alert(errores.value[0])
                }

            })

            const generar_certificado_estudio = () => {

                errores.value = []
                if (!matriculas.value.length) { errores.value.push('No hay matriculas creadas!') }
                if (actual_sede.value.sede_id === 0) { errores.value.push('Seleccione sede') }
                if (actual_lectivo.value.lectivo_id === 0) { errores.value.push('Seleccione lectivo') }
                if (actual_grado.value.grado_id === 0) { errores.value.push('Seleccione grado') }
                if (actual_periodo.value.periodo === 0) { errores.value.push('Seleccione periodo') }
                if (actual_generable.value.recurso === 0) { errores.value.push('Seleccione generable') }

                if (!errores.value.length) {
                    if (actual_periodo.value.periodo < 5) {
                        console.log("Generando el Certificado de estudio...")

                        //Capturar datos de interfaz 
                        let fecha_constancia_estudio = document.getElementById('datos_constancia_estudio_fecha').value
                        let razon_constancia_estudio = document.getElementById('datos_constancia_estudio_razon').value

                        //Validar datos de interfaz
                        if(fecha_constancia_estudio === "")
                        {
                            alert("La fecha del certificado de estudio es requerida, por favor seleccione una fecha!")
                        }else if(razon_constancia_estudio === "")
                        {
                            alert("La razón del certificado de estudio es requerida, no puede ser un texto vacío. Por favor digite la razón del certificado!")
                        }
                        else{
                            //Generar certificado
                            let datos_certificado_estudio = { 'razon': razon_constancia_estudio, 'fecha': fecha_constancia_estudio }
                            Store.commit('set_actual_datos_certificado_estudio', datos_certificado_estudio)
                            
                            Generable.certificado_estudio_file_front(Matricula_Global, () => { })
                        }

                    }
                    if (actual_periodo.value.periodo == 5) {
                        Generable.certificado_final_file(matricula, () => { })
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
                    generar_certificado(matricula);
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

                    //Validar selección
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
                        Generable.boletin_estudiante_file(json,()=>{ })
                    }

                    if(actual_periodo.value.periodo == 5){
                        alert('boletín final')
                    }

                }else{
                    alert(errores.value[0])
                }
            }

            const generar_estudiante_vista = (json)=>{

                errores.value = []

                if(actual_sede.value.sede_id === 0){ errores.value.push('Seleccione sede') }
                if(actual_lectivo.value.lectivo_id === 0){ errores.value.push('Seleccione lectivo') }
                if(actual_grado.value.grado_id === 0){ errores.value.push('Seleccione grado') }
                if(actual_periodo.value.periodo === 0){ errores.value.push('Seleccione periodo') }
                if(actual_generable.value.recurso === 0){ errores.value.push('Seleccione generable') }

                //generar_archivo
                if(!errores.value.length){

                    if(actual_periodo.value.periodo < 5){
                        
                        Generable.boletin_estudiante_vista(json,()=>{

                            Router.push({ name: "Boletin" })

                        })

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
                return Utilitie.format_tnumber(number)
            }
      
            const firstLetter = (name)=>{
                return name.charAt(0).toLowerCase() || 'default'
            }

            const verfificar_matriculas = ()=>{
                
                if(matriculas.value.length && (matriculas.value[0].grado_id != actual_grado.value.grado_id) || !matriculas.value.length){
                                    
                    Matricula.index(()=>{})
            
                }
            }
           
            //# computed
            const urlsf = computed(()=> Store.state.urlsf )
            const estudiantes = computed(()=> Store.state.estudiantes )
            const matriculas = computed(()=> Store.state.matriculas )
            const actual_sede = computed(()=> Store.state.actual_sede )
            const actual_lectivo = computed(()=> Store.state.actual_lectivo )
            const actual_periodo = computed(()=> Store.state.actual_periodo )
            const actual_grado = computed(()=> Store.state.actual_grado )
            const actual_generable = computed(()=> Store.state.actual_generable )

            watch(actual_grado,(value) => {

                if(value.grado_id > 0 && actual_sede.value.sede_id > 0 && actual_lectivo.value.lectivo_id > 0) {
                    Matricula.index(()=>{})
                }
                
            })

            return {
                urlsf,
                generar_archivo,
                generar_boletines,
                generar_informe,
                generar_estudiante_pdf,
                generar_estudiante_vista,
                pedir_director_curso,
                volver_generar_archivo,
                pedir_datos_certificado_estudio,
                cancelar_certificado_estudio,
                generar_certificado_estudio,
                generar_certificado_notas,
                actual_sede,
                actual_lectivo,
                actual_grado,
                actual_periodo,
                actual_generable,
                matriculas,
                seccion,
                filter_estudiante,
                filter_identificacion,
                firstLetter,
                verfificar_matriculas
            }

        },
    
        mounted(){
            
            this.$nextTick(()=>{
                
                Aplicacion.check_login(()=>{
                    this.verfificar_matriculas()
                })

            })

        }
  
    })
  
</script>