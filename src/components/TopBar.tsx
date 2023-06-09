import dayjs from "dayjs";
import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { useBoundStore } from "../hooks/useBoundStore";
import { Calendar } from "./Calendar";
import { Flag } from "./Flag";
import {
  FireSvg,
  GemSvg,
  GlobeIconSvg,
  GemsTreasureChestSvg,
  MoreOptionsSvg,
  PodcastIconSvg,
  EmptyFireTopBarSvg,
  EmptyGemTopBarSvg,
  AddLanguageSvg
} from "./Svgs";

type MenuState = "HIDDEN" | "LANGUAGES" | "STREAK" | "GEMS" | "MORE";

export const TopBar = ({
  backgroundColor = "bg-[#58cc02]",
  borderColor = "border-[#46a302]",
}: {
  backgroundColor?: `bg-${string}`;
  borderColor?: `border-${string}`;
}) => {
  const [menu, setMenu] = useState<MenuState>("HIDDEN");
  const [now, setNow] = useState(dayjs());
  const streak = useBoundStore((x) => x.streak);
  const gems = useBoundStore((x) => x.gems);
  const language = useBoundStore((x) => x.currentLanguage);
  const learningLanguages = useBoundStore((x) => x.learningLanguages);
  const setCurrentLanguage = useBoundStore((x) => x.setCurrentLanguage);

  return (
    <header className="fixed z-20 h-[58px] w-full">
      <div
        className={`relative flex h-full w-full items-center justify-between border-b-2 px-[10px] transition duration-500 sm:hidden ${borderColor} ${backgroundColor}`}
      >
        <button
          onClick={() =>
            setMenu((x) => (x === "LANGUAGES" ? "HIDDEN" : "LANGUAGES"))
          }
        >
          <span className={"font-bold text-black opacity-20"}>
            {language.name}
          </span>
          <span className="sr-only">See languages</span>
        </button>

        <button
          className="flex items-center gap-2 font-bold text-white"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
          aria-label="Toggle streak menu"
        >
          {streak > 0 ? <FireSvg /> : <EmptyFireTopBarSvg />}{" "}
          <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>
            {streak}
          </span>
        </button>

        <button
          className="flex items-center gap-2 font-bold"
          onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
          aria-label="Toggle gem menu"
        >
          {gems > 0 ? <GemSvg /> : <EmptyGemTopBarSvg />}{" "}
          <span className={gems > 0 ? "text-white" : "text-black opacity-20"}>
            {gems}
          </span>
        </button>

        {/* <MoreOptionsSvg
          // onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
          onClick={() => setMenu((x) => (x === "HIDDEN"))}
          role="button"
          tabIndex={0}
          aria-label="Toggle more menu"
        /> */}

        <div
          className={[
            "absolute left-0 right-0 top-full bg-white transition duration-300",
            menu === "HIDDEN" ? "opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "LANGUAGES":
                return (
                  <div className="flex flex-col gap-5 p-5">
                    {learningLanguages.map((language) => (
                      <button
                        className="flex w-full items-center gap-3 px-5 py-3 text-left font-bold hover:bg-gray-100 text-gray-400"
                        onClick={() => {setCurrentLanguage(language); setMenu("HIDDEN")}}
                        key={language.code}
                      >
                        <span>{language.name}</span>
                      </button>
                    ))}
                    <Link
                      className="flex items-center justify-between gap-2"
                      href="/register"
                    >
                      <div className="rounded-2xl border-4 border-white">
                        <AddLanguageSvg className="h-16 w-20" />
                      </div>
                      <span className="font-bold text-gray-400">Courses</span>
                    </Link>
                  </div>
                );

              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5">
                    <h2 className="text-xl font-bold">Streak</h2>
                    <p className="text-sm text-gray-400">
                      {`Practice each day so your streak won't reset!`}
                    </p>
                    <div className="self-stretch">
                      <Calendar now={now} setNow={setNow} />
                    </div>
                  </div>
                );

              case "GEMS":
                return (
                  <div className="flex grow items-center gap-3 p-5">
                    <GemsTreasureChestSvg className="h-24 w-24" />
                    <div className="flex flex-col gap-3">
                      <h2 className="text-xl font-bold text-black">Gems</h2>
                      <p className="text-sm font-normal text-gray-400">
                        You have {gems} {gems === 1 ? "gem" : "gems"}.
                      </p>
                      <Link
                        className="font-bold uppercase text-blue-400 transition hover:brightness-110"
                        href="/shop"
                      >
                        Go to shop
                      </Link>
                    </div>
                  </div>
                );

              case "MORE":
                return <div className="flex grow flex-col"></div>;

              case "HIDDEN":
                return null;
            }
          })()}
          <div
            className={[
              "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
              menu === "HIDDEN" ? "pointer-events-none" : "",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Hide menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
};
