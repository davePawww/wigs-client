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
import { getError, getStatus, resetPassword } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { resetPasswordSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      // create dispatch here
      // reroute to login after successful password reset
      // add a toast
      if (!token) {
        throw new Error("Token not found");
      }

      await dispatch(resetPassword({ password: values.password, token }))
        .then(unwrapResult)
        .then((result) => {
          if (result.success) {
            navigate("/auth/login");
          }
        });
    } catch (error) {
      console.log("Failed to reset password", error);
    }
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">New Password</FormLabel>
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
            className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            {status === "loading" ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-3 border-blue-200 border-t-blue-600" />
                <p>Changing password...</p>
              </div>
            ) : (
              "Confirm new password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
