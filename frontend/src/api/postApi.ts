import { PagedPostDTO, PostCreateDTO } from '../dto/post';
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

async function createPost(postData: PostCreateDTO): Promise<Post[]> {
  try {
    const response = await api.post('/article', postData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
}


async function getPostById(id: number): Promise<Post> {
  const response = await api.get<Post>(`/article/${id}`);
  return response.data;
}

export { getPagedPost, getPostById, createPost };
