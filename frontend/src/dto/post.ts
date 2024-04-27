import { PostStatus } from "../api/postApi";

export interface PostCreateDTO {
    title: string;
    content: string;
    category: string;
    status: PostStatus;
}
