import Link from "next/link";
import { CloseSvg } from "../Svgs";
import type { ComponentProps } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useBoundStore } from "../../hooks/useBoundStore";
import { useRouter } from "next/router";
import { FacebookLogoSvg, GoogleLogoSvg } from "../Svgs";

export type LoginScreenState = "HIDDEN" | "LOGIN" | "SIGNUP";

export const useLoginScreen = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const queryState: LoginScreenState = (() => {
    if (loggedIn) return "HIDDEN";
    if ("login" in router.query) return "LOGIN";
    if ("sign-up" in router.query) return "SIGNUP";
    return "HIDDEN";
  })();

  const [loginScreenState, setLoginScreenState] = useState(queryState);
  useEffect(() => setLoginScreenState(queryState), [queryState]);
  return { loginScreenState, setLoginScreenState };
};

export const LoginScreen = ({
  loginScreenState,
  setLoginScreenState,
}: {
  loginScreenState: LoginScreenState;
  setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logIn = useBoundStore((x) => x.logIn);

  const setEmail = useBoundStore((x) => x.setEmail);
  const setName = useBoundStore((x) => x.setName);
  const setAge = useBoundStore((x) => x.setAge);

  const [ageTooltipShown, setAgeTooltipShown] = useState(false);

  const [localAge, setLocalAge] = useState("");
  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  useEffect(() => {
    if (loginScreenState !== "HIDDEN" && loggedIn) {
      setLoginScreenState("HIDDEN");
    }
  }, [loginScreenState, loggedIn, setLoginScreenState]);

  const logInAndSetUserProperties = () => {
    const number = parseFloat(localAge);
    if (!isNaN(number) && number > 0) {
      setAge(number);
      setName(localName);
      setEmail(localEmail);
      logIn();
      void router.push("/learn");
    }
  };

  const logInAndSetUserPropertiesAndRegisterLanguage = () => {
    const number = parseFloat(localAge);
    if (!isNaN(number) && number > 0) {
      setAge(number);
      setName(localName);
      setEmail(localEmail);
      logIn();
      void router.push("/register");
    }
  };

  return (
    <article
      className={[
        "fixed inset-0 z-30 flex flex-col bg-white p-7 transition duration-300",
        loginScreenState === "HIDDEN"
          ? "pointer-events-none opacity-0"
          : "opacity-100",
      ].join(" ")}
      aria-hidden={!loginScreenState}
    >
      <header className="flex flex-row-reverse justify-between sm:flex-row">
        <button
          className="flex text-gray-400"
          onClick={() => setLoginScreenState("HIDDEN")}
        >
          <CloseSvg />
          <span className="sr-only">Close</span>
        </button>
        <button
          className="hidden rounded-2xl border-2 border-b-4 border-gray-200 px-4 py-3 text-sm font-bold uppercase text-blue-400 transition hover:bg-gray-50 hover:brightness-90 sm:block"
          onClick={() =>
            setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
          }
        >
          {loginScreenState === "LOGIN" ? "Sign up" : "Login"}
        </button>
      </header>
      <div className="flex grow items-center justify-center">
        <div className="flex w-full flex-col gap-5 sm:w-96">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            {loginScreenState === "LOGIN" ? "Log in" : "Create your profile"}
          </h2>
          <div className="flex flex-col gap-2 text-black">
            {loginScreenState === "SIGNUP" && (
              <>
                <div className="relative flex grow">
                  <input
                    className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                    placeholder="Age"
                    value={localAge}
                    onChange={(e) => setLocalAge(e.target.value)}
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4">
                    <div
                      className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 text-gray-400"
                      onMouseEnter={() => setAgeTooltipShown(true)}
                      onMouseLeave={() => setAgeTooltipShown(false)}
                      onClick={() => setAgeTooltipShown((x) => !x)}
                      role="button"
                      tabIndex={0}
                      aria-label="Why do you need an age?"
                    >
                      ?
                      {ageTooltipShown && (
                        <div className="absolute top-full -right-5 z-10 w-72 rounded-2xl border-2 border-gray-200 bg-white p-4 text-center text-xs leading-5 text-gray-800">
                          Providing your age ensures you get the right Fluencia
                          experience. 
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <input
                  className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                  placeholder="Name"
                  value={localName}
                  onChange={e => setLocalName(e.target.value)}
                />
              </>
            )}
            <input
              className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
              placeholder="Email"
              value={localEmail}
              onChange={e => setLocalEmail(e.target.value)}
            />
            <div className="relative flex grow">
              <input
                className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
                placeholder="Password"
                type="password"
              />
              {loginScreenState === "LOGIN" && (
                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-5">
                  <Link
                    className="font-bold uppercase text-gray-400 hover:brightness-75"
                    href="/forgot-password"
                  >
                    Forgot?
                  </Link>
                </div>
              )}
            </div>
          </div>
          <button
            className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-110"
            onClick={loginScreenState === "LOGIN" ? logInAndSetUserProperties : logInAndSetUserPropertiesAndRegisterLanguage}
          >
            {loginScreenState === "LOGIN" ? "Log in" : "Create account"}
          </button>
          <div className="flex items-center gap-2">
            <div className="h-[2px] grow bg-gray-300"></div>
            <span className="font-bold uppercase text-gray-400">or</span>
            <div className="h-[2px] grow bg-gray-300"></div>
          </div>
          <div className="flex gap-5">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 border-gray-200 py-3 font-bold text-blue-900 transition hover:bg-gray-50 hover:brightness-90"
              onClick={logInAndSetUserProperties}
            >
              <FacebookLogoSvg className="h-5 w-5" /> Facebook
            </button>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-b-4 border-gray-200 py-3 font-bold text-blue-600 transition hover:bg-gray-50 hover:brightness-90"
              onClick={logInAndSetUserProperties}
            >
              <GoogleLogoSvg className="h-5 w-5" /> Google
            </button>
          </div>
          <p className="text-center text-xs leading-5 text-gray-400">
            By signing in to Fluencia, you agree to our Terms and Privacy.
          </p>
          <p className="text-center text-xs leading-5 text-gray-400">
            This site is protected by reCAPTCHA Enterprise and the Google{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/privacy"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              className="font-bold"
              href="https://policies.google.com/terms"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </p>
          <p className="block text-center sm:hidden">
            <span className="text-sm font-bold text-gray-700">
              {loginScreenState === "LOGIN"
                ? "Don't have an account?"
                : "Have an account?"}
            </span>{" "}
            <button
              className="text-sm font-bold uppercase text-blue-400"
              onClick={() =>
                setLoginScreenState((x) => (x === "LOGIN" ? "SIGNUP" : "LOGIN"))
              }
            >
              {loginScreenState === "LOGIN" ? "sign up" : "log in"}
            </button>
          </p>
        </div>
      </div>
    </article>
  );
};