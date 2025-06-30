import { BaseService } from "./base.service";
import { ApiResponse } from "@/types/request-response.interface";

export interface AnalyticsData {
  totalOrders: number;
  completedOrders: number;
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalTransactions: number;
  avgOrderValue: number;
  growthRate: number;
}

export interface ChartData {
  period: string;
  revenue: number;
  orders: number;
  bookings: number;
}

export interface StatusDistribution {
  orderStatus: { name: string; value: number }[];
  bookingStatus: { name: string; value: number }[];
}

export interface PerformanceMetrics {
  orderCompletionRate: number;
  bookingCompletionRate: number;
  avgOrderValue: number;
  growthRate: number;
  revenuePerTransaction: number;
}

export interface AnalyticsParams {
  userId?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  period?: 'day' | 'week' | 'month';
  months?: number;
}

export const AnalyticsService = {
  getDashboardAnalytics: async (params?: AnalyticsParams): Promise<ApiResponse<AnalyticsData>> => {
    return BaseService.get<AnalyticsData>({
      url: "/analytics/dashboard",
      payload: params,
    });
  },

  getRevenueTrend: async (params?: AnalyticsParams): Promise<ApiResponse<ChartData[]>> => {
    return BaseService.get<ChartData[]>({
      url: "/analytics/revenue-trend-monthly",
      payload: params,
    });
  },

  getStatusDistribution: async (): Promise<ApiResponse<StatusDistribution>> => {
    return BaseService.get<StatusDistribution>({
      url: "/analytics/status-distribution",
   
    });
  },

  getPerformanceMetrics: async (params?: AnalyticsParams): Promise<ApiResponse<PerformanceMetrics>> => {
    return BaseService.get<PerformanceMetrics>({
      url: "/analytics/performance-metrics",
      payload: params,
    });
  },
};
