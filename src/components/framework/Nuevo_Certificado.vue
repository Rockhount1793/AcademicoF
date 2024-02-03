<template>

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
      <p class="font-semibold text-gray-500 text-md">Nombre completo del estudiante</p>
    </div>

  </div>

  <!-- Contenedor datos solicitados-->
  <div class="w-full px-4 mt-5">

    <!-- Fecha del certificado -->
    <div class="w-full">
      <p class="mx-2 font-semibold text-gray-500 text-md">Fecha del certificado</p>
      <input type="date" class="mx-2 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
    </div>
    
    <!-- Razón del certificado -->
    <div class="w-full mt-3">
      <p class="mx-2 font-semibold text-gray-500 text-md">Razón del certificado</p>
      <input type="text" class="mx-2 w-64 font-semibold text-gray-500 text-md border-gray-300 bg-white rounded cursor-pointer h-8 pl-2 pr-8 py-1  px-2 focus:outline-none shadow-md shadow-indigo-100 focus:border-indigo-500 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
    </div>

  </div>

    <!-- Contenedor botón Generar Certificado -->
  <div class="w-full px-6 mt-5">
    <button @click="generar_certificado_estudio(matri)" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center">
      Generar Certificado
    </button>
    <!--
    <button @click="cancelar_certificado_estudio(matri)" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center mx-4">
    -->
    <button @click="cancelar_certificado_estudio(matri)" class="my-1 w-60 px-4 bg-pink-700 shadow-pink-500 shadow-md cursor-pointer rounded text-center h-7 leading-6 text-gray-100 font-semibold text-center mx-4">
      Cancelar
    </button>
    </div>

</template>
  
<script setup>

  
</script>