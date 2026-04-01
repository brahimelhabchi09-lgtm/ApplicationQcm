import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import type { Question } from '@/types'

export const useQuizStore = defineStore('quiz', () => {
  const router = useRouter()

  // State
  const currentLevel = ref<number>(1)
  const questions = ref<Question[]>([])
  const currentQuestionIndex = ref<number>(0)
  
  const score = ref<number>(0)
  
  // Timer State (5 minutes = 300 seconds)
  const INITIAL_TIME = 300
  const timeRemaining = ref<number>(INITIAL_TIME)
  const isTimerRunning = ref<boolean>(false)
  let timerInterval: number | null = null

  // End conditions
  const isGameOver = ref<boolean>(false)
  const hasWon = ref<boolean>(false)
  // Tracks total score across all levels, useful for final display
  const totalScore = ref<number>(0)
  // Tracks score specifically for the current level to check passing conditions
  let levelScore = 0

  // ─── Computed ───────────────────────────────────────────────
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] || null)
  
  const formattedTime = computed(() => {
    const min = Math.floor(timeRemaining.value / 60)
    const sec = timeRemaining.value % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  })
  
  const progressPercent = computed(() => {
    if (questions.value.length === 0) return 0
    return ((currentQuestionIndex.value + 1) / questions.value.length) * 100
  })

  // ─── Actions ────────────────────────────────────────────────
  
  /** Initialize a fresh game */
  async function startNewGame() {
    currentLevel.value = 1
    score.value = 0
    totalScore.value = 0
    timeRemaining.value = INITIAL_TIME
    isGameOver.value = false
    hasWon.value = false
    
    // Save state cleanup
    localStorage.removeItem('quiz-score')
    
    await loadLevel(1)
    startTimer()
    router.push('/quiz')
  }

  /** Load questions for a specific level */
  async function loadLevel(level: number) {
    try {
      levelScore = 0 // Reset level score accumulation
      currentLevel.value = level
      currentQuestionIndex.value = 0
      questions.value = await api.getQuestionsByLevel(level)
    } catch (err) {
      console.error('Failed to load level data:', err)
      // Force end if api fails
      endGame(false)
    }
  }

  /** Check selected answer */
  function submitAnswer(selectedAnswer: string) {
    if (!currentQuestion.value || isGameOver.value) return false

    const isCorrect = selectedAnswer === currentQuestion.value.correct_answer

    if (isCorrect) {
      score.value += 20
      levelScore += 20
      totalScore.value += 20
    }

    // Move to next question or end level
    setTimeout(() => {
      handleNextStep()
    }, 1000) // Delay to let user see "Correct" or "Wrong" UI effect

    return isCorrect
  }

  /** Decide to go to next question or evaluate level completion */
  async function handleNextStep() {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      // Next Question
      currentQuestionIndex.value++
    } else {
      // Level Completed, evaluate passing condition
      checkLevelCompletion()
    }
  }

  /** Evaluate level thresholds */
  async function checkLevelCompletion() {
    // Requirements (Percentage):
    // Level 1: 40%
    // Level 2: 60%
    // Level 3: 80%
    // Level 4: 100%
    // Level 5: 100%
    let didPass = false
    
    const maxLevelScore = questions.value.length * 20
    const percent = maxLevelScore > 0 ? (levelScore / maxLevelScore) * 100 : 0
    
    if (currentLevel.value === 1 && percent >= 40) didPass = true
    if (currentLevel.value === 2 && percent >= 60) didPass = true
    if (currentLevel.value === 3 && percent >= 80) didPass = true
    if (currentLevel.value === 4 && percent >= 100) didPass = true
    if (currentLevel.value === 5 && percent >= 100) didPass = true

    if (didPass) {
      if (currentLevel.value < 5) {
        // Next Level!
        await loadLevel(currentLevel.value + 1)
      } else {
        // Player beat level 5! WIN
        endGame(true)
      }
    } else {
      // Failed to get enough points for this level! LOSE
      endGame(false)
    }
  }

  // ─── Timer Logic ────────────────────────────────────────────

  function startTimer() {
    if (isTimerRunning.value) return
    isTimerRunning.value = true
    
    timerInterval = window.setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        // Time ran out!
        stopTimer()
        endGame(false)
      }
    }, 1000)
  }

  function stopTimer() {
    isTimerRunning.value = false
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  // ─── End Game Logic ─────────────────────────────────────────

  function endGame(winStatus: boolean) {
    isGameOver.value = true
    hasWon.value = winStatus
    stopTimer()
    
    // Persist best score if desired
    const saved = localStorage.getItem('quiz-score')
    const best = saved ? parseInt(saved) : 0
    if (totalScore.value > best) {
      localStorage.setItem('quiz-score', totalScore.value.toString())
    }

    router.push('/result')
  }

  // Optional: manual cleanup
  function reset() {
    stopTimer()
    questions.value = []
  }

  return {
    // State export
    currentLevel,
    questions,
    currentQuestionIndex,
    score,
    timeRemaining,
    isGameOver,
    hasWon,
    totalScore,
    currentQuestion,
    formattedTime,
    progressPercent,
    
    // Actions export
    startNewGame,
    submitAnswer,
    reset
  }
})
