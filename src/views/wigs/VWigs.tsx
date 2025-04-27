import { getUserWigs, clearError } from "@/redux/slices/wigsSlice";
import { useEffect } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import WigsList from "../../components/wigs/WigsList";
import WigCreation from "@/components/wigs/WigCreation";
import { useWigsStore } from "@/hooks/hooks";

export default function Wigs() {
  const { dispatch, user, wigsError } = useWigsStore();

  useEffect(() => {
    dispatch(clearError());
    if (user) dispatch(getUserWigs());
  }, [dispatch, user]);

  return (
    <div className="flex max-w-2xl flex-col items-center justify-center gap-6">
      <h1 className="text-shadow mt-20 text-2xl font-semibold tracking-wide shadow-gray-700">
        Wildly Important Goals
      </h1>
      <div className="isolate flex aspect-video w-[450px] flex-col gap-5 rounded-lg bg-white/1 px-10 pt-8 pb-2 text-white/80 shadow-[0.3rem_0.3rem_15px_0_rgba(75,0,130,0.5)] ring-2 ring-indigo-300/5">
        <WigCreation />
        <WigsList />
        <ErrorMessage error={wigsError} />
      </div>
    </div>
  );
}
