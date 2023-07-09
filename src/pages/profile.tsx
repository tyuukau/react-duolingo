import type { NextPage } from "next";
import Link from "next/link";
import {
  EmptyFireSvg,
  FireSvg,
  LightningProgressSvg,
  ProfileFriendsSvg,
  ProfileTimeJoinedSvg,
  SettingsGearSvg
} from "../components/Svgs";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { TopBar } from "../components/navigation/TopBar";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBoundStore } from "../hooks/useBoundStore";

export const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <Link href="/help">
        <span>Help</span>
      </Link>
      <span className="text-gray-400">Profile</span>
      <Link href="/settings">
        <SettingsGearSvg />
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);

  const name = useBoundStore((x) => x.name);
  const email = useBoundStore((x) => x.email);
  const age = useBoundStore((x) => x.age);

  const joinedAt = useBoundStore((x) => x.joinedAt).format("MMMM YYYY");
  const followingCount = 0;
  const followersCount = 0;
  const language = useBoundStore((x) => x.currentLanguage);
  const learningLanguages = useBoundStore((x) => x.learningLanguages);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="text-sm text-gray-400">{email}</div>
            <div className="text-sm text-gray-400">
              {age > 1 ? age + ` years old` : "1 year old"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeJoinedSvg />
            <span className="text-gray-500">{`Joined ${joinedAt}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <ProfileFriendsSvg />
            <span className="text-gray-500">{`${followingCount} Following / ${followersCount} Followers`}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500">
              {learningLanguages.map((language) => language.name).join(", ")}
            </span>
          </div>
        </div>

        {/* <Flag language={language} width={40} /> */}
      </div>
    </section>
  );
};

const ProfileStatsSection = () => {
  const streak = useBoundStore((x) => x.streak);
  const totalXp = useBoundStore((x) => x.xpAllTime);
  const league = "Bronze";
  const top3Finishes = 0;

  return (
    <section>
      <h2 className="mb-5 text-xl font-bold">Statistics</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {streak === 0 ? <EmptyFireSvg /> : <FireSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                streak === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              {streak}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Day streak
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">Total XP</span>
          </div>
        </div>
        {/* <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="text-sm text-gray-400 md:text-base">
              Current league
            </span>
          </div>
        </div> */}
        {/* <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {top3Finishes === 0 ? <EmptyMedalSvg /> : <EmptyMedalSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                top3Finishes === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              {top3Finishes}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Top 3 finishes
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

const ProfileFriendsSection = () => {
  const [state, setState] = useState<"FOLLOWING" | "FOLLOWERS">("FOLLOWING");
  return (
    <section>
      <h2 className="mb-5 text-xl font-bold">Friends</h2>
      <div className="rounded-2xl border-2 border-gray-200">
        <div className="flex">
          <button
            className={[
              "flex w-1/2 items-center justify-center border-b-2 py-3 font-bold uppercase hover:border-blue-400 hover:text-blue-400",
              state === "FOLLOWING"
                ? "border-blue-400 text-blue-400"
                : "border-gray-200 text-gray-400",
            ].join(" ")}
            onClick={() => setState("FOLLOWING")}
          >
            Following
          </button>
          <button
            className={[
              "flex w-1/2 items-center justify-center border-b-2 py-3 font-bold uppercase hover:border-blue-400 hover:text-blue-400",
              state === "FOLLOWERS"
                ? "border-blue-400 text-blue-400"
                : "border-gray-200 text-gray-400",
            ].join(" ")}
            onClick={() => setState("FOLLOWERS")}
          >
            Followers
          </button>
        </div>
        <div className="flex items-center justify-center py-10 text-center text-gray-500">
          {state === "FOLLOWING"
            ? "Not following anyone yet"
            : "No followers yet"}
        </div>
      </div>
    </section>
  );
};

////////////////////
// MAIN COMPONENT //
////////////////////

const Profile: NextPage = () => {
  const logOut = useBoundStore((x) => x.logOut);
  return (
    <div>
      <TopBar />
      <LeftBar selectedTab="Profile" />

      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 px-4 py-7">
          <section>
            <div className="flex flex-row justify-between">
              <h1 className="mb-5 text-2xl font-bold">Profile</h1>
              <div className="flex flex-row space-x-4">
                <Link
                  href="/settings"
                  className="flex h-full items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
                >
                  <SettingsGearSvg />
                  <div className="hidden sm:flex">Settings</div>
                </Link>
                <Link
                  href="/help"
                  className="items-center gap-2 self-start rounded-2xl border-b-4 border-gray-500 bg-gray-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
                >
                  {/* <EditPencilSvg /> */}
                  Help
                </Link>
              </div>
            </div>
          </section>
          <ProfileTopSection />
          <ProfileStatsSection />
          {/* <ProfileFriendsSection /> */}
          <section>
            <div className="flex w-full flex-col gap-5">
              <button
                className="mt-5 gap-2 rounded-2xl border-b-4 border-red-600 bg-red-500 px-5 py-3 font-bold uppercase text-white transition disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
                onClick={() => {
                  logOut();
                }}
              >
                Sign out
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Profile" />
    </div>
  );
};

export default Profile;
