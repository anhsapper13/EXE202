"use client";
import { setLoading } from "@/store/slices/loadingSlice";
import { store } from "@/store/store";
import axios from "axios";
import { handleErrorByToast } from "./base.service";
import { API_URL } from "@/constant/url";

// configure base API
export const api = axios.create({
  baseURL:`${API_URL}/api/v1`,
  timeout: 60000,
  headers: {
    // "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
    }
    return handleErrorByToast(error);
  }
);


