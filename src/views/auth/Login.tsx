import { getError, getStatus, login } from "@/redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "@/redux/store";
import { loginSchema } from "@/schema/schema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import AuthRedirectLink from "@/components/AuthRedirectLink";
import LoginForm from "@/components/forms/LoginForm";
import AuthFormTitle from "@/components/AuthFormTitle";
import AuthFormContainer from "@/components/AuthFormContainer";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("");

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

  return (
    <AuthFormContainer>
      <AuthFormTitle title="WIGS" />
      <LoginForm
        onSubmit={onSubmit}
        status={status}
        error={error}
        activeBtn={activeBtn}
      />
      <p className="my-2 text-center text-zinc-100/50">or</p>
      <GoogleLoginBtn status={status} activeBtn={activeBtn} />
      <AuthRedirectLink
        message="Don't have an account?"
        link="/auth/register"
        linkText="Register"
      />
    </AuthFormContainer>
  );
}
