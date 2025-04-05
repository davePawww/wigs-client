import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCheckAuth } from "@/hooks/hooks";
import { getItem } from "@/lib/utils";
import { fetchWigs } from "@/redux/slices/wigsSlice";
import { AppDispatch } from "@/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const initialWigs = [
  {
    _id: uuidv4(),
    description: "Gym",
    completed: true,
  },
  {
    _id: uuidv4(),
    description: "Code",
    completed: false,
  },
  {
    _id: uuidv4(),
    description: "Read",
    completed: true,
  },
];

interface Wigs {
  _id: string;
  description: string;
  completed: boolean;
}

export default function Wigs() {
  const { user } = useCheckAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [wigs, setWigs] = useState<Wigs[]>([]);
  const [newWigs, setNewWigs] = useState("");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await dispatch(fetchWigs(user._id))
          .then(unwrapResult)
          .then((result) => {
            if (result.success) {
              setWigs(result.wigs);
            }
          });
      } else {
        setWigs(getItem("wigs") || initialWigs);
      }
    };

    fetchData();
  }, [setWigs, user, dispatch]);

  const handleCreateWig = () => {
    if (wigs.length === 4) {
      setError("You can only have 4 WIGS");
      return;
    }

    if (newWigs.trim() === "") {
      setError("WIGS cannot be empty");
      return;
    }

    const newWig = {
      _id: uuidv4(),
      description: newWigs,
      completed: false,
    };

    setWigs((prev) =>
      [...prev, newWig].sort(
        (a, b) => Number(a.completed) - Number(b.completed),
      ),
    );
    setNewWigs("");
    setError(undefined);
  };

  const handleUpdateWig = (id: string, updatedWig: string) => {
    setWigs((prev) =>
      prev.map((wig) =>
        wig._id === id ? { ...wig, description: updatedWig.trim() } : wig,
      ),
    );
    setError(undefined);
  };

  const handleCheckboxChange = (id: string) => {
    setWigs((prev) =>
      prev
        .map((wig) =>
          wig._id === id ? { ...wig, completed: !wig.completed } : wig,
        )
        .sort((a, b) => Number(a.completed) - Number(b.completed)),
    );
    setError(undefined);
  };

  const handleRemoveWig = (id: string) => {
    setWigs((prev) => prev.filter((wig) => wig._id !== id));
    setError(undefined);
  };

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
            value={newWigs}
            onChange={(e) => setNewWigs(e.target.value)}
          />
          <Button
            variant="default"
            onClick={handleCreateWig}
            className="cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            + Create
          </Button>
        </section>

        <section className="flex flex-col gap-3 px-2">
          {wigs.map((wig) => {
            console.log(wig);
            return (
              <div
                key={wig._id}
                className="flex items-center space-x-2"
                onMouseEnter={() => setHoverId(wig._id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <Checkbox
                  id={wig._id}
                  checked={wig.completed}
                  onCheckedChange={() => handleCheckboxChange(wig._id)}
                  className="data-[state=checked]:border-white/10 data-[state=checked]:bg-blue-600"
                />
                <Input
                  disabled={wig.completed}
                  type="text"
                  value={wig.description}
                  className={`border-none ${wig.completed && "line-through"}`}
                  onChange={(e) => handleUpdateWig(wig._id, e.target.value)}
                />
                {hoverId === wig._id && (
                  <FaRegTrashCan
                    onClick={() => handleRemoveWig(wig._id)}
                    className="cursor-pointer text-red-500/50 transition-transform duration-200 ease-in-out hover:scale-110"
                  />
                )}
              </div>
            );
          })}
        </section>
        <ErrorMessage error={error} />
      </div>
    </div>
  );
}
