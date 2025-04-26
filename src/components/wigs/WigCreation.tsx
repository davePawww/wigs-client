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
        className="border-white/10 shadow-lg"
      />
      <Button
        variant="default"
        onClick={handleCreateWig}
        className="cursor-pointer bg-blue-600 shadow-xs ring-1 shadow-blue-300/50 ring-blue-800 hover:bg-blue-800"
      >
        + Create
      </Button>
    </section>
  );
}
