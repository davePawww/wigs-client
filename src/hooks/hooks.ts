import {
  getError,
  getStatus,
  getUser,
  isAuthenticated,
} from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCheckAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(isAuthenticated());
    };

    fetchUser();
  }, [dispatch]);

  return { user, status, error };
};
