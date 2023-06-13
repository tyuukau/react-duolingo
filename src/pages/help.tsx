import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { TopBar } from "~/components/navigation/TopBar";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { useBoundStore } from "../hooks/useBoundStore";

import ProfileTopBar from "./profile";

const Help: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab="Profile" />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 px-4 py-7 pb-20">
          <section>
            <div className="flex flex-row justify-between">
              <h1 className="mb-5 text-2xl font-bold">Help Center</h1>
              <div className="flex flex-row space-x-4">
                <Link
                  href="/profile"
                  className="items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
                >
                  Back
                </Link>
              </div>
            </div>
          </section>
          <div className="mb-5 flex justify-center gap-6">
            <div className="flex w-full max-w-4xl flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-800">
                About This App
              </h2>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
            </div>
          </div>
          <div className="mb-5 flex justify-center gap-6">
            <div className="flex w-full max-w-4xl flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-800">Who Are We</h2>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
            </div>
          </div>
          <div className="mb-5 flex justify-center gap-6">
            <div className="flex w-full max-w-4xl flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-800">Another Thing</h2>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
              <p className="text-gray-400">
                Ipsum dolor sit amet inter dolor, sed diam nonum et justo ut et
                dolor. Null a ante ipsum dolor. Sipum dolor, sed diam nonum et
                justo.
              </p>
              <div className="flex gap-5">
                <div className="grow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Profile" />
    </div>
  );
};

export default Help;
