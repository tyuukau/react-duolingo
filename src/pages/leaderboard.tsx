import dayjs from "dayjs";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TopBar } from "~/components/navigation/TopBar";
import {
  BronzeLeagueSvg,
  FirstPlaceSvg,
  LeaderboardBannerSvg,
  LeaderboardExplanationSvg,
  LockedLeaderboardSvg,
  SecondPlaceSvg,
  ThirdPlaceSvg
} from "../components/Svgs";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { useBoundStore } from "../hooks/useBoundStore";
import { useLeaderboardUsers } from "../hooks/useLeaderboard";

const LeaderboardExplanationSection = () => {
  return (
    <article className="relative hidden h-fit w-96 shrink-0 gap-5 rounded-2xl border-2 border-gray-200 p-6 xl:flex">
      <div className="flex flex-col gap-5">
        <h2 className="font-bold uppercase text-gray-400">
          What are leaderboards?
        </h2>
        <p className="font-bold text-gray-700">Do lessons. Earn XP. Compete.</p>
        <p className="text-gray-400">
          Earn XP through lessons, then compete with players in a weekly
          leaderboard
        </p>
      </div>

      <div className="w-10 shrink-0"></div>

      <LeaderboardExplanationSvg />
    </article>
  );
};

type TimeLeftChapter = "days" | "hours" | "minutes";

const timeUntilStartOfWeek = (chapters: TimeLeftChapter): number => {
  const startOfWeekDay = 0;
  const startOfWeekHour = 20;
  const daysAhead =
    dayjs().day() === startOfWeekDay && dayjs().hour() < startOfWeekHour
      ? 0
      : 7 - dayjs().day();
  const startOfWeek = dayjs()
    .startOf("day")
    .add(startOfWeekHour, "hours")
    .add(daysAhead, "day");
  return startOfWeek.diff(dayjs(), chapters);
};

const timeLeft = (): `${number} ${TimeLeftChapter}` => {
  if (timeUntilStartOfWeek("days") > 0) {
    return `${timeUntilStartOfWeek("days")} days`;
  }
  if (timeUntilStartOfWeek("hours") > 0) {
    return `${timeUntilStartOfWeek("hours")} hours`;
  }
  return `${timeUntilStartOfWeek("minutes")} minutes`;
};

const defaultPicture = "https://placekitten.com/100/100";

const LeaderboardProfile = ({
  place,
  name,
  xp,
  isCurrentUser,
}: {
  place: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={[
        "flex items-center gap-5 rounded-2xl py-2 px-5 hover:bg-gray-100 md:mx-0",
        isCurrentUser ? "bg-gray-200" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        {place === 1 ? (
          <FirstPlaceSvg />
        ) : place === 2 ? (
          <SecondPlaceSvg />
        ) : place === 3 ? (
          <ThirdPlaceSvg />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center font-bold text-green-700">
            {place}
          </div>
        )}
        {/* <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          src={defaultPicture}
          alt=""
        /> */}
      </div>
      <div className="grow overflow-hidden overflow-ellipsis font-bold">
        {name}
      </div>
      <div className="shrink-0 text-gray-500">{`${xp} XP`}</div>
    </div>
  );
};

////////////////////
// MAIN COMPONENT //
////////////////////

const Leaderboard: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const lessonsCompleted = useBoundStore((x) => x.globalLessonsCompleted);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const lessonsToUnlockLeaderboard = 5;
  const lessonsRemainingToUnlockLeaderboard =
    lessonsToUnlockLeaderboard - lessonsCompleted;
  const leaderboardIsUnlocked = lessonsCompleted >= lessonsToUnlockLeaderboard;

  const leaderboardLeague = "Fluencia League";

  const leaderboardUsers = useLeaderboardUsers();

  return (
    <div>
      <LeftBar selectedTab="Leaderboards" />
      <TopBar />

      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 px-4 md:px-5">
          {!leaderboardIsUnlocked && (
            <>
              <LeaderboardBannerSvg />
              <h1 className="text-center text-2xl font-bold text-gray-700">
                Unlock Leaderboards!
              </h1>
              <p className="text-center text-lg text-gray-500">
                Complete {lessonsRemainingToUnlockLeaderboard} more lesson
                {lessonsRemainingToUnlockLeaderboard === 1 ? "" : "s"} to start
                competing
              </p>
              <Link
                href="/learn"
                className="w-fit rounded-2xl border-2 border-b-4 border-gray-200 px-16 py-2 text-center font-bold uppercase text-blue-400 transition hover:bg-gray-50 hover:brightness-90"
              >
                Start a lesson
              </Link>
              <div className="h-5"></div>
              <LockedLeaderboardSvg />
            </>
          )}
          {leaderboardIsUnlocked && (
            <>
              <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 bg-white pt-14">
                <div className="flex items-center gap-5">
                  <BronzeLeagueSvg className="h-fit w-20" />
                </div>
                <h1 className="text-2xl font-bold">{leaderboardLeague}</h1>
                <div className="w-full border-b-2 border-gray-200"></div>
              </div>
              <div className="w-full">
                {leaderboardUsers.map((user, i) => {
                  return (
                    <LeaderboardProfile
                      key={user.name}
                      place={i + 1}
                      name={user.name}
                      xp={user.xp}
                      isCurrentUser={user.isCurrentUser}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {!leaderboardIsUnlocked && <LeaderboardExplanationSection />}
      </div>

      <BottomBar selectedTab="Leaderboards" />
    </div>
  );
};

export default Leaderboard;
