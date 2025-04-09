import { getStatus, getUser, isAuthenticated } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCheckAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const status = useSelector(getStatus);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && status === "idle") {
        await dispatch(isAuthenticated());
      }
    };

    fetchUser();
  }, [dispatch, user, status]);
};
