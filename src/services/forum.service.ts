import { PaginatedResponse, PaginationParams } from "@/types/pagination.interface";
import { BaseService } from "./base.service";
import { IPost } from "@/types/post.interface";
import { ApiResponse } from "@/types/request-response.interface";

const ForumService = {
  getAllPosts: async (params: PaginationParams) => {
    return BaseService.get({
      url: "/forum-posts",
      payload: params,
    });
  },
  
  getPostById: async (postId: string) => {
    return BaseService.get<IPost>({
      url: `/forum-posts/${postId}`,
    });
  },
  addPost: async (payload: any) => {
    return BaseService.post<IPost>({
      url: "/forum-posts",
      payload,
    });
  },
};

export default ForumService;
