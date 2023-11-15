<template>
    <Loader></Loader>
    <div class="mx-auto max-w-8xl">
    
        <div class="flex justify-between">
            
            <div class="hidden lg:block flex-col">
                <Sidebar></Sidebar>
            </div>
            
            <div class="flex-col w-full">
                <NavBar></NavBar>
                <RouterView></RouterView>
            </div>
            
        </div>
        
    </div>
</template>
  
<script setup>
import Loader from "@/components/framework/Loader.vue";

    import NavBar from "@/components/framework/Barra.vue"
    import Sidebar from "@/components/framework/Lateral.vue"  

</script>
