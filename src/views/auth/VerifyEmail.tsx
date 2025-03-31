import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getError, getStatus, verifyEmail } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(verifyEmail(otpValue))
      .then(() => {
        navigate("/auth/login");
      })
      .catch(() => {
        console.error("Email verification failed", error);
      });
  };

  return (
    <div className="min-w-[450px] rounded-md border border-zinc-200/40 bg-zinc-950/95 p-8 shadow-lg">
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold text-white">
            Enter Verification Code
          </h2>
          <p className="text-sm text-muted-foreground">
            Please enter the 6-digit code sent to your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            type="submit"
            disabled={otpValue.length !== 6 || status === "loading"}
            variant="default"
            className="mx-auto cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            {status === "loading" ? (
              <>
                <Spinner className="border-blue-200 border-t-blue-600" />
                <p>Verifying ...</p>
              </>
            ) : (
              <p>Verify Email</p>
            )}
          </Button>

          <ErrorMessage error={error} />
        </form>
      </div>
    </div>
  );
}
