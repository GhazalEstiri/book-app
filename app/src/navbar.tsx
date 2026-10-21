import { ShoppingCart, Heart, User } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
// import { useSelector } from "react-redux";
// import type { Rootstate } from "@/lib/store";
// import Shopping from "../shopping/page";
function Navbar() {
  // const cart = useSelector((state: Rootstate) => state.add.cart);

  return (
    <div className="navbar bg-background shadow-sm fixed flex justify-between pr-20 pl-20 text-primary z-20">
      <div className="flex flex-row justify-center items-center">
        <img src="book.png" alt="" width="50px" height="50px" />
        <Link className="btn btn-ghost text-xl text-primary" href="/">
          Novella
        </Link>
      </div>
      <div className="flex flex-row gap-5 text-primary">
        {/* <p>{cart.length}</p> */}
        <Link href="/shopping">
          <ShoppingCart />
        </Link>
        <Link href="/favorite">
          <Heart />
        </Link>
        <Link href="/login">
          <User />
        </Link>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
export default Navbar;
