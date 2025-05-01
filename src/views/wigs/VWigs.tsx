import { getUserWigs, clearError } from "@/redux/slices/wigsSlice";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import WigsList from "../../components/wigs/WigsList";
import WigCreation from "@/components/wigs/WigCreation";
import { useWigsStore } from "@/hooks/hooks";
import { getRandomTip } from "@/lib/advice";

export default function Wigs() {
  const { dispatch, user, wigsError } = useWigsStore();
  const [tip] = useState(getRandomTip());

  useEffect(() => {
    dispatch(clearError());
    if (user) dispatch(getUserWigs());
  }, [dispatch, user]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 py-8">
      <h1 className="text-shadow text-2xl font-semibold tracking-wide shadow-gray-700">
        Wildly Important Goals
      </h1>
      <div className="isolate flex aspect-video w-[450px] flex-col gap-5 rounded-lg bg-white/1 px-10 pt-8 pb-2 text-white/80 shadow-[0.3rem_0.3rem_15px_0_rgba(75,0,130,0.5)] ring-2 ring-indigo-300/5">
        <WigCreation />
        <WigsList />
        <ErrorMessage error={wigsError} />
      </div>
      <cite className="max-w-sm flex-col items-center justify-center">
        <p className="text-sm text-gray-500 italic">{tip.quote}</p>
        <p className="text-right text-sm text-gray-500">- {tip.author}</p>
      </cite>
    </div>
  );
}
