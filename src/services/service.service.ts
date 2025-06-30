import { IService, ServiceRequestParam } from "@/types/service.interface";
import { BaseService } from "./base.service";

const ServiceService = {
  getServiceClient: async (params?: ServiceRequestParam) => {
    return await BaseService.get({
      url: "/services/client",
      payload: params,
    });
  },
   getServiceByIdClient: async (id: string) => {
    return await BaseService.get({
      url: `/services/client/${id}`,
    });
  },

  getService: async (params?: ServiceRequestParam) => {
    return await BaseService.get({
      url: "/services",
      payload: params,
    });
  },
  getServiceById: async (id: string) => {
    return await BaseService.get<IService>({
      url: `/services/${id}`,
    });
  },
  createService: async (formData: FormData) => {
    return await BaseService.post({
      url: "/services",
      payload: formData,
    });
  },
  updateService: async (id: string, formData: FormData) => {
    return await BaseService.patch({
      url: `/services/${id}`,
      payload: formData,
    });
  },
  deleteService: async (id: string) => {
    return await BaseService.delete({
      url: `/services/${id}`,
    });
  },
//   aiRecommendService: async () => {
//     return await BaseService.get({
//       url: "/service/ai-recommend",
//     });
//   }
  
};
export default ServiceService;