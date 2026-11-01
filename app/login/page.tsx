"use client";
import { login, logout } from "@/features/auth/authSlice";
import { useState } from "react";
import { LockKeyhole, Mail, UserRound, Eye, EyeOff } from "lucide-react";
import type { FormEventHandler } from "react";
// import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Rootstate } from "@/lib/store";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const navigate=
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (name !== "Ghazal") {
      return;
    } else if (email !== "ghazal85.estiri2006@gmail.com") {
      return;
    } else if (password !== "123456789") {
      return;
    } else {
      dispatch(
        login({
          name,
          email,
          password,
        }),
      );
    }
  };
  const user = useSelector((state: Rootstate) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <section className="min-h-screen flex items-center justify-center w-full">
      <img src="bookLogin.jpg" alt="" className="inset-0 relative" />
      <div className="w-fit flex items-center justify-center px-7 py-10 sm:px-12 lg:px-20 mx-auto absolute z-100 bg-[#d9ad8398] rounded-2xl">
        {/* <div className="w-full max-w-[380px] mx-auto flex justify-center items-center"></div> */}
        {user !== null ? (
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#d9ad8398] flex items-center justify-center text-[#33231F]">
              <UserRound size={30} />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#33231F]">
                Hello <span className="text-[#3B3616]"> {user?.name}</span>
              </p>

              <p className="text-sm text-[#33231F] mt-2">
                You are successfully logged in.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-full bg-[#4C4531] text-white font-medium hover:bg-[#33231F] transition"
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="space-y-5 ">
              <div>
                <label className="block text-xs font-medium text-[#33231F] mb-2">
                  Name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33231F]"
                  />

                  <input
                    type="text"
                    value={name}
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#33231F] transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#33231F] mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33231F]"
                  />

                  <input
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#33231F] transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#33231F] mb-2">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#33231F]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-12 text-sm outline-none focus:border-[#33231F] transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#33231F] hover:text-[#173c5c]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-[#4C4531] text-white text-sm font-semibold shadow-md hover:bg-[#33231F] transition"
              >
                submit
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
