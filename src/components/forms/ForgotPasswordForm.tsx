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
import { z } from "zod";
import { forgotPasswordSchema } from "@/schema/schema";
import { UseFormReturn } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type ForgotPasswordFormProps = {
  onSubmit: (values: z.infer<typeof forgotPasswordSchema>) => Promise<void>;
  form: UseFormReturn<z.infer<typeof forgotPasswordSchema>>;
  status: string;
  error: string | undefined;
};

export default function ForgotPasswordForm({
  onSubmit,
  form,
  status,
  error,
}: ForgotPasswordFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        <ErrorMessage error={error} />
        <Button
          disabled={status === "loading"}
          className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
        >
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="border-blue-200 border-t-blue-600" />
              <p>Sending email...</p>
            </div>
          ) : (
            "Forgot Password"
          )}
        </Button>
      </form>
    </Form>
  );
}
