import { useState, useRef, useCallback } from "react";
import ApiHandler from "../services/apiHandler";
import type { Attendance } from "../types/api";

const api = new ApiHandler();

/** Simple in-memory cache */
const attendanceCache = new Map<string, Attendance[]>();

/** Fetch attendance hook */
export const useAttendance = () => {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);

  /** Fetch all attendance */
  const fetchAll = useCallback(async (force = false) => {
    if (!force && attendanceCache.has("all")) {
      setRecords(attendanceCache.get("all")!);
      return;
    }

    setLoading(true);
    try {
      const res = await api.getAttendance();
      const data = res?.data || [];
      setRecords(data);
      attendanceCache.set("all", data);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Mark attendance */
  const mark = useCallback(async (data: Attendance) => {
    setLoading(true);
    try {
      const res = await api.markAttendance(data);
      // Invalidate cache and refresh
      attendanceCache.delete("all");
      attendanceCache.delete(`by_${data.employee_id}`);
      await fetchAll(true);
      return res;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  /** Filter by date */
  const filterByDate = useCallback(async (date: string) => {
    const key = `date_${date}`;
    if (attendanceCache.has(key)) {
      setRecords(attendanceCache.get(key)!);
      return;
    }

    setLoading(true);
    try {
      const res = await api.filterAttendance(date);
      const data = res?.data || [];
      setRecords(data);
      attendanceCache.set(key, data);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Initialize fetch only once (handles StrictMode double-run) */
  const initOnce = useCallback(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    fetchAll();
  }, [fetchAll]);

  return {
    records,
    loading,
    fetchAll,
    mark,
    filterByDate,
    initOnce,
  };
};
