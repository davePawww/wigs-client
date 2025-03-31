import { z } from "zod";
import { forgotPasswordSchema } from "@/schema/schema";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, getError, getStatus } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthFormContainer from "@/components/AuthFormContainer";
import AuthFormTitle from "@/components/AuthFormTitle";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import AuthRedirectLink from "@/components/AuthRedirectLink";

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
    <AuthFormContainer>
      <AuthFormTitle title="WIGS" />
      <ForgotPasswordForm
        onSubmit={onSubmit}
        form={form}
        status={status}
        error={error}
      />
      <AuthRedirectLink
        link="/auth/login"
        linkText="Back to Login"
        className="mt-4"
      />
    </AuthFormContainer>
  );
}
