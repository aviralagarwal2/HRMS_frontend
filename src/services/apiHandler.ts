import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

class ApiHandler {
  private axiosInstance: any;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: any) => Promise.reject(error)
    );
  }

  /** Handle unauthorized access */
  handleUnauthorized() {
    localStorage.clear();
    window.location.href = "/";
  }

  /** Generic API request handler */
  async request(endpoint: string, method: string, data: any = {}, params: any = {}) {
    try {
      const response = await this.axiosInstance({
        url: endpoint,
        method,
        data: ["POST", "PUT", "PATCH", "DELETE"].includes(method) ? data : {},
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.handleUnauthorized();
      }
      return error.response?.data || { message: "Network error" };
    }
  }

  /** Create employee */
  createEmployee(data: any) {
    return this.request("/employees/", "POST", data);
  }

  /** Get all employees */
  getEmployees() {
    return this.request("/employees/", "GET");
  }

  /** Delete employee */
  deleteEmployee(id: string) {
    return this.request(`/employees/${id}`, "DELETE");
  }

  /** Mark attendance */
  markAttendance(data: any) {
    return this.request("/attendance/", "POST", data);
  }

  /** Get all attendance */
  getAttendance() {
    return this.request("/attendance/", "GET");
  }

  /** Get attendance by employee */
  getAttendanceByEmployee(id: string) {
    return this.request(`/attendance/${id}`, "GET");
  }

  /** Filter attendance by date */
  filterAttendance(date: string) {
    return this.request(`/attendance/date/${date}`, "GET");
  }

  /** Get present days */
  getPresentDays(id: string) {
    return this.request(`/attendance/present/${id}`, "GET");
  }

  /** Dashboard summary */
  getDashboard() {
    return this.request("/dashboard/", "GET");
  }
}

export default ApiHandler;
