import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    // Mock response for demo - replace with actual API call
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
    
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@yahoo.com' && password === 'password123') {
      return {
        userId: 2,
        username: 'Admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkB5YWhvby5jb20iLCJ1c2VySWQiOjIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjUzOTA5MywiZXhwIjoxNzEyNTgyMjkzfQ.mock',
        message: 'Login successful',
      };
    } else if (email === 'user@yahoo.com' && password === 'password123') {
      return {
        userId: 3,
        username: 'User',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlVzZXIiLCJlbWFpbCI6InVzZXJAeWFob28uY29tIiwidXNlcklkIjozLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMjUzOTA5MywiZXhwIjoxNzEyNTgyMjkzfQ.mock',
        message: 'Login successful',
      };
    }
    
    throw new Error('Invalid email or password');
  },

  register: async (username: string, email: string, password: string, role: string) => {
    // Mock response for demo - replace with actual API call
    // const response = await api.post('/auth/register', { username, email, password, role });
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      message: 'Account registered successfully',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock',
      account: {
        userId: 5,
        username,
        email,
      },
    };
  },
};

// Mock posts storage (persists during session)
interface MockPost {
  id: number;
  title: string;
  content: string;
  fullContent: string;
  tags: string[];
  date: string;
  authorId: number;
}

const generateInitialPosts = (): MockPost[] => {
  return Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    title: 'Post Title',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard ...',
    fullContent: 'His mother had always taught him not to ever think of himself as better than others. He\'d tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.\nHis mother had always taught him not to ever think of himself as better than others. He\'d tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.',
    tags: ['History', 'Crime', 'American'],
    date: '2024-04-30',
    authorId: i % 2 === 0 ? 2 : 3,
  }));
};

let mockPosts: MockPost[] = generateInitialPosts();

// Posts API
export const postsApi = {
  getAll: async (page: number = 1) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const pageSize = 9;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = mockPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      totalPages: Math.ceil(mockPosts.length / pageSize),
      currentPage: page,
    };
  },

  getById: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const post = mockPosts.find(p => p.id === id);
    if (!post) {
      throw new Error('Post not found');
    }
    return {
      id: post.id,
      title: post.title,
      content: post.fullContent,
      tags: post.tags,
      date: post.date,
      authorId: post.authorId,
    };
  },

  create: async (title: string, content: string, tags: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPost: MockPost = {
      id: Date.now(),
      title,
      content: content.length > 100 ? content.substring(0, 100) + '...' : content,
      fullContent: content,
      tags,
      date: new Date().toISOString().split('T')[0],
      authorId: 2,
    };
    
    mockPosts = [newPost, ...mockPosts];
    
    return {
      id: newPost.id,
      title,
      content,
      tags,
      date: newPost.date,
      message: 'Post created successfully',
    };
  },

  update: async (id: number, title: string, content: string, tags: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const postIndex = mockPosts.findIndex(p => p.id === id);
    if (postIndex !== -1) {
      mockPosts[postIndex] = {
        ...mockPosts[postIndex],
        title,
        content: content.length > 100 ? content.substring(0, 100) + '...' : content,
        fullContent: content,
        tags,
      };
    }
    
    return {
      id,
      title,
      content,
      tags,
      message: 'Post updated successfully',
    };
  },

  delete: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    mockPosts = mockPosts.filter(p => p.id !== id);
    
    return {
      message: 'Post deleted successfully',
    };
  },
};

// Stats API (admin only)
export const statsApi = {
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      totalAccounts: 25,
      totalPosts: mockPosts.length,
      myPosts: mockPosts.filter(p => p.authorId === 2).length,
    };
  },
};

export default api;
