import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWigsStore } from "@/hooks/hooks";

export default function WigCreation() {
  const { inputValue, setInputValue, handleCreateWig } = useWigsStore();

  return (
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
  );
}
