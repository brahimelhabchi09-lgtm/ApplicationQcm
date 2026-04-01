import axios from 'axios'
import type { Question } from '@/types'

// Vite passes VITE_API_URL during build/dev, falling back to /api
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  /** Health check */
  getHealth() {
    return apiClient.get('/health')
  },
  
  /** Fetch questions for a specific level */
  async getQuestionsByLevel(level: number): Promise<Question[]> {
    const { data } = await apiClient.get<Question[]>(`/questions/level/${level}`)
    return data
  }
}
