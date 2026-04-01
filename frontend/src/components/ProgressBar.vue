<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="w-full bg-slate-700/50 rounded-full h-2.5 mb-1 overflow-hidden shadow-inner">
    <div 
      class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
