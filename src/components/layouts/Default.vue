<template>
    <Loader></Loader>
    <main class="mx-auto min-h-full h-screen max-w-[1920px]">
        <div class="flex justify-between h-screen w-full">
        
            <section class="z-30 w-64 h-screen">
                <Sidebar></Sidebar>
            </section>
            
            <div class="flex-col w-full h-screen overflow-hidden">
                <NavBar></NavBar>
                <RouterView></RouterView>
            </div>
            
        </div>
    </main>
</template>
  
<script setup>
import Loader from "@/components/framework/Loader.vue";

    import NavBar from "@/components/framework/Barra.vue"
    import Sidebar from "@/components/framework/Lateral.vue"  

</script>
