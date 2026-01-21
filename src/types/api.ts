export interface Employee {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

export interface Attendance {
  employee_id: string;
  date: string;
  status: string;
}

export interface Dashboard {
  total_employees: number;
  total_attendance_records: number;
  today_present: number;
}
