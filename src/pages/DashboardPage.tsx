import { useEffect, useState } from "react";
import ApiHandler from "../services/apiHandler";
import type { Dashboard } from "../types/api";

const api = new ApiHandler();

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);

  /** Fetch dashboard data */
  const fetchData = async () => {
    const res = await api.getDashboard();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-5 grid grid-cols-3 gap-4">
      <div className="p-4 bg-white shadow">
        Total Employees: {data.total_employees}
      </div>
      <div className="p-4 bg-white shadow">
        Attendance Records: {data.total_attendance_records}
      </div>
      <div className="p-4 bg-white shadow">
        Today Present: {data.today_present}
      </div>
    </div>
  );
}
