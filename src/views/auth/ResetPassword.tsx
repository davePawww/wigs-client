import AuthFormContainer from "@/components/AuthFormContainer";
import AuthFormTitle from "@/components/AuthFormTitle";
import AuthRedirectLink from "@/components/AuthRedirectLink";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import { getError, getStatus, resetPassword } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { resetPasswordSchema } from "@/schema/schema";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

export default function ResetPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const { token } = useParams();

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
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
    <AuthFormContainer>
      <AuthFormTitle title="WIGS" />
      <ResetPasswordForm onSubmit={onSubmit} status={status} error={error} />
      <AuthRedirectLink
        link="/auth/login"
        linkText="Back to Login"
        className="mt-4"
      />
    </AuthFormContainer>
  );
}
