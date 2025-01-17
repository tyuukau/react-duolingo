import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import type { LoginScreenState } from "../components/screens/LoginScreen";
import { LoginScreen } from "../components/screens/LoginScreen";

const ForgotPassword: NextPage = () => {
  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");
  const [mobileMenuShown, setMobileMenuShown] = useState(false);
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="flex h-[70px] w-full justify-center bg-blue-400 font-bold text-white">
        <div className="flex max-w-5xl grow items-center justify-between px-5">
          <Link className="text-3xl" href="/">
            fluencia
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            <button
              className="rounded-2xl border-b-4 border-blue-300 bg-white py-2 px-4 uppercase text-blue-800 transition hover:brightness-110"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              Login
            </button>
            <Link
              href="/register"
              className="rounded-2xl border-b-4 border-green-600 bg-green-500 py-2 px-4 uppercase text-white transition hover:brightness-110"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
      <div className="flex w-full grow flex-col items-center gap-5 px-5 pt-5 sm:w-96 sm:pt-52">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Forgot password
        </h1>
        <p className="text-center text-gray-800">
          We will send you instructions on how to reset your password by email.
        </p>
        <div className="flex w-full flex-col gap-2">
          <input
            className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
            placeholder="Email"
          />
          <button className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-110">
            Submit
          </button>
        </div>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </div>
  );
};

export default ForgotPassword;
