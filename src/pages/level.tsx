import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { generateFragments } from "~/utils/array-utils";
import { formatTime } from "~/utils/dateString";
import {
  BigCloseSvg,
  CloseSvg,
  DoneSvg,
  LessonFastForwardEndFailSvg,
  LessonTopBarEmptyHeart,
  LessonTopBarHeart,
  PlaySvg,
} from "../components/Svgs";
import { useBoundStore } from "../hooks/useBoundStore";
import Spritesheet from "react-responsive-spritesheet";
import { playSound } from "~/components/Sound";
import type { LevelProblem } from "~/stores/createLevelStore";

const MonsterBar = ({
  correctAnswerCount,
  questionCount,
  setQuitMessageShown,
}: {
  correctAnswerCount: number;
  questionCount: number;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <header className="mx-auto flex max-w-3xl items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Exit lesson</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={correctAnswerCount / questionCount}
      >
        <div
          className="h-full rounded-full bg-red-500 px-2 pt-1 transition-all duration-700"
          style={{
            width: `${(1 - correctAnswerCount / questionCount) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-red-400"></div>
        </div>
      </div>
    </header>
  );
};

const Monster = ({
  name,
  isIdle,
  isHurt,
  isAttack,
  setIsIdle,
  setIsHurt,
  setIsAttack,
  isDead,
  setIsDead,
}: {
  name: string;
  isIdle: boolean;
  setIsIdle: () => void;
  isHurt: boolean;
  setIsHurt: () => void;
  isAttack: boolean;
  setIsAttack: () => void;
  isDead: boolean;
  setIsDead: () => void;
}) => {
  useEffect(() => {
    if (!isIdle) {
      if (isHurt) {
        // Simulate the duration of the hurt animation
        const hurtAnimationTimeout = setTimeout(() => {
          setIsHurt(false);
          setIsIdle(true);
        }, 1000); // Adjust the duration as per your animation
        return () => clearTimeout(hurtAnimationTimeout);
      } else if (isAttack) {
        // Simulate the duration of the attack animation
        const attackAnimationTimeout = setTimeout(() => {
          setIsAttack(false);
          setIsIdle(true);
        }, 1000); // Adjust the duration as per your animation
        return () => clearTimeout(attackAnimationTimeout);
      }
    }
  }, [isIdle, isHurt, isAttack]);

  return (
    <div>
      {isIdle && (
        <Spritesheet
          className={`my-element__class--style`}
          image={`/animations/${name}_idle.png`}
          widthFrame={128}
          heightFrame={128}
          steps={3}
          fps={10}
          autoplay={true}
          loop={true}
        />
      )}
      {isHurt && (
        <Spritesheet
          className={`my-element__class--style`}
          image={`/animations/${name}_hurt.png`}
          widthFrame={128}
          heightFrame={128}
          steps={2}
          fps={10}
          autoplay={true}
          loop={false}
        />
      )}
      {isAttack && (
        <Spritesheet
          className={`my-element__class--style`}
          image={`/animations/${name}_attack.png`}
          widthFrame={128}
          heightFrame={128}
          steps={3}
          fps={10}
          autoplay={true}
          loop={false}
        />
      )}
      {isDead && (
        <Spritesheet
          className={`my-element__class--style`}
          image={`/animations/${name}_death.png`}
          widthFrame={128}
          heightFrame={128}
          steps={3}
          fps={10}
          autoplay={true}
          loop={false}
        />
      )}
    </div>
  );
};

const PlayerBar = ({
  isAnswerSelected,
  isAnswerCorrect,
  correctAnswerShown,
  correctAnswer,
  onAttack,
  onFinish,
  onSkip,
  report,
  hearts,
}: {
  isAnswerSelected: boolean;
  isAnswerCorrect: boolean;
  correctAnswerShown: boolean;
  correctAnswer: string;
  onAttack: () => void;
  onFinish: () => void;
  onSkip: () => void;
  report: () => void;
  hearts: null | number;
}) => {
  return (
    <>
      <section className="border-t-2 border-gray-200 p-3 xs:p-5 sm:p-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-y-2 xs:gap-y-4 sm:justify-between">
          {/* Actions */}
          <div className="mx-auto flex gap-x-4">
            {/* <button
              className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
              onClick={onSkip}
            >
              Skip
            </button> */}
            {!isAnswerSelected ? (
              <button
                className="grow rounded-2xl bg-gray-200 p-2 font-bold uppercase text-gray-400 xs:p-3 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
                disabled
              >
                Attack
              </button>
            ) : (
              <button
                onClick={onAttack}
                className="grow rounded-2xl border-b-4 border-green-600 bg-green-500 p-2 font-bold uppercase text-white xs:p-3 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              >
                Attack
              </button>
            )}
          </div>

          {/* Hearts */}
          <div className="flex gap-x-2">
            {hearts !== null &&
              [1, 2, 3].map((heart) => {
                if (heart <= hearts) {
                  return <LessonTopBarHeart key={heart} />;
                }
                return <LessonTopBarEmptyHeart key={heart} />;
              })}
          </div>
        </div>
      </section>

      <div
        className={
          correctAnswerShown
            ? isAnswerCorrect
              ? "fixed bottom-0 left-0 right-0 bg-lime-100 font-bold text-green-600 transition-all"
              : "fixed bottom-0 left-0 right-0 bg-red-100 font-bold text-red-500 transition-all"
            : "fixed -bottom-52 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-14">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="text-2xl">Good job!</div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="hidden text-2xl">Correct solution:</div>{" "}
                  <div className="hidden text-sm font-normal">
                    {correctAnswer}
                  </div>
                </div>
              </div>
            )}
          </>
          <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
            <button
              onClick={report}
              className={
                "w-full rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
              }
            >
              Report
            </button>

            <button
              onClick={onFinish}
              className={
                isAnswerCorrect
                  ? "w-full rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
                  : "w-full rounded-2xl border-b-4 border-red-600 bg-red-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const QuitMessage = ({
  quitMessageShown,
  setQuitMessageShown,
}: {
  quitMessageShown: boolean;
  setQuitMessageShown: (isShown: boolean) => void;
}) => {
  return (
    <>
      <div
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-60 transition-all duration-300"
            : "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-30 bg-black bg-opacity-0 transition-all duration-300"
        }
        onClick={() => setQuitMessageShown(false)}
        aria-label="Close quit message"
        role="button"
      ></div>

      <article
        className={
          quitMessageShown
            ? "fixed bottom-0 left-0 right-0 z-40 flex flex-col gap-4 bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
            : "fixed -bottom-96 left-0 right-0 z-40 flex flex-col bg-white px-5 py-12 text-center transition-all duration-300 sm:flex-row"
        }
        aria-hidden={!quitMessageShown}
      >
        <div className="flex grow flex-col gap-4">
          <h2 className="text-lg font-bold sm:text-2xl">
            Are you sure you want to quit?
          </h2>
          <p className="text-gray-500 sm:text-lg">
            All progress for this lesson will be lost.
          </p>
        </div>
        <div className="flex grow flex-col items-center justify-center gap-4 sm:flex-row-reverse">
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-blue-500 bg-blue-400 py-3 font-bold uppercase text-white transition hover:brightness-105 sm:w-48"
            href="/learn"
          >
            Quit
          </Link>
          <button
            className="w-full rounded-2xl py-3 font-bold uppercase text-blue-400 transition hover:brightness-90 sm:w-48 sm:border-2 sm:border-b-4 sm:border-gray-300 sm:text-gray-400 sm:hover:bg-gray-100"
            onClick={() => setQuitMessageShown(false)}
          >
            Stay
          </button>
        </div>
      </article>
    </>
  );
};

const Problem = ({
  problem,
  answers,
  correctAnswerCount,
  questionCount,
  selectedAnswers,
  setSelectedAnswers,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onAttack,
  onFinish,
  onSkip,
  report,
  hearts,

  isIdle,
  isHurt,
  isAttack,
  isDead,
  setIsIdle,
  setIsHurt,
  setIsAttack,
  setIsDead,
}: {
  problem: LevelProblem;
  answers: string[];
  correctAnswerCount: number;
  questionCount: number;
  selectedAnswers: number[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  correctAnswerShown: boolean;
  quitMessageShown: boolean;
  setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerCorrect: boolean;
  onAttack: () => void;
  onFinish: () => void;
  onSkip: () => void;
  report: () => void;
  hearts: number | null;

  isIdle: boolean;
  isHurt: boolean;
  isAttack: boolean;
  isDead: boolean;
  setIsIdle: () => void;
  setIsHurt: () => void;
  setIsAttack: () => void;
  setIsDead: () => void;
}) => {
  const {
    question,
    prompt,
    contentType,
    levelImage,
    levelSound,
    correctAnswer,
  } = problem;

  const audioRef = useRef();
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Throw error
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-3 pt-4 2xs:gap-5 sm:pt-0">
      {/* px-4 sm:px-0 */}
      <div className="flex grow flex-col items-center gap-3 2xs:gap-5">
        {/* Monster Bar */}
        <div className="w-full max-w-5xl px-4 sm:mt-8">
          <MonsterBar
            correctAnswerCount={correctAnswerCount}
            questionCount={questionCount}
            setQuitMessageShown={setQuitMessageShown}
            hearts={hearts}
          />
        </div>

        {/* Question Answer Module */}
        <section className="flex max-w-2xl grow flex-col justify-between gap-1 self-center px-4 2xs:gap-4 sm:items-center sm:justify-center">
          {/* Question */}
          <h1 className="text-2xl font-bold 2xs:mb-2 sm:text-3xl">
            {question}
          </h1>

          {/* Prompt */}
          <div className="w-full">
            <div className="flex w-full items-center gap-2">
              <Monster
                name="small_dragon"
                isHurt={isHurt}
                isIdle={isIdle}
                setIsHurt={setIsHurt}
                setIsIdle={setIsIdle}
                isAttack={isAttack}
                setIsAttack={setIsAttack}
                isDead={isDead}
                setIsDead={setIsDead}
              />

              <div className="relative ml-2 w-fit rounded-2xl border-2 border-gray-200 p-4">
                {contentType !== "listening" ? (
                  prompt
                ) : (
                  <div>
                    <button
                      className="max-h-[30px] min-h-[30px] rounded-2xl p-1 text-gray-700"
                      onClick={play}
                    >
                      <PlaySvg />
                    </button>{" "}
                    <audio ref={audioRef} src={levelSound} />
                  </div>
                )}
                <div
                  className="absolute h-4 w-4 rotate-45 border-b-2 border-l-2 border-gray-200 bg-white"
                  style={{
                    top: "calc(50% - 8px)",
                    left: "-10px",
                  }}
                ></div>
                <div>
                  {levelImage && (
                    <img
                      className="hidden max-h-[100px] max-w-[100px] rounded-t-lg 2xs:block 2xs:max-h-[120px] 2xs:max-w-[120px]"
                      src={levelImage}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            {/* Chosen Answer Fragments */}
            <div className="grid max-h-[100px] min-h-[100px] min-w-[300px] grid-cols-10 gap-1 border-b-2 border-t-2 border-gray-200 py-1 2xs:mt-6 2xs:min-w-[350px] xs:mt-3">
              {selectedAnswers.map((i) => {
                return (
                  <button
                    key={i}
                    className="max-h-[40px] min-h-[40px] rounded-2xl border-2 border-b-4 border-gray-200 p-1 text-gray-700"
                    onClick={() => {
                      setSelectedAnswers((selectedAnswers) => {
                        return selectedAnswers.filter((x) => x !== i);
                      });
                    }}
                  >
                    {answers[i]}
                  </button>
                );
              })}
            </div>
            {/* Answer Fragments */}
            <div className="grid grid-cols-10 justify-center gap-1 xs:w-96">
              {answers.map((fragments, i) => {
                return (
                  <button
                    key={i}
                    className={
                      selectedAnswers.includes(i)
                        ? "max-h-[40px] min-h-[40px] rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-1 text-gray-200"
                        : "max-h-[40px] min-h-[40px] rounded-2xl border-2 border-b-4 border-gray-200 p-1 text-gray-700"
                    }
                    disabled={selectedAnswers.includes(i)}
                    onClick={() =>
                      setSelectedAnswers((selectedAnswers) => {
                        if (selectedAnswers.includes(i)) {
                          return selectedAnswers;
                        }
                        return [...selectedAnswers, i];
                      })
                    }
                  >
                    {fragments}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Player Bar */}
      <PlayerBar
        correctAnswer={correctAnswer}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswers.length > 0}
        onAttack={onAttack}
        onFinish={onFinish}
        onSkip={onSkip}
        report={report}
        hearts={hearts}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
};

const LevelComplete = ({
  correctAnswerCount,
  incorrectAnswerCount,
  startTime,
  endTime,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
  point,
}: {
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  startTime: React.MutableRefObject<number>;
  endTime: React.MutableRefObject<number>;
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
  point: number;
}) => {
  const router = useRouter();
  const isPractice = "practice" in router.query;

  const setUserHistory = useBoundStore((x) => x.setUserHistory);
  const setXpAllTime = useBoundStore((x) => x.setXpAllTime);
  const setGems = useBoundStore((x) => x.setGems);
  const setActiveDays = useBoundStore((x) => x.setActiveDays);
  const setGlobalLessonsCompleted = useBoundStore(
    (x) => x.setGlobalLessonsCompleted
  );

  const increaseXp = useBoundStore((x) => x.increaseXp);
  const addToday = useBoundStore((x) => x.addToday);
  const increaseGems = useBoundStore((x) => x.increaseGems);

  const course = useBoundStore((x) => x.currentCourse);
  const token = useBoundStore((x) => x.token);
  const setCourseDatas = useBoundStore((x) => x.setCourseDatas);

  const increaseLessonsCompletedMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/courses/increase_completed/", {
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

  const increaseGemsMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/users/achievement/increase_gems/", {
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

  const increaseXpMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/users/achievement/increase_xp/", {
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

  const increaseLessonsCompletedHandler = async (e) => {
    e.preventDefault();
    try {
      // increaseXp(correctAnswerCount);
      // increaseGems(isPractice ? 0 : 1);
      const userAchievement = await increaseXpMutation.mutateAsync({
        by: correctAnswerCount,
      });
      setXpAllTime(userAchievement.xpAllTime);
      setUserHistory(userAchievement.userHistory);
      setActiveDays(userAchievement.userHistory);

      addToday();
      if (!isPractice) {
        const courseDataData =
          await increaseLessonsCompletedMutation.mutateAsync({
            course_id: course.id,
          });
        setCourseDatas(courseDataData);
        const userAchievement = await increaseGemsMutation.mutateAsync({
          by: Math.round(point / 10),
        });
        setGems(userAchievement.gems);
      }
      void router.push("/learn");
      console.log("increaseLessonsCompleted");
    } catch (error) {
      console.error("Error increasing completed lessons:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-yellow-400">
          Level Complete!
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-yellow-400">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-blue-400">
            <h2 className="py-1 text-center text-white">Committed</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {formatTime(endTime.current - startTime.current)}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-green-400 bg-green-400">
            <h2 className="py-1 text-center text-white">Amazing</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-green-400">
              {Math.round(
                (correctAnswerCount /
                  (correctAnswerCount + incorrectAnswerCount)) *
                  100
              )}
              %
            </div>
          </div>
          {!isPractice && (
            <div className="min-w-[110px] rounded-xl border-2 border-orange-400 bg-orange-400">
              <h2 className="py-1 text-center text-white">Gems</h2>
              <div className="flex justify-center rounded-xl bg-white py-4 text-orange-400">
                {Math.round(point / 10)}
              </div>
            </div>
          )}
        </div>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review level
          </button>
          <button
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            onClick={increaseLessonsCompletedHandler}
          >
            Continue
          </button>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

type QuestionResult = {
  question: string;
  yourResponse: string;
  correctResponse: string[];
};

const ReviewLesson = ({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  const [selectedQuestionResult, setSelectedQuestionResult] =
    useState<null | QuestionResult>(null);
  return (
    <div
      className={[
        "fixed inset-0 flex items-center justify-center p-5 transition duration-300",
        reviewLessonShown ? "" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black",
          reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setReviewLessonShown(false)}
      ></div>
      <div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8">
        <button
          className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
          onClick={() => setReviewLessonShown(false)}
        >
          <BigCloseSvg className="h-8 w-8" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-center text-3xl">Check out your scorecard!</h2>
        <p className="text-center text-xl text-gray-400">
          Click the tiles below to reveal the solutions
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {questionResults.map((questionResult, i) => {
            return (
              <button
                key={i}
                className={[
                  "relative flex flex-col items-stretch gap-3 rounded-xl p-5 text-left",
                  questionResult.correctResponse.includes(
                    questionResult.yourResponse
                  )
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-500",
                ].join(" ")}
                onClick={() =>
                  setSelectedQuestionResult((selectedQuestionResult) =>
                    selectedQuestionResult === questionResult
                      ? null
                      : questionResult
                  )
                }
              >
                <div className="flex justify-between gap-2">
                  <h3 className="font-bold">{questionResult.question}</h3>
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                    {questionResult.correctResponse.includes(
                      questionResult.yourResponse
                    ) ? (
                      <DoneSvg className="h-5 w-5" />
                    ) : (
                      <BigCloseSvg className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div>{questionResult.yourResponse}</div>
                {selectedQuestionResult === questionResult && (
                  <div className="absolute left-1 right-1 top-20 z-10 rounded-2xl border-2 border-gray-200 bg-white p-3 text-sm tracking-tighter">
                    <div
                      className="absolute -top-2 h-3 w-3 rotate-45 border-l-2 border-t-2 border-gray-200 bg-white"
                      style={{ left: "calc(50% - 6px)" }}
                    ></div>
                    <div className="font-bold uppercase text-gray-400">
                      Your response:
                    </div>
                    <div className="mb-3 text-gray-700">
                      {questionResult.yourResponse}
                    </div>
                    <div className="font-bold uppercase text-gray-400">
                      Correct response:
                    </div>
                    <div className="text-gray-700">
                      {questionResult.correctResponse[0]}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LevelFail = ({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}: {
  reviewLessonShown: boolean;
  setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
  questionResults: QuestionResult[];
}) => {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndFailSvg />
        <h1 className="text-2xl font-bold">{`You didn't pass this level`}</h1>
        <p className="text-lg text-gray-500">
          {`Don't worry! Practice makes perfect.`}
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Review lesson
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
};

////////////////////
// MAIN COMPONENT //
////////////////////

const Level: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const soundEffects = useBoundStore((x) => x.soundEffects);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
  }, [loggedIn, router]);

  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [point, setPoint] = useState(0);

  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<null | number>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [writtenAnswer, setWrittenAnswer] = useState("");

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * 3 + 1000 * 33);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);

  const token = useBoundStore((x) => x.token);
  const currentLevel = useBoundStore((x) => x.currentLevel);
  const currentLevelContent = useBoundStore((x) => x.currentLevelContent);
  const setCurrentLevelContent = useBoundStore((x) => x.setCurrentLevelContent);

  const problem = currentLevelContent[lessonProblem] ?? currentLevelContent[0];

  const answers = useMemo(
    () => generateFragments(problem.correctAnswer),
    [problem.correctAnswer]
  );

  const questionCount = currentLevelContent.length;

  const [isStartingLesson, setIsStartingLesson] = useState(true);
  const hearts = 3 - incorrectAnswerCount;

  const { correctAnswer } = problem;
  const isAnswerCorrect =
    correctAnswer === selectedAnswers.map((i) => answers[i]).join("");

  // const playSuccessSound = playSound("success");
  // const playFailSound = playSound("fail");

  const [isIdle, setIsIdle] = useState(true);
  const [isHurt, setIsHurt] = useState(false);
  const [isAttack, setIsAttack] = useState(false);
  const [isDead, setIsDead] = useState(false);

  const onAttack = () => {
    setCorrectAnswerShown(true);
    setIsIdle(false);

    if (isAnswerCorrect) {
      setPoint((x) => x + problem.point);
      setCorrectAnswerCount((x) => x + 1);
      if (correctAnswerCount >= questionCount - 1) {
        setIsDead(true);
      } else {
        setIsHurt(true);
      }
      if (soundEffects) {
        // playSuccessSound();
      }
    } else {
      setIncorrectAnswerCount((x) => x + 1);

      setIsAttack(true);
      if (soundEffects) {
        // playFailSound();
      }
    }
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse: selectedAnswers.map((i) => answers[i]).join(""),
        correctResponse: problem.correctAnswer,
      },
    ]);
  };

  // Definition of onFinish
  const onFinish = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setLessonProblem((x) => (x + 1) % currentLevelContent.length);
    endTime.current = Date.now();
  };

  const onSkip = () => {
    setSelectedAnswer(null);
    setCorrectAnswerShown(true);
  };

  const report = () => {
    console.log("Report");
  };

  if (hearts !== null && hearts <= 0 && !correctAnswerShown) {
    return (
      <LevelFail
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  if (correctAnswerCount >= questionCount && !correctAnswerShown) {
    return (
      <LevelComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
        point={point}
      />
    );
  }

  return (
    <Problem
      problem={problem}
      answers={answers}
      correctAnswerCount={correctAnswerCount}
      questionCount={questionCount}
      selectedAnswers={selectedAnswers}
      setSelectedAnswers={setSelectedAnswers}
      quitMessageShown={quitMessageShown}
      correctAnswerShown={correctAnswerShown}
      setQuitMessageShown={setQuitMessageShown}
      isAnswerCorrect={isAnswerCorrect}
      onAttack={onAttack}
      onFinish={onFinish}
      onSkip={onSkip}
      report={report}
      hearts={hearts}
      isIdle={isIdle}
      isHurt={isHurt}
      isAttack={isAttack}
      isDead={isDead}
      setIsIdle={setIsIdle}
      setIsHurt={setIsHurt}
      setIsAttack={setIsAttack}
      setIsDead={setIsDead}
    />
  );
};

export default Level;
