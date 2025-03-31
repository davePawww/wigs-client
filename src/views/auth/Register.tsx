import { z } from "zod";
import { registerSchema } from "@/schema/schema";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getError, getStatus, register } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import AuthFormContainer from "@/components/AuthFormContainer";
import AuthFormTitle from "@/components/AuthFormTitle";
import AuthRedirectLink from "@/components/AuthRedirectLink";
import GoogleLoginBtn from "@/components/GoogleLoginBtn";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("");

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

  return (
    <AuthFormContainer>
      <AuthFormTitle title="Create a WIGS account" />
      <RegisterForm
        onSubmit={onSubmit}
        status={status}
        error={error}
        activeBtn={activeBtn}
      />
      <p className="my-2 text-center text-zinc-100/50">or</p>
      <GoogleLoginBtn status={status} activeBtn={activeBtn} />
      <AuthRedirectLink
        message="Already have an account?"
        link="/auth/login"
        linkText="Sign in"
      />
    </AuthFormContainer>
  );
}
