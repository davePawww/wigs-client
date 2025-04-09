import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  createWig,
  getError as getWigsError,
  getWigs,
  IWigs,
  removeWig,
  updateWig,
  setError,
  getUserWigs,
  clearError,
} from "@/redux/slices/wigsSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashCan } from "react-icons/fa6";
import ErrorMessage from "@/components/ErrorMessage";
import { getUser } from "@/redux/slices/authSlice";

interface Wigs {
  _id: string;
  description: string;
  completed: boolean;
}

export default function Wigs() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(getUser);
  const wigsData = useSelector(getWigs);
  const wigsError = useSelector(getWigsError);
  const [inputValue, setInputValue] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleCreateWig = () => {
    dispatch(clearError());
    if (wigsData?.length === 4) {
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

    dispatch(createWig(newWig));
    setInputValue("");
  };

  const handleInputChange = (wig: IWigs, description: string) => {
    dispatch(clearError());
    dispatch(
      updateWig({
        _id: wig._id,
        description: description,
        completed: wig.completed,
      }),
    );
  };

  const handleCheckboxChange = (wig: IWigs) => {
    dispatch(clearError());
    dispatch(
      updateWig({
        _id: wig._id,
        description: wig.description,
        completed: !wig.completed,
      }),
    );
  };

  const handleRemoveWig = (id: string) => {
    dispatch(clearError());
    dispatch(removeWig(id));
  };

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      dispatch(getUserWigs());
    }
  }, [dispatch, user]);

  return (
    <div className="flex max-w-2xl flex-col items-center justify-center gap-6">
      <h1 className="mt-20 text-2xl font-semibold tracking-wide">
        Wildly Important Goals
      </h1>
      <div className="flex w-[450px] flex-col gap-5 rounded-lg border-2 border-neutral-700 p-4 text-white/80">
        <section className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="+ Add a Goal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="default"
            onClick={handleCreateWig}
            className="cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            + Create
          </Button>
        </section>
        {wigsData?.map((wig) => (
          <div
            key={wig._id}
            className="flex items-center space-x-2"
            onMouseEnter={() => setHoveredId(wig._id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <Checkbox
              id={wig._id}
              checked={wig.completed}
              onCheckedChange={() => handleCheckboxChange(wig)}
              className="data-[state=checked]:border-white/10 data-[state=checked]:bg-blue-600"
            />
            <Input
              disabled={wig.completed}
              type="text"
              value={wig.description}
              className={`border-none ${wig.completed && "line-through"}`}
              onChange={(e) => handleInputChange(wig, e.target.value)}
            />
            {hoveredId === wig._id && (
              <FaRegTrashCan
                onClick={() => handleRemoveWig(wig._id)}
                className="cursor-pointer text-red-500/50 transition-transform duration-200 ease-in-out hover:scale-110"
              />
            )}
          </div>
        ))}
        <ErrorMessage error={wigsError} />
      </div>
    </div>
  );
}
