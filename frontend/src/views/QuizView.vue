<script setup lang="ts">
import { ref } from 'vue'
import { useQuizStore } from '@/store/quiz'

// Importing reusable components
import TimerDisplay from '@/components/TimerDisplay.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'

const store = useQuizStore()

// Sound Effects setup 
const playSound = (isCorrect: boolean) => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioContext) return 

  const ctx = new AudioContext()
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  if (isCorrect) {
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    osc.frequency.linearRampToValueAtTime(659.25, ctx.currentTime + 0.1) // E5
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25)
    osc.start()
    osc.stop(ctx.currentTime + 0.25)
  } else {
    osc.type = 'square'
    osc.frequency.setValueAtTime(120, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.2)
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25)
    osc.start()
    osc.stop(ctx.currentTime + 0.25)
  }
}

// UI state for answer feedback
const selectedAnswer = ref<string | null>(null)
const isAnswerSubmitted = ref<boolean>(false)

async function handleAnswerSelection(choice: string) {
  if (isAnswerSubmitted.value || store.isGameOver) return

  selectedAnswer.value = choice
  const isCorrect = store.submitAnswer(choice)
  isAnswerSubmitted.value = true

  // Play sound effect
  playSound(isCorrect)

  // Reset local UI state for the next question (the store waits 1 second before loading next)
  setTimeout(() => {
    isAnswerSubmitted.value = false
    selectedAnswer.value = null
  }, 1000)
}
</script>

<template>
  <div class="max-w-3xl w-full flex flex-col gap-6" v-if="store.currentQuestion && !store.isGameOver">
    
    <!-- Header (Timer & Progress) -->
    <header class="glass-panel p-4 flex flex-col gap-4 sticky top-4 z-50 animate-fade-in shadow-2xl">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-col">
          <span class="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Status</span>
          <div class="font-bold text-lg text-white">
            Level <span class="text-blue-400">{{ store.currentLevel }}</span> 
            — Question <span class="text-blue-400">{{ store.currentQuestionIndex + 1 }}</span>/5
          </div>
        </div>

        <div class="flex items-center gap-6">
          <div class="flex flex-col items-end">
             <span class="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Total Score</span>
             <div class="text-2xl font-black text-white glow-primary">{{ store.totalScore }} <span class="text-xs text-slate-500 font-medium">pts</span></div>
          </div>
          
          <TimerDisplay 
            :time="store.formattedTime" 
            :isUrgent="store.timeRemaining < 60" 
          />
        </div>
      </div>
      
      <ProgressBar :progress="store.progressPercent" />
    </header>

    <!-- Main Question Content -->
    <QuestionCard
      :question="store.currentQuestion"
      :isSubmitted="isAnswerSubmitted"
      :selectedChoice="selectedAnswer"
      @select="handleAnswerSelection"
    />

  </div>
  
  <!-- Loading state -->
  <div v-else-if="!store.isGameOver" class="flex flex-col items-center gap-6 animate-pulse">
    <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <div class="text-white text-xl font-medium tracking-wide">Loading Next Question...</div>
  </div>
</template>

