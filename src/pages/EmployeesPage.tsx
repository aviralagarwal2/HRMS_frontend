import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import Button from "../components/Button/button";
import Input from "../components/Input/input";
import Table from "../components/Table/table";
import Spinner from "../components/Spinner/spinner";

export default function EmployeesPage() {
  const { employees, loading, createEmployee, deleteEmployee } =
    useEmployees();

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  /** Handle form submit */
  const submit = () => {
    createEmployee(form as any);
    setForm({
      employee_id: "",
      full_name: "",
      email: "",
      department: "",
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-xl font-bold">Employees</h1>

      <div className="grid grid-cols-4 gap-3">
        <Input
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
          placeholder="Employee ID"
        />
        <Input
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          placeholder="Full Name"
        />
        <Input
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          placeholder="Email"
        />
        <Input
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          placeholder="Department"
        />
      </div>

      <Button text="Add Employee" onClick={submit} />

      <Table headers={["ID", "Name", "Email", "Dept", "Action"]}>
        {employees.map((e) => (
          <tr key={e.employee_id}>
            <td className="border p-2">{e.employee_id}</td>
            <td className="border p-2">{e.full_name}</td>
            <td className="border p-2">{e.email}</td>
            <td className="border p-2">{e.department}</td>
            <td className="border p-2">
              <Button
                text="Delete"
                onClick={() => deleteEmployee(e.employee_id)}
              />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
