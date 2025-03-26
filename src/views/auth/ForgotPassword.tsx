import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/schema/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, getError, getStatus } from "@/redux/slices/authSlice";
import { toast } from "sonner";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      await dispatch(forgotPassword(values.email))
        .then(unwrapResult)
        .then((result) => {
          if (result.success) {
            toast(`Email sent to ${values.email}`);
            form.reset();
          }
        });
    } catch (error) {
      console.log("Failed to send email", error);
      toast(`Failed to send email: ${error}`);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-200">
                  Please enter your email address
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email Address" {...field} />
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
                <p>Sending email...</p>
              </div>
            ) : (
              "Forgot Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
