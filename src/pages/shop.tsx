import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useBoundStore } from "../hooks/useBoundStore";

import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { RightBar } from "../components/navigation/RightBar";
import { TopBar } from "../components/navigation/TopBar";

import { DoubleOrNothingSvg, EmptyGemSvg, StreakFreezeSvg } from "~/components/Svgs";

const Shop: NextPage = () => {
  const streakFreezes = 0;

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
      <LeftBar selectedTab="Shop" />

      <div className="flex justify-center gap-3 lg:gap-12 pt-14 sm:pt-10 sm:p-6 md:ml-24 lg:ml-64">
        <div className="px-4 pb-20">
          <div className="py-7">
            <h1 className="mb-5 text-2xl font-bold">Power-ups</h1>
            <div className="flex border-t-2 border-gray-200 py-5">
              <StreakFreezeSvg className="shrink-0" />
              <section className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Streak Freeze</h3>
                <p className="text-sm text-gray-500">
                  Streak Freeze allows your streak to remain in place for one
                  full day of inactivity.
                </p>
                <div className="w-fit rounded-full bg-gray-200 py-1 px-3 text-sm font-bold uppercase text-gray-400">
                  {streakFreezes} / 2 equipped
                </div>
                <button
                  className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white py-2 px-4 text-sm font-bold uppercase text-gray-300"
                  disabled
                >
                  Get one for: <EmptyGemSvg /> 10
                </button>
              </section>
            </div>
            <div className="flex border-t-2 border-b-2 border-gray-200 py-5">
              <DoubleOrNothingSvg className="shrink-0" />
              <section className="flex flex-col gap-3">
                <h3 className="text-lg font-bold">Double or Nothing</h3>
                <p className="text-sm text-gray-500">
                  Attempt to double your five gem wager by maintaining a
                  seven day streak.
                </p>
                <button
                  className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white py-2 px-4 text-sm font-bold uppercase text-gray-300"
                  disabled
                >
                  Get for: <EmptyGemSvg /> 5
                </button>
              </section>
            </div>
          </div>
        </div>
        <RightBar />
      </div>

      <BottomBar selectedTab="Shop" />
    </div>
  );
};

export default Shop;
