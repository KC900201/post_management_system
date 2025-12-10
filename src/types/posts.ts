export interface PostData  {
  id: number
  userId: number
  title: string
  body: string
  date: string
  tags: string[]
}

export interface Post  {
  page: number
  limit: number
  totalPages: number
  totalPosts: number
  data: PostData[]
}

export interface SuccessPost {
  message: string
  post: Post
}