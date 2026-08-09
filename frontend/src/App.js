import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { api } from "@/lib/api";

const RequireAdmin = ({ children }) => {
  const [state, setState] = useState("checking");

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setState("ok"))
      .catch(() => setState("no"));
  }, []);

  if (state === "checking")
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate950 text-sm uppercase tracking-[0.2em] text-brass">
        Loading…
      </div>
    );
  if (state === "no") return <Navigate to="/admin/login" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
