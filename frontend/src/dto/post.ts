import { Post, PostStatus } from "../api/postApi";

export interface PostCreateDTO {
    title: string;
    content: string;
    category: string;
    status: PostStatus;
}

export interface PostUpdateDTO {
    title: string | null;
    content: string | null;
    category: string | null;
    status: PostStatus | null;
}

export interface PagedPostDTO {
    posts: Post[],
    totalPages: number,
    currentPage: number
}
