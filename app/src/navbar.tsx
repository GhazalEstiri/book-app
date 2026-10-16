import { ShoppingCart, Heart, User } from "lucide-react";
import Link from "next/link";
function Navbar() {
  return (
    <div className="navbar bg-[#e8e8e893] shadow-sm fixed flex justify-between pr-20 pl-20">
      <div className="flex flex-row justify-center items-center">
        <img src="book.png" alt="" width="50px" height="50px" />
        <Link className="btn btn-ghost text-xl" href="/">Novella</Link>
      </div>
      <div className="flex flex-row gap-5">
        <Link href="/shopping">
          <ShoppingCart />
        </Link>
        <Link href="/favorite">
          <Heart />
        </Link>
        <Link href="/login">
          <User />
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
