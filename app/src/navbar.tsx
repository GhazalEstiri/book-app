import { ShoppingCart, Heart, User } from "lucide-react";
function Navbar() {
  return (
    <div className="navbar bg-[#e8e8e893] shadow-sm fixed flex justify-between pr-20 pl-20">
      <div className="flex flex-row justify-center items-center">
        <img src="book.png" alt="" width="50px" height="50px" />
        <a className="btn btn-ghost text-xl">Novella</a>
      </div>
      <div className="flex flex-row gap-5">
        <p>
          <ShoppingCart />
        </p>
        <p>
          <Heart />
        </p>
        <p>
          <User />
        </p>
      </div>
    </div>
  );
}
export default Navbar;
