// import { useCheckAuth } from "@/hooks/hooks";

import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { usePersistedState } from "@/hooks/hooks";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

const initialWigs = [
  {
    id: "1",
    description: "Gym",
    completed: true,
  },
  {
    id: "2",
    description: "Code",
    completed: false,
  },
  {
    id: "3",
    description: "Read",
    completed: true,
  },
];

interface Wigs {
  id: string;
  description: string;
  completed: boolean;
}

export default function Wigs() {
  // const { user } = useCheckAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (status === "success" || status === "error") {
  //     if (!user) {
  //       navigate("/auth/login", { replace: true });
  //     }
  //   }
  // }, [user, navigate, status]);

  const [wigs, setWigs] = usePersistedState<Wigs[]>("wigs", initialWigs);
  const [newWigs, setNewWigs] = useState("");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

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
      id: uuidv4(),
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
        wig.id === id ? { ...wig, description: updatedWig.trim() } : wig,
      ),
    );
    setError(undefined);
  };

  const handleCheckboxChange = (id: string) => {
    setWigs((prev) =>
      prev
        .map((wig) =>
          wig.id === id ? { ...wig, completed: !wig.completed } : wig,
        )
        .sort((a, b) => Number(a.completed) - Number(b.completed)),
    );
    setError(undefined);
  };

  const handleRemoveWig = (id: string) => {
    setWigs((prev) => prev.filter((wig) => wig.id !== id));
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
            return (
              <div
                className="flex items-center space-x-2"
                key={wig.id}
                onMouseEnter={() => setHoverId(wig.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <Checkbox
                  id={wig.id.toString()}
                  checked={wig.completed}
                  onCheckedChange={() => handleCheckboxChange(wig.id)}
                  className="data-[state=checked]:border-white/10 data-[state=checked]:bg-blue-600"
                />
                <Input
                  disabled={wig.completed}
                  type="text"
                  value={wig.description}
                  className={`border-none ${wig.completed && "line-through"}`}
                  onChange={(e) => handleUpdateWig(wig.id, e.target.value)}
                />
                {hoverId === wig.id && (
                  <FaRegTrashCan
                    onClick={() => handleRemoveWig(wig.id)}
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
