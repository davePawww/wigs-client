import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  createWig,
  getError as getWigsError,
  IWigs,
  removeWig,
  updateWig,
  setError,
  getUserWigs,
  clearError,
  createWigAsync,
  updateWigAsync,
  deleteWigAsync,
  getAuthenticatedWigs,
  getUnauthenticatedWigs,
  saveUpdatedWigAsync,
} from "@/redux/slices/wigsSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashCan, FaPencil, FaRegFloppyDisk } from "react-icons/fa6";
import ErrorMessage from "@/components/ErrorMessage";
import { getUser } from "@/redux/slices/authSlice";

const MAX_WIGS = 4;

export default function Wigs() {
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
      await dispatch(getUserWigs());
    }
  };

  const handleRemoveWig = (id: string) => {
    dispatchAction(user ? deleteWigAsync(id) : removeWig(id));
  };

  const handleSaveWigUpdates = (wig: IWigs) => {
    if (user) dispatch(saveUpdatedWigAsync(wig));
  };

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

        <WigsList
          wigs={wigsData}
          handleCheckboxChange={handleCheckboxChange}
          handleInputChange={handleInputChange}
          handleRemoveWig={handleRemoveWig}
          handleSaveWigUpdates={handleSaveWigUpdates}
        />
        <ErrorMessage error={wigsError} />
      </div>
    </div>
  );
}

function WigsList({
  wigs,
  handleCheckboxChange,
  handleInputChange,
  handleRemoveWig,
  handleSaveWigUpdates,
}: {
  wigs: IWigs[] | undefined;
  handleCheckboxChange: (wig: IWigs) => void;
  handleInputChange: (wig: IWigs, description: string) => void;
  handleRemoveWig: (id: string) => void;
  handleSaveWigUpdates: (wig: IWigs) => void;
}) {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [editWigId, setEditWigId] = useState("");

  const handleEdit = (id: string) => {
    setEditWigId(id);
  };

  const handleUpdate = (wig: IWigs) => {
    handleSaveWigUpdates(wig);
    setEditWigId("");
  };

  useEffect(() => {
    if (editWigId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editWigId]);

  if (!wigs || wigs.length === 0) {
    return <NoWigsAvailable />;
  }

  return (
    <>
      {wigs?.length !== 0 &&
        wigs?.map((wig) => (
          <div key={wig._id} className="flex items-center space-x-2">
            <Checkbox
              id={wig._id}
              checked={wig.completed}
              onCheckedChange={() => handleCheckboxChange(wig)}
              className="data-[state=checked]:border-white/10 data-[state=checked]:bg-blue-600"
            />

            {editWigId === wig._id ? (
              <>
                <Input
                  disabled={wig.completed}
                  type="text"
                  ref={editInputRef}
                  value={wig.description}
                  className={`border-none ${wig.completed && "line-through"}`}
                  onChange={(e) => handleInputChange(wig, e.target.value)}
                />
                <FaRegFloppyDisk onClick={() => handleUpdate(wig)} />
              </>
            ) : (
              <>
                <p
                  className={`w-full p-2 text-sm ${wig.completed && "text-white/50 line-through"}`}
                >
                  {wig.description}
                </p>
                <FaPencil onClick={() => handleEdit(wig._id)} />
              </>
            )}

            <FaRegTrashCan
              onClick={() => handleRemoveWig(wig._id)}
              className="cursor-pointer text-red-500/50 transition-transform duration-200 ease-in-out hover:scale-120"
            />
          </div>
        ))}
    </>
  );
}

function NoWigsAvailable() {
  return (
    <p className="text-center text-gray-500">
      No WIGs available. Add one above!
    </p>
  );
}
