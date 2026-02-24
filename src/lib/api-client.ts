// ============================================================
// API Client - Shared between Web & Android
// ============================================================

import type { ApiResponse, PaginatedResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // ---- Auth ----
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { name: string; email: string; password: string; role: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // ---- Properties ----
  async getProperties(params?: { page?: number; limit?: number; search?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/properties${query ? `?${query}` : ""}`);
  }

  async getProperty(id: string) {
    return this.request(`/properties/${id}`);
  }

  async createProperty(data: Record<string, unknown>) {
    return this.request("/properties", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProperty(id: string, data: Record<string, unknown>) {
    return this.request(`/properties/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProperty(id: string) {
    return this.request(`/properties/${id}`, { method: "DELETE" });
  }

  // ---- Tenants ----
  async getTenants(params?: { page?: number; limit?: number; propertyId?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/tenants${query ? `?${query}` : ""}`);
  }

  async getTenant(id: string) {
    return this.request(`/tenants/${id}`);
  }

  async createTenant(data: Record<string, unknown>) {
    return this.request("/tenants", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ---- Payments ----
  async getPayments(params?: { page?: number; limit?: number; status?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/payments${query ? `?${query}` : ""}`);
  }

  async createPaymentIntent(data: { amount: number; tenantId: string; description: string }) {
    return this.request("/payments/intent", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async recordPayment(data: Record<string, unknown>) {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ---- Maintenance ----
  async getTickets(params?: { page?: number; limit?: number; status?: string; priority?: string }) {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/maintenance${query ? `?${query}` : ""}`);
  }

  async getTicket(id: string) {
    return this.request(`/maintenance/${id}`);
  }

  async createTicket(data: Record<string, unknown>) {
    return this.request("/maintenance", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTicket(id: string, data: Record<string, unknown>) {
    return this.request(`/maintenance/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async assignTicket(id: string, assignedTo: string) {
    return this.request(`/maintenance/${id}/assign`, {
      method: "PUT",
      body: JSON.stringify({ assignedTo }),
    });
  }

  // ---- Notifications ----
  async getNotifications(params?: { unreadOnly?: boolean }) {
    const query = params?.unreadOnly ? "?unread=true" : "";
    return this.request(`/notifications${query}`);
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, { method: "PUT" });
  }

  async markAllNotificationsRead() {
    return this.request("/notifications/read-all", { method: "PUT" });
  }

  // ---- Dashboard ----
  async getDashboardStats() {
    return this.request("/dashboard/stats");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default ApiClient;
