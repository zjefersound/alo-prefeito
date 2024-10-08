import {
  MdOutlineHome,
  MdOutlineLibraryBooks,
} from "react-icons/md";
import { Card } from "../ui/Card";
import { Link } from "react-router-dom";

export const NAVIGATION_ITEMS = [
  {
    path: "/",
    Icon: MdOutlineHome,
    label: "Home",
  },
  {
    path: "/categories",
    Icon: MdOutlineLibraryBooks,
    label: "Categorias",
  },
];

export function NavigationCard() {
  return (
    <Card>
      <nav>
        <ul className="space-y-3">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <div className="flex items-center font-bold h-8 rounded text-orange-300 -mx-2 px-2 hover:bg-agorium-700">
                  <item.Icon className="size-6 mr-3" /> {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
}
