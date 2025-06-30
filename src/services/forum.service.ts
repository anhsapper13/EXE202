import { PaginatedResponse, PaginationParams } from "@/types/pagination.interface";
import { BaseService } from "./base.service";
import { IPost } from "@/types/post.interface";
import { ApiResponse } from "@/types/request-response.interface";

const ForumService = {
  getAllPosts: async (params: PaginationParams): Promise<ApiResponse<PaginatedResponse<IPost>>> => {
    return BaseService.get({
      url: "/posts",
      payload: params,
    });
  },
  
  getPostById: async (postId: string): Promise<ApiResponse<IPost>> => {
    return BaseService.get<IPost>({
      url: `/posts/${postId}`,
    });
  },
  addPost: async (payload: any) => {
    return BaseService.post<IPost>({
      url: "/posts",
      payload,
    });
  },
};

export default ForumService;
