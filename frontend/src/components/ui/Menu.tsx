import { useState } from "react";
import { Drawer } from "./Drawer";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { printFirstAndLastName } from "../../utils/printFirstAndLastName";
import { Avatar } from "./Avatar";
import { MdOutlineHome, MdOutlineLibraryBooks } from "react-icons/md";

const defaultMenus = [
  {
    path: "/",
    Icon: MdOutlineHome,
    label: "Home",
  },
  {
    path: "/rides",
    Icon: MdOutlineLibraryBooks,
    label: "Categorias",
  },
];

export function Menu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer.Hamburger setOpen={setOpen} />
      <Drawer.Root open={open}>
        <Drawer.Header setOpen={setOpen} />
        <Link
          to="/profile"
          className="flex items-center space-x-4 bg-agorium-700 mx-2 mt-4 p-3 rounded-md"
        >
          <Avatar name={user!.name} />
          <div>
            <p title={user!.name} className="flex flex-1 max-w-52 truncate">
              {printFirstAndLastName(user!.name)}
            </p>
            <span className="text-xs text-agorium-400">{user!.email}</span>
          </div>
        </Link>
        <div className="py-4 flex flex-col flex-1 overflow-y-auto">
          {defaultMenus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              className="flex items-center space-x-2 px-3 py-2 transition-all hover:bg-agorium-700 active:bg-agorium-600"
            >
              <menu.Icon className="h-6 w-6 text-orange-300" />{" "}
              <p>{menu.label}</p>
            </Link>
          ))}
        </div>
      </Drawer.Root>
    </>
  );
}
