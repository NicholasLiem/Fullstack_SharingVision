import { PagedPostDTO, PostCreateDTO, PostUpdateDTO } from '../dto/post';
import { api } from './index';

export enum PostStatus {
    PUBLISH = 'publish',
    DRAFT = 'draft',
    THRASH = 'thrash'
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  status: PostStatus;
}

async function getPagedPost(limit: number, offset: number): Promise<PagedPostDTO> {
  try {
    const response = await api.get<PagedPostDTO>(`/article/${limit}/${offset}`)
    return response.data
  } catch (error) {
    throw new Error("Can't fetch posts")
  }
}

async function createPost(postData: PostCreateDTO): Promise<boolean> {
  try {
    const response = await api.post('/article', postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
}

async function deletePost(postId: number): Promise<boolean> {
  try {
    const response = await api.delete(`/article/${postId}`)
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete post');
  }
}

async function updatePost(postId: number, postData: PostUpdateDTO): Promise<boolean> {
  try {
    const response = await api.patch<boolean>(`/article/${postId}`, postData)
    return response.data
  } catch (error) {
    throw new Error("Can't fetch posts")
  }
}

async function getAllPost(): Promise<Post[]> {
  try {
    const response = await api.get('/article/all');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
}

async function getPostById(id: number): Promise<Post> {
  const response = await api.get<Post>(`/article/${id}`);
  return response.data;
}

export { getPagedPost, getPostById, createPost, getAllPost, deletePost, updatePost };
