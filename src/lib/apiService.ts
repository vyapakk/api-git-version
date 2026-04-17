/**
 * Centralized API Service for Stratview Dashboard
 * Handles token injection and global 401 Unauthorized errors.
 */

// Helper to handle 401 errors
const handle401 = () => {
  // Clear local session
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
  // Force redirect to login page with an expired flag
  // Use a relative path or the current base URL to ensure it works in subdirectories (/react_site/)
  // The login page is the root Index page in this project.
  const baseUrl = import.meta.env.BASE_URL || "/";
  window.location.href = `${baseUrl}?expired=true`;
};

export const apiService = {
  /**
   * Base fetch wrapper
   */
  async request(endpoint: string, options: RequestInit = {}) {
    // Get token directly from localStorage for consistency
    const token = localStorage.getItem("token");

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers as Record<string, string> || {}),
      },
    };

    try {
      const response = await fetch(endpoint, config);

      // GLOBAL 401 HANDLER
      if (response.status === 401) {
        handle401();
        throw new Error("Unauthorized");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * GET Request
   */
  async get(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  },

  /**
   * POST Request
   */
  async post(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  /**
   * PUT Request
   */
  async put(endpoint: string, body: any, options: RequestInit = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  /**
   * DELETE Request
   */
  async delete(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  },
};
