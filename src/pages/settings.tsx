import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CoachSvg } from "~/components/Svgs";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { TopBar } from "../components/navigation/TopBar";
import { useBoundStore } from "../hooks/useBoundStore";

import { useMutation } from "react-query";

const Settings: NextPage = () => {
  const name = useBoundStore((x) => x.name);
  const [localName, setLocalName] = useState(name);

  const email = useBoundStore((x) => x.email);
  const [localEmail, setLocalEmail] = useState(email);

  const age = useBoundStore((x) => x.age);
  const [localAge, setLocalAge] = useState(age);

  const token = useBoundStore((x) => x.token);
  const id = useBoundStore((x) => x.id);

  const accountOptions = [
    { title: "Name", value: localName, setValue: setLocalName },
    { title: "Email", value: localEmail, setValue: setLocalEmail },
    { title: "Age", value: localAge, setValue: setLocalAge },
  ];

  const goalXpOptions = [
    { title: "Basic", xp: 1 },
    { title: "Casual", xp: 10 },
    { title: "Regular", xp: 20 },
    { title: "Serious", xp: 30 },
    { title: "Intense", xp: 50 },
  ];

  const soundEffects = useBoundStore((x) => x.soundEffects);
  const [localSoundEffects, setLocalSoundEffects] = useState(soundEffects);

  const listeningExercises = useBoundStore((x) => x.listeningExercises);
  const [localListeningExercises, setLocalListeningExercises] =
    useState(listeningExercises);

  const soundOptions = [
    {
      title: "Sound effects",
      value: localSoundEffects,
      setValue: setLocalSoundEffects,
    },
    {
      title: "Listening exercises",
      value: localListeningExercises,
      setValue: setLocalListeningExercises,
    },
  ];

  const goalXp = useBoundStore((x) => x.goalXp);
  const [localGoalXp, setLocalGoalXp] = useState(goalXp);

  const setUserInfo = useBoundStore((x) => x.setUserInfo);
  const setUserPref = useBoundStore((x) => x.setUserPref);

  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const logout = useBoundStore((x) => x.logout);

  const updateUserMutation = useMutation((credentials) =>
    fetch("http://localhost:8000/api/users/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
  );

  const updateUserPrefMutation = useMutation((credentials) =>
    fetch("http://localhost:8000/api/users/pref/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    }).then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
  );

  const updateUserAndPrefHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUserMutation.mutateAsync({
        id: id,
        name: localName,
        email: localEmail,
        age: localAge,
      });
      const data2 = await updateUserPrefMutation.mutateAsync({
        soundEffects: localSoundEffects,
        listeningExercises: localListeningExercises,
        goalXp: localGoalXp,
      });
      setUserInfo(localName, localEmail, localAge);
      setUserPref(localGoalXp, localSoundEffects, localListeningExercises);
    } catch (error) {
      console.error("Update User failed:", error);
    }
  };

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
        <div className="flex w-full max-w-4xl flex-col gap-5 px-4 py-7">
          <section>
            <div className="flex flex-row justify-between">
              <h1 className="mb-5 text-2xl font-bold">Settings</h1>
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
              <h2 className="text-xl font-bold text-gray-800">Account</h2>
              {accountOptions.map(({ title, value, setValue }) => {
                return (
                  <div
                    key={title}
                    className="flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-10 sm:pl-10"
                  >
                    <div className="font-bold sm:w-1/6">{title}</div>
                    <input
                      className="grow rounded-2xl border-2 border-gray-200 p-4 py-2"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-5 flex justify-center gap-6">
            <div className="flex w-full max-w-4xl flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-800">Sound</h2>
              {soundOptions.map(({ title, value, setValue }) => {
                return (
                  <div
                    key={title}
                    className="flex justify-between sm:justify-center sm:gap-10 sm:pl-10"
                  >
                    <div className="font-bold sm:w-1/2">{title}</div>
                    <label className="pr-5 sm:w-1/2 sm:pr-0">
                      <div
                        className={[
                          "relative h-6 w-12 cursor-pointer rounded-full transition-all duration-300",
                          value ? "bg-blue-400" : "bg-gray-200",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "absolute h-10 w-10 rounded-xl border-2 border-b-4 bg-white transition-all duration-300",
                            value ? "border-blue-400" : "border-gray-200",
                          ].join(" ")}
                          style={{
                            top: "calc(50% - 20px)",
                            left: value ? "calc(100% - 20px)" : "-20px",
                          }}
                        ></div>
                      </div>
                      <input
                        className="hidden"
                        type="checkbox"
                        checked={value}
                        onChange={() => setValue((x) => !x)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-5 flex justify-center gap-6">
            <div className="flex w-full max-w-4xl flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-800">Daily Goal</h2>
              <p className="text-gray-400">
                Coach here! Selecting a daily goal will help you stay motivated
                while learning a language. You can change your goal at any time.
              </p>
              <div className="flex gap-5">
                <CoachSvg className="hidden h-52 w-52 sm:block" />
                <div className="grow">
                  {goalXpOptions.map(({ title, xp }, i) => {
                    return (
                      <button
                        key={title}
                        className={[
                          "flex w-full items-center justify-between border-2 p-4 first:rounded-t-2xl last:rounded-b-2xl last:border-b-2",
                          xp === localGoalXp
                            ? "border-b-2 border-blue-400 bg-blue-100 text-blue-500"
                            : "border-t-0 border-gray-200 first:border-t-2 hover:bg-gray-100",
                          goalXpOptions[i + 1]?.xp === localGoalXp
                            ? "border-b-0"
                            : "",
                        ].join(" ")}
                        onClick={() => setLocalGoalXp(xp)}
                      >
                        <div className="font-bold">{title}</div>
                        <div>{xp} XP per day</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <section>
            <div className="flex justify-center">
              {" "}
              <div className="flex w-full max-w-4xl flex-col gap-6">
                <button
                  className="w-full gap-2 rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
                  onClick={
                    updateUserAndPrefHandler
                    //   () => {
                    //   setName(localName);
                    //   setEmail(localEmail);
                    //   setSoundEffects(localSoundEffects);
                    //   setListeningExercises(localListeningExercises);
                    //   setGoalXp(localGoalXp);
                    // }
                  }
                  disabled={
                    name === localName &&
                    email === localEmail &&
                    age === localAge &&
                    localSoundEffects === soundEffects &&
                    localListeningExercises === listeningExercises &&
                    localGoalXp === goalXp
                  }
                >
                  Save changes
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="Profile" />
    </div>
  );
};

export default Settings;
