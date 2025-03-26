import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getError, getStatus, login } from "@/redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";
import { loginSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setActiveBtn("email");
    try {
      await dispatch(login(values))
        .then(unwrapResult)
        .then((result) => {
          if (result.success) {
            navigate("/");
          }
        });
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_API_URL}/auth/google`;
  };

  return (
    <div className="min-w-[400px] rounded-md border border-zinc-200/40 bg-zinc-950/95 p-8 shadow-lg">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-center text-3xl text-white">appName</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="-mt-6 flex items-center justify-between">
            {error ? <p className="text-sm text-red-700">{error}</p> : <p> </p>}
            <p
              className="text-xs text-blue-300 hover:underline"
              onClick={() => navigate("/auth/forgot-password")}
            >
              <Link to="/auth/forgot-password">Forgot Password?</Link>
            </p>
          </div>
          <Button
            disabled={status === "loading"}
            type="submit"
            className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            {status === "loading" && activeBtn === "email" ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600" />
                <p>Signing in...</p>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
      <p className="my-2 text-center text-zinc-100/50">or</p>
      <Button
        disabled={status === "loading"}
        variant="default"
        className="mx-auto block w-3/4 cursor-pointer bg-neutral-200 hover:scale-105 hover:bg-neutral-400"
        onClick={handleGoogleLogin}
      >
        {status === "loading" && activeBtn === "google" ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-3 border-neutral-600 border-t-neutral-900" />
            <p className="text-black">Signing in ...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <p className="text-black">Continue with Google</p>
            <FcGoogle />
          </div>
        )}
      </Button>
      <p className="mt-4 text-center text-xs text-zinc-100/50">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-300">
          Register
        </Link>
      </p>
    </div>
  );
}
