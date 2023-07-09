import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  BronzeLeagueSvg,
  EmptyFireSvg,
  EmptyGemSvg,
  FireSvg,
  GemSvg,
  LightningProgressSvg,
  GemsTreasureChestSvg,
  TreasureProgressSvg,
  TreasureClosedSvg,
} from "../Svgs";
import { Calendar } from "../Calendar";
import { useBoundStore } from "../../hooks/useBoundStore";
import { Flag } from "../Flag";
import type { LoginScreenState } from "../screens/LoginScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { useLeaderboardRank } from "../../hooks/useLeaderboard";

import { useMutation } from "react-query";

export const RightBar = () => {
  const token = useBoundStore((x) => x.token);
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const gems = useBoundStore((x) => x.gems);
  const streak = useBoundStore((x) => x.streak);
  const language = useBoundStore((x) => x.currentLanguage);
  const learningLanguages = useBoundStore((x) => x.learningLanguages);
  const setCurrentLanguage = useBoundStore((x) => x.setCurrentLanguage);
  const lessonsCompleted = useBoundStore((x) => x.globalLessonsCompleted);

  const [languagesShown, setLanguagesShown] = useState(false);

  const [streakShown, setStreakShown] = useState(false);
  const [now, setNow] = useState(dayjs());

  const [gemsShown, setGemsShown] = useState(false);

  const [loginScreenState, setLoginScreenState] =
    useState<LoginScreenState>("HIDDEN");

  const setCurrentLanguageMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/courses/languages/set_current/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
  );

  const setCurrentLanguageHandler = async (language) => {
    try {
      const languageCode = language.code;
      const languageProfileData = await setCurrentLanguageMutation.mutateAsync({ language_code: languageCode });
      setCurrentLanguage(languageProfileData.current_language);
      console.log('Language set as current language successfully');
    } catch (error) {
      console.error('Failed to set language as current language:', error);
    }
  };

  useEffect(() => {
    if (!language) {
      void router.push("/register");
    }
  });

  return (
    <>
      <aside className="sticky top-0 hidden w-80 lg:w-88 xl:w-96 flex-col gap-6 self-start sm:flex">
        <article className="my-6 flex justify-between gap-4">
          <div
            className="relative flex cursor-default items-center gap-2 rounded-xl p-3 font-bold uppercase text-gray-500 hover:bg-gray-100"
            onMouseEnter={() => setLanguagesShown(true)}
            onMouseLeave={() => setLanguagesShown(false)}
            onClick={() => setLanguagesShown((x) => !x)}
            role="button"
            tabIndex={0}
          >
            {/* <Flag language={language} width={45} /> */}
            <div>{language.name}</div>
            <div
              className="absolute top-full z-10 rounded-2xl border-2 border-gray-300 bg-white"
              style={{
                left: "calc(50% - 150px)",
                width: 300,
                display: languagesShown ? "block" : "none",
              }}
            >
              <h2 className="px-5 py-3 font-bold uppercase text-gray-400">
                My courses
              </h2>
              {learningLanguages.map((language) => (
                <button
                  className="flex w-full items-center gap-3 border-t-2 border-gray-300 px-5 py-3 text-left font-bold hover:bg-gray-100"
                  onClick={() => setCurrentLanguageHandler(language)}
                  key={language.code}
                >
                  <span>{language.name}</span>
                </button>
              ))}
              <Link
                className="flex w-full items-center gap-3 rounded-b-2xl border-t-2 border-gray-300 px-5 py-3 text-left font-bold hover:bg-gray-100"
                href="/register"
              >
                <span className="flex items-center justify-center rounded-lg border-2 border-gray-400 px-2 text-lg font-bold text-gray-400">
                  +
                </span>
                <span className="text-gray-600">Add new course</span>
              </Link>
            </div>
          </div>
          <span
            className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-orange-500 hover:bg-gray-100"
            onMouseEnter={() => setStreakShown(true)}
            onMouseLeave={() => {
              setStreakShown(false);
              setNow(dayjs());
            }}
            onClick={(event) => {
              if (event.target !== event.currentTarget) return;
              setStreakShown((x) => !x);
              setNow(dayjs());
            }}
            role="button"
            tabIndex={0}
          >
            <div className="pointer-events-none">
              {streak > 0 ? <FireSvg /> : <EmptyFireSvg />}
            </div>
            <span className={streak > 0 ? "text-orange-500" : "text-gray-300"}>
              {streak}
            </span>
            <div
              className="absolute top-full z-10 flex flex-col gap-5 rounded-2xl border-2 border-gray-300 bg-white p-5 text-black"
              style={{
                left: "calc(50% - 200px)",
                width: 400,
                display: streakShown ? "flex" : "none",
              }}
            >
              <h2 className="text-center text-lg font-bold">Streak</h2>
              <p className="text-center text-sm font-normal text-gray-400">
                {`But your streak will reset tomorrow if you don't practice tomorrow. Watch out!`}
              </p>
              <Calendar now={now} setNow={setNow} />
            </div>
          </span>
          <span
            className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-red-500 hover:bg-gray-100"
            onMouseEnter={() => setGemsShown(true)}
            onMouseLeave={() => setGemsShown(false)}
            onClick={() => setGemsShown((x) => !x)}
            role="button"
            tabIndex={0}
          >
            {gems > 0 ? <GemSvg /> : <EmptyGemSvg />}
            <span className={gems > 0 ? "text-red-500" : "text-gray-300"}>
              {gems}
            </span>
            <div
              className="absolute top-full z-10 flex w-72 items-center gap-3 rounded-2xl border-2 border-gray-300 bg-white p-5"
              style={{
                left: "calc(50% - 150px)",
                display: gemsShown ? "flex" : "none",
              }}
            >
              <GemsTreasureChestSvg className="w-24" />
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-black">Gems</h2>
                <p className="text-sm font-normal text-gray-400">
                  You have {gems} {gems === 1 ? "gem" : "gems"}.
                </p>
                <Link
                  className="uppercase text-blue-400 transition hover:brightness-110"
                  href="/shop"
                >
                  Go to shop
                </Link>
              </div>
            </div>
          </span>
        </article>
        {loggedIn && lessonsCompleted < 10 ? (
          <UnlockLeaderboardsSection />
        ) : loggedIn && lessonsCompleted >= 10 ? (
          <LeaderboardRankSection />
        ) : null}
        <DailyQuestsSection />
        <XpProgressSection />
        {!loggedIn && (
          <CreateAProfileSection setLoginScreenState={setLoginScreenState} />
        )}
      </aside>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};

