export interface ApiRequest<T = any> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  payload?: T;
  isLoading?: boolean;
  withCredentials?: boolean;
}

export interface ApiResponse<T = any> {
  status: number | string;
  data: {
    data: T;
  };
  message: string;
  success: boolean;
}

export interface ApiError {
  status:number | string;
  message: string;
  errors?: Record<string, string[]>;
}