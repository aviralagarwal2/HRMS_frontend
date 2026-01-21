import { Link } from "react-router-dom";
import AppRoutes from "./routes";

/** Main application layout */
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top navigation bar */}
      <nav className="bg-black text-white px-6 py-3 flex gap-6">
        <Link to="/" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/employees" className="hover:text-blue-400">
          Employees
        </Link>
        <Link to="/attendance" className="hover:text-blue-400">
          Attendance
        </Link>
      </nav>

      {/* Page content */}
      <main className="p-6">
        <AppRoutes />
      </main>

    </div>
  );
}

export default App;