const UnlockLeaderboardsSection = () => {
  const lessonsCompleted = useBoundStore((x) => x.globalLessonsCompleted);

  if (lessonsCompleted >= 3) {
    return null;
  }

  const lessonsNeededToUnlockLeaderboards = 3 - lessonsCompleted;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 text-gray-700">
      <h2 className="text-xl font-bold">Unlock Leaderboards!</h2>
      <div className="flex items-center gap-6">
        <LockedLeaderboardsSvg />
        <p className="text-sm leading-6 text-gray-500">
          Complete {lessonsNeededToUnlockLeaderboards} more lesson
          {lessonsNeededToUnlockLeaderboards === 1 ? "" : "s"} to start
          competing
        </p>
      </div>
    </article>
  );
};

const LeaderboardRankSection = () => {
  const xpThisWeek = useBoundStore((x) => x.xpThisWeek());
  const rank = useLeaderboardRank();
  const leaderboardLeague = "Bronze League";
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 text-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{leaderboardLeague}</h2>
        <Link href="/leaderboard" className="font-bold uppercase text-blue-400">
          View league
        </Link>
      </div>
      <div className="flex gap-6">
        <BronzeLeagueSvg />
        <div className="flex flex-col gap-5">
          {rank !== null && (
            <p className="text-lg font-bold text-gray-700">
              {`You're ranked #${rank}`}
            </p>
          )}
          <p className="text-sm leading-6 text-gray-500">
            You earned {xpThisWeek} XP this week so far
          </p>
        </div>
      </div>
    </article>
  );
};

const DailyQuestsSection = () => {
  const xpToday = useBoundStore((x) => x.xpToday());
  const goalXp = useBoundStore((x) => x.goalXp);
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold text-gray-700">
      <h2 className="text-xl">Daily Quests</h2>
      <div className="flex items-center gap-4">
        <LightningProgressSvg />
        <div className="flex flex-col gap-2">
          <h3>Earn {goalXp} XP</h3>
          <div className="flex items-center">
            <div className="relative h-5 w-52 rounded-l-full bg-gray-200">
              <div
                className={[
                  "relative h-full rounded-l-full bg-yellow-400",
                  xpToday === 0 ? "" : "px-2",
                ].join(" ")}
                style={{ width: `${Math.min(1, xpToday / goalXp) * 100}%` }}
              >
                <div className="absolute left-2 right-0 top-1 h-2 rounded-l-full bg-yellow-300"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center text-sm text-gray-400">
                {xpToday} / {goalXp}
              </div>
            </div>
            <TreasureProgressSvg />
          </div>
        </div>
      </div>
    </article>
  );
};

