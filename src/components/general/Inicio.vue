<template>
    <div class="w-full flex justify-center">
        <div class="h-5 p-5">
            <h5>Hola! 👋🏻, Esta es la version 3.0 de <strong>Academic</strong>.</h5>
            <br>
            <p class="">Si encuentra algún problema por favor contactarse al siguiente Whatsapp : 312 666 5895</p>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue"    
import Aplicacion from "@/controllers/Aplicacion"

export default defineComponent({
mounted(){
    this.$nextTick(()=>{
        Aplicacion.check_login(()=>{
        })
    })
}
})
</script>
