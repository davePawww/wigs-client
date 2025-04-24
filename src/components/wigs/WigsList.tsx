import { useEditFocus, useWigsStore } from "@/hooks/hooks";
import { IWigs } from "@/redux/slices/wigsSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FaPencil, FaRegFloppyDisk, FaRegTrashCan } from "react-icons/fa6";
import NoWigsAvailable from "./NoWigsAvailable";

export default function WigsList() {
  const {
    wigsData,
    handleInputChange,
    handleCheckboxChange,
    handleRemoveWig,
    handleSaveWigUpdates,
  } = useWigsStore();
  const { editWigId, setEditWigId, editInputRef, handleEdit } = useEditFocus();

  const handleUpdate = (wig: IWigs) => {
    handleSaveWigUpdates(wig);
    setEditWigId("");
  };

  if (!wigsData || wigsData.length === 0) {
    return <NoWigsAvailable />;
  }

  return (
    <>
      {wigsData?.length !== 0 &&
        wigsData?.map((wig) => (
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
