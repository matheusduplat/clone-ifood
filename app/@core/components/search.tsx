"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export function Search() {
  const route = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) return;
    route.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-1" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleSearch}
        value={search}
      />
      <Button size="icon" className="w-12" type="submit">
        <SearchIcon size={18} />
      </Button>
    </form>
  );
}
