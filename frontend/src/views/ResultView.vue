<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/store/quiz'
import { computed } from 'vue'

const store = useQuizStore()
const router = useRouter()

// If user navs here randomly, redirect.
if (!store.isGameOver && store.currentLevel === 1 && store.totalScore === 0) {
  router.push('/')
}

const isWin = computed(() => store.hasWon)
const finalScore = computed(() => store.totalScore)

// Reason for ending
const isTimeout = computed(() => store.timeRemaining <= 0)

function handleRetry() {
  store.startNewGame()
}

function handleHome() {
  store.reset()
  router.push('/')
}
</script>

<template>
  <div class="glass-panel max-w-lg w-full p-8 md:p-12 text-center relative overflow-hidden animate-fade-in">
    <!-- Glowing background based on win/lose -->
    <div class="absolute -top-24 -right-24 w-64 h-64 opacity-20 rounded-full blur-3xl pointer-events-none"
         :class="isWin ? 'bg-success' : 'bg-error'"></div>

    <div class="relative z-10 space-y-8 flex flex-col items-center">
      
      <!-- Icon/Emoji display -->
      <div class="text-7xl mb-2 drop-shadow-2xl">
        {{ isWin ? '🏆' : (isTimeout ? '⌛' : '💥') }}
      </div>

      <!-- Title Message -->
      <div>
        <h1 class="text-4xl font-extrabold mb-2 text-white capitalize tracking-wide"
            :class="isWin ? 'text-green-400' : 'text-red-400'">
          {{ isWin ? 'YOU WIN !!' : 'GAME OVER' }}
        </h1>
        
        <p v-if="isTimeout" class="text-slate-300">
          Time ran out! You need to be faster next time. 😅
        </p>
        <p v-else-if="!isWin" class="text-slate-300">
          You didn't reach the required score for Level {{ store.currentLevel }}. 💔
        </p>
        <p v-else class="text-slate-300">
          Congratulations! You've mastered all 5 levels like a Vue Ninja! 🥷✨
        </p>
      </div>

      <!-- Score display -->
      <div class="glass-panel !bg-slate-800/80 p-6 w-full rounded-2xl border-t-4 shadow-2xl"
           :class="isWin ? 'border-success' : 'border-error'">
        <div class="text-xs uppercase tracking-widest text-slate-400 mb-1 font-bold">Final Score</div>
        <div class="text-5xl font-black text-white glow-effect">
          {{ finalScore }} <span class="text-xl text-slate-500 font-medium">pts</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 w-full pt-4">
        <button @click="handleRetry" 
                class="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1">
          🔄 Retry
        </button>
        <button @click="handleHome" 
                class="flex-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1">
          🏠 Home
        </button>
      </div>

    </div>
  </div>
</template>

<style>
.glow-effect {
  text-shadow: 0 0 20px rgba(255,255,255,0.2);
}
</style>
