<script setup lang="ts">
defineProps<{
  time: string;
  isUrgent: boolean;
}>();
</script>

<template>
  <div :class="[
    'px-4 py-1.5 rounded-xl font-mono font-bold flex items-center gap-2 border transition-all duration-300',
    isUrgent 
      ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse glow-error' 
      : 'bg-slate-800/80 text-blue-400 border-slate-700 shadow-lg'
  ]">
    <span class="text-lg">⏱️</span>
    <span class="text-xl tabular-nums">{{ time }}</span>
  </div>
</template>