const LockedLeaderboardsSvg = () => {
  return (
    <svg width="40" height="46" viewBox="0 0 40 46" fill="none">
      <path
        d="M6.82875 3.41476L33.1701 3.41476C36.9418 3.41476 39.9993 6.47231 39.9993 10.244V26.3415C39.9993 36.8483 31.4819 45.3658 20.975 45.3658H19.0238C8.51698 45.3658 -0.000488281 36.8483 -0.000488281 26.3415L-0.000488281 10.244C-0.000488281 6.47231 3.05707 3.41476 6.82875 3.41476Z"
        fill="#AAC1D4"
      />
      <path
        d="M23.544 3.41476L33.1698 3.41476C36.9415 3.41476 39.9991 6.47231 39.9991 10.244V14.554L10.9707 43.5824C4.66224 40.6308 0.240328 34.3187 0.00878906 26.95L23.544 3.41476Z"
        fill="#C2D1DD"
      />
      <path
        d="M6.82875 -1.52588e-05L33.1701 -1.52588e-05C36.9418 -1.52588e-05 39.9993 3.05754 39.9993 6.82922V23.9023C39.9993 33.8703 31.9187 41.951 21.9506 41.951H18.0482C8.08019 41.951 -0.000488281 33.8703 -0.000488281 23.9023L-0.000488281 6.82922C-0.000488281 3.05754 3.05707 -1.52588e-05 6.82875 -1.52588e-05Z"
        fill="#C2D1DD"
      />
      <path
        d="M6.82875 4.39021C5.48172 4.39021 4.38974 5.48219 4.38974 6.82922L4.38974 23.9023C4.38974 31.4457 10.5048 37.5608 18.0482 37.5608H21.9506C29.494 37.5608 35.6091 31.4457 35.6091 23.9023V6.82922C35.6091 5.48219 34.5171 4.39021 33.1701 4.39021L6.82875 4.39021ZM6.82875 -1.52588e-05L33.1701 -1.52588e-05C36.9418 -1.52588e-05 39.9993 3.05754 39.9993 6.82922V23.9023C39.9993 33.8703 31.9187 41.951 21.9506 41.951H18.0482C8.08019 41.951 -0.000488281 33.8703 -0.000488281 23.9023L-0.000488281 6.82922C-0.000488281 3.05754 3.05707 -1.52588e-05 6.82875 -1.52588e-05Z"
        fill="#D6E4EF"
      />
      <path
        d="M26.9597 -1.52588e-05L33.1709 -1.52588e-05C36.9426 -1.52588e-05 40.0002 3.05754 40.0002 6.82922V14.5539L13.2484 41.3056C6.49782 39.4476 1.33102 33.7672 0.221802 26.7379L26.9597 -1.52588e-05Z"
        fill="#D1DCE5"
      />
      <path
        d="M4.39056 22.5692V23.9023C4.39056 31.1031 9.96287 37.0024 17.0306 37.5234L13.2484 41.3056C6.49782 39.4476 1.33102 33.7672 0.221802 26.7379L4.39056 22.5692ZM35.6099 18.9441V6.82922C35.6099 5.48219 34.518 4.39021 33.1709 4.39021L22.5695 4.39021L26.9597 -1.52588e-05L33.1709 -1.52588e-05C36.9426 -1.52588e-05 40.0002 3.05754 40.0002 6.82922V14.5539L35.6099 18.9441Z"
        fill="#E0EAF3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0277 22.1682C15.8255 21.312 15.0474 19.9455 15.0474 18.4059C15.0474 15.813 17.2544 13.7111 19.9769 13.7111C22.6994 13.7111 24.9064 15.813 24.9064 18.4059C24.9064 19.9765 24.0966 21.3669 22.853 22.2192L24.1155 25.5237C24.4553 26.4131 23.9457 27.3871 22.9772 27.6992C22.7794 27.7629 22.5714 27.7954 22.3619 27.7954H17.4994C16.473 27.7954 15.6409 27.0313 15.6409 26.0887C15.6409 25.8963 15.6764 25.7053 15.7458 25.5237L17.0277 22.1682Z"
        fill="#8097AA"
      />
    </svg>
  );
};

const XpProgressSection = () => {
  const xpToday = useBoundStore((x) => x.xpToday());
  const goalXp = useBoundStore((x) => x.goalXp);
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold text-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">XP Progress</h2>
        <Link href="/settings/coach" className="uppercase text-blue-400">
          Edit goal
        </Link>
      </div>
      <div className="flex gap-5">
        <TreasureClosedSvg />
        <div className="flex grow flex-col justify-around">
          <h3 className="font-normal text-gray-500">Daily goal</h3>
          <div className="flex items-center gap-5">
            <div className="relative h-4 w-full grow rounded-full bg-gray-200">
              {xpToday > 0 && (
                <div
                  className="absolute left-0 top-0 h-4 rounded-full bg-yellow-400"
                  style={{ width: `${Math.min(1, xpToday / goalXp) * 100}%` }}
                >
                  <div className="absolute left-2 right-2 top-1 h-[6px] rounded-full bg-yellow-300"></div>
                </div>
              )}
            </div>
            <div className="text-md shrink-0 font-normal text-gray-400">
              {xpToday}/{goalXp} XP
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const CreateAProfileSection = ({
  setLoginScreenState,
}: {
  setLoginScreenState: React.Dispatch<React.SetStateAction<LoginScreenState>>;
}) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold">
      <h2 className="text-xl">Create a profile to save your progress!</h2>
      <button
        className="rounded-2xl border-b-4 border-green-600 bg-green-500 py-3 uppercase text-white transition hover:border-green-500 hover:bg-green-400"
        onClick={() => setLoginScreenState("SIGNUP")}
      >
        Create a profile
      </button>
      <button
        className="rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 uppercase text-white transition hover:border-blue-400 hover:bg-blue-300"
        onClick={() => setLoginScreenState("LOGIN")}
      >
        Sign in
      </button>
    </article>
  );
};
