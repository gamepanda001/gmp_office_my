import type { Response } from "./request"
import req from "./request"

interface LoginResponseData {
  amount: string
  user_id: string
  user_name: string
}

interface PlayGameResponseData {
  game_url: string
  user_name: string
}

interface Game {
  category: string
  /**
   * 封面
   */
  cover_url: string
  /**
   * 游戏id
   */
  id: string
  /**
   * 游戏name
   */
  name: string
  /**
   * 供应商
   */
  provider: string
  status: number
  updated_at: number
}

class User {
  private _userId?: string
  private _userName?: string

  constructor() {
    if (typeof window !== 'undefined') {
      this._userId = window.sessionStorage.getItem('user_id') || ''
      this._userName = window.sessionStorage.getItem('user_name') || ''
    }
  }

  get userId() {
    return this._userId || ''
  }

  set userId(value: string) {
    this._userId = value
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('user_id', value)
    }
  }

  get userName() {
    return this._userName || ''
  }

  set userName(value: string) {
    this._userName = value
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('user_name', value)
    }
  }
}

const user = new User()

export default {
  async login() {
    const response = await req.post<Response<LoginResponseData>>('/login', { user_name: 'guest', amount: '10000' })
    user.userId = response.data.data.user_id
    user.userName = response.data.data.user_name
    return response.data.data
  },

  async addAmount() {
    const response = await req.post<Response<LoginResponseData>>('/add_amount', { user_id: user.userId, amount: '10000' })
    return response.data.data
  },

  async playGame(gameCode: string) {
    const response = await req.post<Response<PlayGameResponseData>>('/play', {
      user_id: user.userId,
      user_token: user.userId,
      username: user.userName,
      currency: 'USD',
      lang: 'en',
      game_code: gameCode,
    })
    return response.data.data
  },

  async getGames() {
    const response = await req.get<Response<Game[]>>('/list')
    return response.data.data
  }
} 