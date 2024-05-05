import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex gap-1">
      <Input placeholder="Buscar restaurantes" className="border-none" />
      <Button size="icon" className="w-12">
        <SearchIcon size={18} />
      </Button>
    </div>
  );
}
