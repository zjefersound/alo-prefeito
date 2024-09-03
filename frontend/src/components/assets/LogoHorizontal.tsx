import { Logo } from "./Logo";

export function LogoHorizontal() {
  return (
    <div className="flex items-center">
      <Logo />
      <p className="font-serif font-bold text-[2rem] line-clamp-1 ml-6">
        Fala <span className="text-orange-300">cidade</span>
      </p>
    </div>
  );
}
