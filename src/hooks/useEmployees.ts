import { useState, useEffect, useRef, useCallback } from "react";
import ApiHandler from "../services/apiHandler";
import type { Employee } from "../types/api";

const api = new ApiHandler();
const employeesCache = new Map<string, Employee[]>();

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);

  const fetchEmployees = useCallback(async (force = false) => {
    if (!force && employeesCache.has("all")) {
      setEmployees(employeesCache.get("all")!);
      return;
    }
    setLoading(true);
    try {
      const res = await api.getEmployees();
      const data = res?.data || [];
      setEmployees(data);
      employeesCache.set("all", data);
    } finally {
      setLoading(false);
    }
  }, []);

  const createEmployee = async (data: Employee) => {
    await api.createEmployee(data);
    employeesCache.delete("all");
    fetchEmployees(true);
  };

  const deleteEmployee = async (id: string) => {
    await api.deleteEmployee(id);
    employeesCache.delete("all");
    fetchEmployees(true);
  };

  const initOnce = useCallback(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    // you can call initOnce() from component to avoid double fetch under StrictMode
  }, []);

  return { employees, loading, createEmployee, deleteEmployee, fetchEmployees, initOnce };
};
