<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuizStore } from '@/store/quiz'

const store = useQuizStore()
const bestScore = ref<number>(0)

onMounted(() => {
  const savedScore = localStorage.getItem('quiz-score')
  if (savedScore) {
    bestScore.value = parseInt(savedScore, 10)
  }
})

function handleStart() {
  // Use the store action to safely reset and load Level 1
  store.startNewGame()
}
</script>

<template>
  <div class="glass-panel max-w-lg w-full p-8 md:p-12 text-center relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary opacity-20 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-success opacity-20 rounded-full blur-3xl"></div>

    <div class="relative z-10 space-y-8">
      <div>
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Ultimate QCM ⚡
        </h1>
        <p class="text-slate-300 text-lg">
          Test your Vue.js & Web Dev knowledge!
        </p>
      </div>

      <div class="space-y-4 text-left glass-button p-6 !cursor-default !hover:bg-slate-700/50">
        <h3 class="font-semibold text-xl text-white mb-2">Rules:</h3>
        <ul class="text-slate-300 space-y-2 text-sm flex flex-col gap-1">
          <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-primary"></div> 5 Levels (Basics, Intermediate, Advanced, Deep Vue, Expert)</li>
          <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-warning"></div> 7 Questions per level</li>
          <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-error"></div> Passing limits: 40% 👉 60% 👉 80% 👉 100% 👉 100%</li>
          <li class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-success"></div> Global Time Limit: 5 Minutes ⏱️</li>
        </ul>
      </div>

      <div v-if="bestScore > 0" class="text-slate-400 text-sm animate-fade-in">
        👑 High Score: <span class="font-bold text-warning">{{ bestScore }} points</span>
      </div>

      <button 
        @click="handleStart"
        class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg glow-primary uppercase tracking-wider"
      >
        Start Quiz Now
      </button>
    </div>
  </div>
</template>
