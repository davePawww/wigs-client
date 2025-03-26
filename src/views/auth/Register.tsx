import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schema/schema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, register } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setActiveBtn("email");
    try {
      await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      )
        .then(unwrapResult)
        .then((result) => {
          if (result.success) {
            navigate("/auth/verify-email");
          }
        });
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${import.meta.env.VITE_SERVER_BASE_API_URL}/auth/google`;
  };

  return (
    <div className="max-w-[450px] rounded-md border border-zinc-200/40 bg-zinc-950/95 p-8 shadow-lg">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-center text-3xl text-white">
          Create a WIGS account
        </h1>
        <p className="text-sm text-zinc-200/40">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime esse
          in hic.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            disabled={status === "loading"}
            type="submit"
            className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            {status === "loading" && activeBtn === "email" ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600" />
                <p>Creating account...</p>
              </div>
            ) : (
              "Create an account"
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
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}
