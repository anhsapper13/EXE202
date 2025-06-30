import { BaseService } from "./base.service";
import { User } from "@/types/user.type";

export interface UpdateUserProfileRequest {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  age?: string;
  address?: string;
  description?: string;
  phone?: string;
  avatar?: string;
}

export const UserService = {
  getUserProfile: async () => {
    return BaseService.get<User>({
      url: "/user/profile",
    });
  },

  updateUserProfile: async (data: UpdateUserProfileRequest) => {
    return BaseService.put({
      url: "/user/profile",
      payload: data,
    });
  },

  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return BaseService.post({
      url: "/user/upload-avatar",
      payload: formData,
    });
  },
};
