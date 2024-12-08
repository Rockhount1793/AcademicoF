<script lang="ts">
export default {
  name: "BaseIcon",
}
</script>

<script setup lang="ts">
import { computed, ref } from "vue"
import type { Ref, ComputedRef } from "vue"

interface Icon {
  [key: string]: string
}

const props = defineProps({
  name: {
    type: String,
    default: ""
  },
  fill: {
    type: String,
    default: "none",
  },
  color: {
    type: String,
    default: "black",
    required: true
  },
  size: {
    type: Number,
    default: 1.5
  },
})

const paths: Ref<Icon> = ref({
  arrowLeft: "M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5",
  arrowRight: "M3 12h18m0 0l-8.5-8.5M21 12l-8.5 8.5",
  calendar:"M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 002 2h14a2 2 0 002-2v-9H3zM3 10V6a2 2 0 012-2h2M7 2v4M21 10V6a2 2 0 00-2-2h-.5",
  close:"M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243",
  chevronLeft: "M15 6l-8 8 8 8",
  chevronRight: "M9 6l6 6-6 6",
  mayor:"M7.54607 15.2233L13.9848 10.602C14.0885 10.5275 14.1718 10.4351 14.2289 10.3311C14.286 10.2271 14.3155 10.114 14.3155 9.99957C14.3155 9.88513 14.286 9.77204 14.2289 9.66806C14.1718 9.56409 14.0885 9.47168 13.9848 9.39719L7.54607 4.77583C6.93149 4.33479 5.98218 4.70045 5.98218 5.37821L5.98218 14.6223C5.98218 15.3 6.93149 15.6657 7.54607 15.2233Z"
})

const path: ComputedRef<string> | string = computed(() => {
  if (paths.value[props.name]) return paths.value[props.name]

  return ""
})
const strokeWidth = computed(() => {
  return 24 / (props.size * 15)
})
</script>

<template>
  <svg
    :class="color"
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
    }"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :fill="fill"
    stroke="currentColor"
    viewBox="0 0 25 25"
  >
    <path clip-rule="evenodd" :d="path" />
  </svg>
</template>