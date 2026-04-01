<script setup lang="ts">
import type { Question } from '@/types';

defineProps<{
  question: Question;
  isSubmitted: boolean;
  selectedChoice: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', choice: string): void;
}>();

function getButtonClass(choice: string, correct_answer: string, isSubmitted: boolean, selectedChoice: string | null) {
  if (!isSubmitted) {
    return selectedChoice === choice 
      ? 'border-primary bg-primary/20 scale-[0.98]' 
      : 'glass-button hover:bg-slate-700/60'
  }

  const isCorrectChoice = choice === correct_answer;
  const isSelected = selectedChoice === choice;

  if (isCorrectChoice) {
    return 'bg-green-500 text-white border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-[1.02]'
  }
  
  if (isSelected && !isCorrectChoice) {
    return 'bg-red-500 text-white border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-shake'
  }

  return 'opacity-40 glass-button grayscale scale-95'
}
</script>

<template>
  <div class="glass-panel p-6 md:p-10 text-center animate-fade-in flex-grow flex flex-col justify-center min-h-[420px] relative overflow-hidden group">
    <!-- Decorative background circle -->
    <div class="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>

    <h2 class="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight">
      {{ question.question }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <button
        v-for="(choice, idx) in question.choices"
        :key="idx"
        @click="emit('select', choice)"
        :disabled="isSubmitted"
        class="p-5 text-lg font-medium rounded-2xl transition-all duration-300 w-full text-left flex items-center gap-4 border"
        :class="getButtonClass(choice, question.correct_answer, isSubmitted, selectedChoice)"
      >
        <span class="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
              :class="selectedChoice === choice ? 'border-transparent bg-white/30' : 'border-slate-500/50 group-hover:border-slate-300'">
            <svg v-if="isSubmitted && choice === question.correct_answer" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="isSubmitted && choice === selectedChoice && choice !== question.correct_answer" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span v-else-if="!isSubmitted" class="text-xs font-bold text-slate-400">{{ String.fromCharCode(65 + Number(idx)) }}</span>
        </span>
        <span class="flex-grow">{{ choice }}</span>
      </button>
    </div>
  </div>
</template>
