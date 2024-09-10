import { MdAdd, MdOutlineSearch } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { LogoHorizontal } from "../assets/LogoHorizontal";
import { TextInput } from "../form/TextInput";
import { Avatar } from "../ui/Avatar";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Menu } from "../ui/Menu";

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("text") ?? "");
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (searchText) {
      navigate("/search");
      setSearchParams({ text: searchText });
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <header className="h-[var(--header-height)] shrink-0 bg-agorium-800 sticky top-0 z-10 flex items-center justify-between px-[var(--page-padding-x)]">
      <LogoHorizontal />
      <TextInput.Root className="max-sm:hidden w-min min-w-[500px] max-w-full">
        <TextInput.Icon>
          <MdOutlineSearch />
        </TextInput.Icon>
        <TextInput.Input
          placeholder="Search Agorium..."
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
      </TextInput.Root>
      <div className="flex">
        <Link to="/new-incident" className="mr-6 max-sm:hidden">
          <Button>
            <MdAdd className="size-6 mr-2" /> Create
          </Button>
        </Link>
        <div className="flex items-center space-x-4 max-sm:hidden">
          <Avatar name={user!.name} />
          <p
            title={user!.name}
            className="hidden md:flex flex-1 max-w-52 truncate"
          >
            {printFirstAndLastName(user!.name)}
          </p>
        </div>
        <Link to="/new-incident" className="mr-3 max-md:flex hidden">
          <Button size="sm">
            <MdAdd className="size-6" />
          </Button>
        </Link>
        <Menu />
      </div>
    </header>
  );
}
