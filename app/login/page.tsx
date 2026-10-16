"use client";
import { login } from "@/features/auth/authSlice";
import { useState } from "react";
import type { FormEventHandler } from "react";
// import Navbar from "../src/navbar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, Rootstate } from "@/lib/store";
export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  return (
    <section>
      <div>
        {user !== null ? (
          <div>
            <p>hello {user?.name}</p>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={()=>handleSubmit}>submit</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
