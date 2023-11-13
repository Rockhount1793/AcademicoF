<template>
    <main v-if="StoreAplication.state.loading" class="absolute w-auto h-auto z-20">

        <div class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-400 opacity-75"></div>
        </div>

        <div class="fixed inset-0 grid grid-cols-1 content-center">
            <div class="mx-auto w-20">
                <span class="loader"></span>
            </div>
        </div>

    </main>
</template>

<script lang="js">

import { defineComponent } from "vue"
import StoreAplication from '@/store/Aplicacion'
export default defineComponent({
  name: 'Loader',
  setup(){
    return{
      StoreAplication
    }
  }
})

</script>

<style scoped>

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #FFF #FFF transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent #db2777 #db2777;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: 32px;
  height: 32px;
  border-color: #FFF #FFF transparent transparent;
  animation: rotation 1.5s linear infinite;
}
    
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
    
</style>