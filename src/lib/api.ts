import axios, { AxiosError } from "axios"

import type { Accounts } from "@/types/accounts"
import { type Post, type PostData, type SuccessPost } from "@/types/posts"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Define error response type
interface ApiErrorResponse {
  message?: string
  error?: string
  errors?: string[]
}

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Helper function for error handling
const handleApiError = (error: unknown, defaultMessage: string): never => {
  let errorMessage = defaultMessage
  let statusCode: number | undefined

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>

    // Extract error message from response
    errorMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.response?.data?.errors?.[0] ||
      axiosError.message ||
      defaultMessage

    statusCode = axiosError.response?.status

    console.error("API error:", {
      message: errorMessage,
      status: statusCode,
      endpoint: axiosError.config?.url,
      method: axiosError.config?.method?.toUpperCase(),
      data: axiosError.config?.data,
    })
  } else if (error instanceof Error) {
    errorMessage = error.message
    console.error("Error:", {
      message: errorMessage,
      stack: error.stack,
    })
  } else {
    console.error("Unknown error:", error)
  }

  throw new Error(errorMessage)
}

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page if token is invalid or expired
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  // Login user
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/account/login", { email, password })
      return response.data
    } catch (error) {
      handleApiError(error, "Failed to login. Please check your credentials")
    }
  },

  // Register a new user
  register: async (
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const response = await api.post("/account/register", {
        username,
        email,
        password,
        role,
      })
      return response.data
    } catch (error) {
      handleApiError(
        error,
        "Failed to register account. Please check your credentials."
      )
    }
  },
}

// Posts API
export const postsApi = {
  // Get all posts - Admin only
  getAll: async (page: number = 1, limit: number = 9) => {
    try {
      const response = await api.get<Post>("/posts", {
        params: { page, limit },
      })

      return {
        posts: response.data.data || [],
        totalPages:
          response.data.totalPages ||
          Math.ceil((response.data.totalPosts || 0) / limit),
        currentPage: page,
      }
    } catch (error) {
      handleApiError(error, "Failed to fetch posts.")
    }
  },

  // Get logged user's posts
  getMyPosts: async (page: number = 1, limit: number = 9) => {
    try {
      const response = await api.post<Post>("/posts/mypost", { page, limit })

      return {
        posts: response.data.data || [],
        totalPages:
          response.data.totalPages ||
          Math.ceil((response.data.totalPosts || 0) / limit),
        currentPage: page,
      }
    } catch (error) {
      handleApiError(error, `Failed to fetch user's posts.`)
    }
  },

  // View selected post by post id
  getById: async (id: number | string) => {
    try {
      const response = await api.get<PostData>(`/posts/view/${id}`)
      return response.data
    } catch (error) {
      handleApiError(error, "Failed to fetch post details.")
    }
  },

  // Create a new post
  create: async (title: string, content: string, tags: string[]) => {
    try {
      const response = await api.post<SuccessPost>("/posts/create", {
        title,
        body: content,
        tags,
      })

      return {
        message: response.data.message,
      }
    } catch (error) {
      handleApiError(error, "Failed to create post.")
    }
  },

  // Edit a selected post by Id
  update: async (
    id: number,
    title: string,
    content: string,
    tags: string[]
  ) => {
    try {
      const response = await api.put<SuccessPost>(`/posts/edit/${id}`, {
        title,
        body: content,
        tags,
      })

      return {
        message: response.data.message,
      }
    } catch (error) {
      handleApiError(error, "Failed to update post.")
    }
  },

  // Delete a selected post
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/posts/delete/${id}`)

      return {
        message: response.data.message,
      }
    } catch (error) {
      handleApiError(error, "Failed to delete post.")
    }
  },
}

// Stats API (admin only)
export const statsApi = {
  // Get all accounts data (Method: GET, Token: Yes - admin)
  getStats: async () => {
    try {
      // Get all accounts count
      const accountsResponse = await api.get<Accounts>("/accounts")
      const totalAccounts = accountsResponse.data.accounts.length || 0

      // Get all posts count
      const allPostsResponse = await api.get<Post>("/posts", {
        params: { page: 1, limit: 1 },
      })
      const totalPosts = allPostsResponse.data.totalPosts || 0

      // Get user posts count
      const myPostsResponse = await api.post<Post>("/posts/mypost", {
        page: 1,
        limit: 1,
      })
      const myPosts = myPostsResponse.data.totalPosts || 0

      return {
        totalAccounts,
        totalPosts,
        myPosts,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching stats:", {
          message: error.message,
          status: error.response?.status,
        })
      } else if (error instanceof Error) {
        console.error("Error fetching stats:", error.message)
      } else {
        console.error("Unknown error fetching stats:", error)
      }

      return {
        totalAccounts: 0,
        totalPosts: 0,
        myPosts: 0,
      }
    }
  },
}

export default api
