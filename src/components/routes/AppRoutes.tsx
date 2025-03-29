import AuthLayout from "@/components/layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Main pages
const Wigs = lazy(() => import("@/views/wigs/Wigs"));
const HabitTracker = lazy(() => import("@/views/habit-tracker/HabitTracker"));
const Pomodoro = lazy(() => import("@/views/pomodoro/Pomodoro"));

// Auth pages
const Login = lazy(() => import("@/views/auth/Login"));
const Register = lazy(() => import("@/views/auth/Register"));
const VerifyEmail = lazy(() => import("@/views/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/views/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/views/auth/ResetPassword"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Wigs />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Route>

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
