import AuthLayout from "@/components/layouts/AuthLayout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const App = lazy(() => import("@/App"));
const Login = lazy(() => import("@/views/auth/Login"));
const Register = lazy(() => import("@/views/auth/Register"));
const VerifyEmail = lazy(() => import("@/views/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/views/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/views/auth/ResetPassword"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<App />} />

      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route index path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
