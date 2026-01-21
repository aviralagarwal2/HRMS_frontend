import { useState, useEffect, useMemo } from "react";
import { useAttendance } from "../hooks/useAttendance";
import Button from "../components/Button/button";
import Input from "../components/Input/input";
import Table from "../components/Table/table";
import Spinner from "../components/Spinner/spinner";
import { useDebounce } from "../utils/useDebounce";
import type { Attendance } from "../types/api";
import DateInput from "../components/Date/DateInput";
import Pagination from "../components/Pagination/Pagination";


/** Attendance page */
export default function AttendancePage() {
  const { records, loading, fetchAll, mark, filterByDate, initOnce } = useAttendance();

  // form state
  const [form, setForm] = useState({ employee_id: "", date: "", status: "Present" });

  // pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // filter by date input
  const [filterDate, setFilterDate] = useState("");
  const debouncedDate = useDebounce(filterDate, 400);

  // init once (prevents double fetch in dev StrictMode)
  useEffect(() => {
    initOnce();
  }, [initOnce]);

  // apply date filter when debounced value changes
  useEffect(() => {
    if (debouncedDate) {
      filterByDate(debouncedDate);
      setPage(1);
    } else {
      fetchAll();
    }
  }, [debouncedDate, fetchAll, filterByDate]);

  /** Submit attendance */
  const submit = async () => {
    // basic validation
    if (!form.employee_id || !form.date) {
      alert("Please fill required fields");
      return;
    }
    await mark(form as Attendance);
    setForm({ employee_id: "", date: "", status: "Present" });
  };

  // client-side pagination: derive current page items
  const total = records.length;
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return records.slice(start, start + pageSize);
  }, [records, page]);

  if (loading) return <Spinner />;

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-xl font-bold">Attendance</h1>

      <div className="grid grid-cols-3 gap-3">
        <Input
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          placeholder="Employee ID"
        />

        <DateInput value={form.date} onChange={(val) => setForm({ ...form, date: val })} />

        <select
          className="border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
      </div>

      <Button text="Mark Attendance" onClick={submit} />

      <div className="flex gap-3 items-center">
        <DateInput value={filterDate} onChange={setFilterDate} placeholder="Filter date" />
        <Button text="Clear Filter" onClick={() => { setFilterDate(""); fetchAll(); }} />
      </div>

      <Table headers={["ID", "Date", "Status"]}>
        {paginated.map((r) => (
          <tr key={`${r.employee_id}-${r.date}`} className="odd:bg-white even:bg-gray-50">
            <td className="border p-2">{r.employee_id}</td>
            <td className="border p-2">{r.date}</td>
            <td className="border p-2">{r.status}</td>
          </tr>
        ))}
        {paginated.length === 0 && (
          <tr>
            <td className="p-4" colSpan={3}>
              No records found.
            </td>
          </tr>
        )}
      </Table>

      <div className="flex justify-between items-center">
        <div>Total: {total}</div>
        <Pagination current={page} total={total} pageSize={pageSize} onChange={setPage} />
      </div>
    </div>
  );
}
