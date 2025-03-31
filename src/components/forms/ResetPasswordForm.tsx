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
import { resetPasswordSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type ResetPasswordFormProps = {
  onSubmit: (values: z.infer<typeof resetPasswordSchema>) => Promise<void>;
  status: string;
  error: string | undefined;
};

export default function ResetPasswordForm({
  onSubmit,
  status,
  error,
}: ResetPasswordFormProps) {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              <FormLabel className="text-zinc-200">Confirm Password</FormLabel>
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
        <ErrorMessage error={error} />
        <Button
          disabled={status === "loading"}
          className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
        >
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="border-blue-200 border-t-blue-600" />
              <p>Changing password...</p>
            </div>
          ) : (
            "Confirm new password"
          )}
        </Button>
      </form>
    </Form>
  );
}
