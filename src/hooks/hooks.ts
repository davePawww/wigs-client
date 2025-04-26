import { MAX_WIGS } from "@/lib/constants";
import { getStatus, getUser, isAuthenticated } from "@/redux/slices/authSlice";
import {
  clearError,
  deleteWigAsync,
  getAuthenticatedWigs,
  getUnauthenticatedWigs,
  getUserWigs,
  IWigs,
  removeWig,
  saveUpdatedWigAsync,
  updateWig,
  updateWigAsync,
  getError as getWigsError,
  createWigAsync,
  createWig,
  setError,
} from "@/redux/slices/wigsSlice";
import { AppDispatch } from "@/redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export const useCheckAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const status = useSelector(getStatus);

  const fetchUser = useCallback(async () => {
    if (!user && status === "idle") {
      await dispatch(isAuthenticated());
    }
  }, [dispatch, user, status]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};

export const useWigsStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const wigsData = useSelector(
    user ? getAuthenticatedWigs : getUnauthenticatedWigs,
  );
  const wigsError = useSelector(getWigsError);
  const [inputValue, setInputValue] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatchAction = async (action: any) => {
    dispatch(clearError());
    await dispatch(action);
    // TODO: I'm thinking instead of re-fetching the data again. We could just update the global state instead.
    if (user) await dispatch(getUserWigs());
  };

  const handleCreateWig = () => {
    if (wigsData?.length === MAX_WIGS) {
      dispatch(setError("You can only have 4 WIGS"));
      return;
    }

    if (inputValue.trim() === "") {
      dispatch(setError("WIGS cannot be empty"));
      return;
    }

    const newWig = {
      _id: uuidv4(),
      description: inputValue,
      completed: false,
    };

    dispatchAction(user ? createWigAsync(newWig) : createWig(newWig));
    setInputValue("");
  };

  const handleInputChange = (wig: IWigs, description: string) => {
    dispatch(
      user
        ? updateWigAsync({ ...wig, description })
        : updateWig({ ...wig, description }),
    );
  };

  const handleCheckboxChange = async (wig: IWigs) => {
    const updatedWig = { ...wig, completed: !wig.completed };
    dispatch(user ? updateWigAsync(updatedWig) : updateWig(updatedWig));
    if (user) {
      await dispatch(saveUpdatedWigAsync(updatedWig));
      // TODO: I'm thinking instead of re-fetching the data again. We could just update the global state instead.
      await dispatch(getUserWigs());
    }
  };

  const handleRemoveWig = (id: string) => {
    dispatchAction(user ? deleteWigAsync(id) : removeWig(id));
  };

  const handleSaveWigUpdates = (wig: IWigs) => {
    if (user) dispatch(saveUpdatedWigAsync(wig));
  };

  return {
    dispatch,
    user,
    wigsData,
    wigsError,
    handleCreateWig,
    handleInputChange,
    handleCheckboxChange,
    handleRemoveWig,
    handleSaveWigUpdates,
    inputValue,
    setInputValue,
  };
};

export const useEditFocus = () => {
  const [editWigId, setEditWigId] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (id: string) => {
    setEditWigId(id);
  };

  useEffect(() => {
    if (editWigId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editWigId]);

  return { editWigId, setEditWigId, editInputRef, handleEdit };
};
