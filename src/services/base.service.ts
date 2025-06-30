
import { setLoading } from "@/store/slices/loadingSlice";
import { store } from "@/store/store";
import { ApiRequest, ApiResponse } from "@/types/request-response.interface";
import { api } from "./api";
import { openNotificationWithIcon } from "@/ultils/notification";

export const BaseService = {
  get<T = any>({
    url,
    payload,
    isLoading = true,
    headers,
  }: Partial<ApiRequest>): Promise<ApiResponse<T>> {
    const params = { ...payload };

    Object.keys(params).forEach(key => {
      const value = (params as any)[key];
      if (value === "" || value === null || value === undefined) {
        delete (params as any)[key];
      }
    });
    
    checkLoading(isLoading);
    return api.get(`${url}`, {
      params,
      headers: headers || {},
    });
  },

  post<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequest>): Promise<ApiResponse<T>> {
    checkLoading(isLoading);
    return api.post(`${url}`, payload, {
      headers: headers || {},
    });
  },

  put<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequest>): Promise<T> {
    checkLoading(isLoading);
    return api.put(`${url}`, payload, {
      headers: headers || {},
    });
  },

  patch<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequest>): Promise<T> {
    checkLoading(isLoading);
    return api.patch(`${url}`, payload, {
      headers: headers || {},
    });
  },

  delete<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequest>): Promise<T> {
    checkLoading(isLoading);
    return api.delete(`${url}`, {
      params: payload,
      headers: headers || {},
    });
  },
  findById<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
  }: Partial<ApiRequest>): Promise<T> {
    checkLoading(isLoading);
    return api.get(`${url}/${payload}`, {
      headers: headers || {},
    });
  },
};

const checkLoading = (isLoading: boolean = false) => {
  return store.dispatch(setLoading(isLoading));
};

export const handleErrorByToast = (error: any) => {
  const message = error.response?.data?.message
    ? error.response?.data?.message
    : error.message;
  openNotificationWithIcon("error", "Error", message);
  store.dispatch(setLoading(false));
  return null;
};
