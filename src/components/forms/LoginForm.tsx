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
import { loginSchema } from "@/schema/schema";
import { z } from "zod";
import AuthRedirectLink from "../AuthRedirectLink";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormProps = {
  onSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>;
  status: string;
  error: string | undefined;
  activeBtn: string;
};

export default function LoginForm({
  onSubmit,
  status,
  error,
  activeBtn,
}: LoginFormProps) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
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
          <ErrorMessage error={error} />
          <AuthRedirectLink
            link="/auth/forgot-password"
            linkText="Forgot Password?"
          />
        </div>

        <Button
          disabled={status === "loading"}
          type="submit"
          className="mx-auto block w-3/4 cursor-pointer bg-blue-600 hover:bg-blue-800"
        >
          {status === "loading" && activeBtn === "email" ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="border-blue-200 border-t-blue-600" />
              <p>Signing in...</p>
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
}
