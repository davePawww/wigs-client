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
      <h1 className="mt-20 text-2xl font-semibold tracking-wide">
        Wildly Important Goals
      </h1>
      <div className="flex w-[450px] flex-col gap-5 rounded-lg border-2 border-neutral-700 p-4 text-white/80">
        <WigCreation />
        <WigsList />
        <ErrorMessage error={wigsError} />
      </div>
    </div>
  );
}
