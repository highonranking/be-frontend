import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data: any) => apiClient.put('/auth/profile', data),
  updateResume: (resumeUrl: string) =>
    apiClient.put('/auth/resume', { resumeUrl }),
};

export const blogAPI = {
  createPost: (data: any) => apiClient.post('/blogs', data),
  getPosts: (params?: any) => apiClient.get('/blogs', { params }),
  getPostBySlug: (slug: string) => apiClient.get(`/blogs/${slug}`),
  updatePost: (id: string, data: any) => apiClient.put(`/blogs/${id}`, data),
  deletePost: (id: string) => apiClient.delete(`/blogs/${id}`),
  likePost: (id: string) => apiClient.post(`/blogs/${id}/like`),
};

export const externalContentAPI = {
  getMediumBlogs: (params?: any) => apiClient.get('/external/medium', { params }),
  getGithubRepos: (params?: any) => apiClient.get('/external/github', { params }),
  getLinkedInPosts: (params?: any) => apiClient.get('/external/linkedin', { params }),
  syncContent: (type: string) => apiClient.post('/external/sync', { type }),
};

export const portfolioAPI = {
  getPortfolio: () => apiClient.get('/portfolio'),
  updatePortfolio: (data: any) => apiClient.put('/portfolio', data),
};

export default apiClient;
