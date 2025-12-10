import axios from 'axios'

import type { Accounts } from '@/types/accounts'
import { type PostData, type Post, type SuccessPost } from '@/types/posts'

const API_BASE_URL = 'https://api-for-testing-gujp.onrender.com/api' // Replace with actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response?.status === 401) {
      // Redirect to login page if token is invalid or expired
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  // Login user
  login: async (email: string, password: string) => {
    // Mock response for demo - replace with actual API call
    const response = await api.post('/account/login', { email, password })
    return response.data
  },

  // Register a new user
  register: async (username: string, email: string, password: string, role: string) => {
    // Mock response for demo - replace with actual API call
    const response = await api.post('/account/register', { username, email, password, role })
    return response.data
  },
}

// Posts API
export const postsApi = {
  // Get all posts - Admin only
  getAll: async (page: number = 1, limit: number = 9) => {
    const response = await api.get<Post>('/posts', { params: { page, limit } })

    return {
      posts: response.data.data || [],
      totalPages: response.data.totalPages || Math.ceil((response.data.totalPosts || 0) / limit),
      currentPage: page,
    }
  },

  // Get logged user's posts
  getMyPosts: async (page: number = 1, limit: number = 9) => {
    const response = await api.post<Post>("/posts/mypost")

    return {
      posts: response.data.data || [],
      totalPages: response.data.totalPages || Math.ceil((response.data.totalPosts || 0) / limit),
      currentPage: page,
    }
  },

  // View selected post by post id
  getById: async (id: number | string) => {
    const response = await api.get<PostData>(`/posts/view/${id}`)
    return response.data
  },

  // Create a new post
  create: async (title: string, content: string, tags: string[]) => {
    const response = await api.post<SuccessPost>("/posts/create", {
      title,
      body: content,
      tags,
    })

    return {
      message: response.data.message
    }
  },

  // Edit a selected posts by Id
  update: async (id: number, title: string, content: string, tags: string[]) => {
    const response = await api.put<SuccessPost>(`/posts/edit/${id}`, {
      title,
      body: content,
      tags
    })

    return {
      message: response.data.message
    }
  },

  // Delete a selected post
  delete: async (id: number) => {
    const response = await api.delete(`/posts/delete/${id}`)

    return {
      message: response.data.message
    }
  },
}

// Stats API (admin only)
export const statsApi = {
  // Get all accounts data (Method: GET, Token: Yes - admin)
  getStats: async () => {
    try {
      // Get all accounts count
      const accountsResponse = await api.get<Accounts>('/accounts')
      const totalAccounts = accountsResponse.data.accounts.length || 0

      // Get all posts count
      const allPostsResponse = await api.get<Post>("/posts", {
        params: { page: 1, limit: 1 }
      })
      const totalPosts = allPostsResponse.data.totalPosts || 0

      // Get user posts count
      const myPostsResponse = await api.post<Post>('/posts/mypost')
      const myPosts = myPostsResponse.data.totalPosts || 0

      return {
        totalAccounts,
        totalPosts,
        myPosts
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
      return {
        totalAccounts: 0,
        totalPosts: 0,
        myPosts: 0
      }
    }
  },
}

export default api
