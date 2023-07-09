import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { LoginScreen, useLoginScreen } from "../components/screens/LoginScreen";
import { RightBar } from "../components/navigation/RightBar";
import {
  ActiveBookSvg,
  ActiveDumbbellSvg,
  ActiveTreasureSvg,
  ActiveTrophySvg,
  CheckmarkSvg,
  FastForwardSvg,
  GoldenBookSvg,
  GoldenDumbbellSvg,
  GoldenTreasureSvg,
  GoldenTrophySvg,
  GuidebookSvg,
  LessonCompletionSvg0,
  LessonCompletionSvg1,
  LessonCompletionSvg2,
  LessonCompletionSvg3,
  LockSvg,
  LockedBookSvg,
  LockedDumbbellSvg,
  LockedTreasureSvg,
  LockedTrophySvg,
  PracticeExerciseSvg,
  StarSvg,
  UpArrowSvg,
} from "../components/Svgs";
import { TopBar } from "../components/navigation/TopBar";
import { useBoundStore } from "../hooks/useBoundStore";
import type {
  Level,
  Chapter,
  LevelType,
  CourseData,
} from "~/stores/createCourseDataStore";
import type { Course } from "~/stores/createCourseStore";
import { useQuery } from "react-query";
import DefaultSpinner from "~/components/Spinner";

type LevelStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

const levelStatus = (
  chapters: Chapter[],
  level: Level,
  lessonsCompleted: number
): LevelStatus => {
  const levelsCompleted = lessonsCompleted;
  const levels = chapters.flatMap((chapter) => chapter.levels);
  const levelIndex = levels.findIndex((t) => t === level);

  if (levelIndex < levelsCompleted) {
    return "COMPLETE";
  }
  if (levelIndex > levelsCompleted) {
    return "LOCKED";
  }
  return "ACTIVE";
};

const LevelIcon = ({
  levelType,
  status,
}: {
  levelType: LevelType;
  status: LevelStatus;
}): JSX.Element => {
  switch (levelType) {
    case "star":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <LockSvg />
      );
    case "book":
      return status === "COMPLETE" ? (
        <GoldenBookSvg />
      ) : status === "ACTIVE" ? (
        <ActiveBookSvg />
      ) : (
        <LockedBookSvg />
      );
    case "dumbbell":
      return status === "COMPLETE" ? (
        <GoldenDumbbellSvg />
      ) : status === "ACTIVE" ? (
        <ActiveDumbbellSvg />
      ) : (
        <LockedDumbbellSvg />
      );

    case "treasure":
      return status === "COMPLETE" ? (
        <GoldenTreasureSvg />
      ) : status === "ACTIVE" ? (
        <ActiveTreasureSvg />
      ) : (
        <LockedTreasureSvg />
      );
    case "trophy":
      return status === "COMPLETE" ? (
        <GoldenTrophySvg />
      ) : status === "ACTIVE" ? (
        <ActiveTrophySvg />
      ) : (
        <LockedTrophySvg />
      );
  }
};

const levelLeftClassNames = [
  "left-0",
  "left-[-45px]",
  "left-[-70px]",
  "left-[-45px]",
  "left-0",
  "left-[45px]",
  "left-[70px]",
  "left-[45px]",
] as const;

type LevelLeftClassName = (typeof levelLeftClassNames)[number];

const getLevelLeftClassName = ({
  index,
  chapterNumber,
  levelsLength,
}: {
  index: number;
  chapterNumber: number;
  levelsLength: number;
}): LevelLeftClassName => {
  if (index >= levelsLength - 1) {
    return "left-0";
  }

  const classNames =
    chapterNumber % 2 === 1
      ? levelLeftClassNames
      : [...levelLeftClassNames.slice(4), ...levelLeftClassNames.slice(0, 4)];

  return classNames[index % classNames.length] ?? "left-0";
};

const levelTooltipLeftOffsets = [140, 95, 70, 95, 140, 185, 210, 185] as const;

type LevelTooltipLeftOffset = (typeof levelTooltipLeftOffsets)[number];

const getLevelTooltipLeftOffset = ({
  index,
  chapterNumber,
  levelsLength,
}: {
  index: number;
  chapterNumber: number;
  levelsLength: number;
}): LevelTooltipLeftOffset => {
  if (index >= levelsLength - 1) {
    return levelTooltipLeftOffsets[0];
  }

  const offsets =
    chapterNumber % 2 === 1
      ? levelTooltipLeftOffsets
      : [
          ...levelTooltipLeftOffsets.slice(4),
          ...levelTooltipLeftOffsets.slice(0, 4),
        ];

  return offsets[index % offsets.length] ?? levelTooltipLeftOffsets[0];
};

const getLevelColors = ({
  levelType,
  status,
  defaultColors,
}: {
  levelType: LevelType;
  status: LevelStatus;
  defaultColors: `border-${string} bg-${string}`;
}): `border-${string} bg-${string}` => {
  switch (status) {
    case "LOCKED":
      return "border-[#b7b7b7] bg-[#e5e5e5]";
    case "COMPLETE":
      return "border-yellow-500 bg-yellow-400";
    case "ACTIVE":
      return defaultColors;
  }
};

const LevelTooltip = ({
  level,
  selectedLevel,
  index,
  chapters,
  chapterNumber,
  levelsLength,
  description,
  status,
  closeTooltip,
}: {
  level: Level;
  selectedLevel: number | null;
  index: number;
  chapters: Chapter[];
  chapterNumber: number;
  levelsLength: number;
  description: string;
  status: LevelStatus;
  closeTooltip: () => void;
}) => {
  const levelTooltipRef = useRef<HTMLDivElement | null>(null);
  // const currentCourseContent = useBoundStore((x) => x.currentCourseContent);

  useEffect(() => {
    const containsLevelTooltip = (event: MouseEvent) => {
      if (selectedLevel !== index) return;
      const clickIsInsideTooltip = levelTooltipRef.current?.contains(
        event.target as Node
      );
      if (clickIsInsideTooltip) return;
      closeTooltip();
    };

    window.addEventListener("click", containsLevelTooltip, true);
    return () => window.removeEventListener("click", containsLevelTooltip, true);
  }, [selectedLevel, levelTooltipRef, closeTooltip, index]);

  const chapter = chapters.find(
    (chapter) => chapter.chapterNumber === chapterNumber
  );
  const activeBackgroundColor = chapter?.backgroundColor ?? "bg-green-500";
  const activeTextColor = chapter?.textColor ?? "text-green-500";

  const router = useRouter();
  const setCurrentLevel = useBoundStore((x) => x.setCurrentLevel);
  const setCurrentLevelContent = useBoundStore((x) => x.setCurrentLevelContent);
  const token = useBoundStore((x) => x.token);

  const fetchProblems = async () => {
    const id = level.id;
    const response = await fetch(
      `http://localhost:8000/api/courses/level/get/${id}/`,
      // `http://localhost:8000/api/courses/level/get/1/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  };

  const enterLevelHandler = async (e) => {
    e.preventDefault;
    setCurrentLevel(level);

    const levelProblems = await fetchProblems();
    setCurrentLevelContent(levelProblems);    

    void router.push("/level");
  }

  const practiceLevelHandler = async (e) => {
    e.preventDefault;
    setCurrentLevel(level);

    const levelProblems = await fetchProblems();
    setCurrentLevelContent(levelProblems);    

    void router.push("/level?practice");
  }

  return (
    <div
      className={[
        "relative h-0 w-full",
        index === selectedLevel ? "" : "invisible",
      ].join(" ")}
      ref={levelTooltipRef}
    >
      <div
        className={[
          "absolute z-30 flex w-[300px] flex-col gap-4 rounded-xl p-4 font-bold transition-all duration-300",
          status === "ACTIVE"
            ? activeBackgroundColor
            : status === "LOCKED"
            ? "border-2 border-gray-200 bg-gray-100"
            : "bg-yellow-400",
          index === selectedLevel ? "top-4 scale-100" : "-top-14 scale-0",
        ].join(" ")}
        style={{ left: "calc(50% - 150px)" }}
      >
        <div
          className={[
            "absolute left-[140px] top-[-8px] h-4 w-4 rotate-45",
            status === "ACTIVE"
              ? activeBackgroundColor
              : status === "LOCKED"
              ? "border-l-2 border-t-2 border-gray-200 bg-gray-100"
              : "bg-yellow-400",
          ].join(" ")}
          style={{
            left: getLevelTooltipLeftOffset({
              index,
              chapterNumber,
              levelsLength,
            }),
          }}
        ></div>
        <div
          className={[
            "text-lg",
            status === "ACTIVE"
              ? "text-white"
              : status === "LOCKED"
              ? "text-gray-400"
              : "text-yellow-600",
          ].join(" ")}
        >
          {description}
        </div>
        {status === "ACTIVE" ? (
          <button
            // href="/level"
            className={[
              "flex w-full items-center justify-center rounded-xl border-b-4 border-gray-200 bg-white p-3 uppercase",
              activeTextColor,
            ].join(" ")}
            onClick={enterLevelHandler}
          >
            Start
          </button>
        ) : status === "LOCKED" ? (
          <button
            className="w-full rounded-xl bg-gray-200 p-3 uppercase text-gray-400"
            disabled
          >
            Locked
          </button>
        ) : (
          <button
            // href="/level?practice"
            className="flex w-full items-center justify-center rounded-xl border-b-4 border-yellow-200 bg-white p-3 uppercase text-yellow-400"
            onClick={practiceLevelHandler}
          >
            Practice
          </button>
        )}
      </div>
    </div>
  );
};

const ChapterSection = ({
  chapter,
  currentCourse,
  lessonsCompleted,
  currentCourseContent,
}: {
  chapter: Chapter;
  currentCourse: Course;
  lessonsCompleted: number;
  currentCourseContent: Chapter[];
}): JSX.Element => {
  const [selectedLevel, setSelectedLevel] = useState<null | number>(null);
  const closeTooltip = useCallback(() => setSelectedLevel(null), []);

  useEffect(() => {
    const unselectLevel = () => setSelectedLevel(null);
    window.addEventListener("scroll", unselectLevel);
    return () => window.removeEventListener("scroll", unselectLevel);
  }, []);

  return (
    <>
      <ChapterHeader
        chapterNumber={chapter.chapterNumber}
        description={chapter.description}
        backgroundColor={chapter.backgroundColor}
        borderColor={chapter.borderColor}
      />
      <div className="relative mb-8 mt-[67px] flex max-w-2xl flex-col items-center gap-4">
        {chapter.levels.map((level, i): JSX.Element => {
          const status = levelStatus(
            currentCourseContent,
            level,
            lessonsCompleted,
          );
          return (
            <Fragment key={i}>
              {(() => {
                switch (level.lessonType) {
                  case "star":
                  case "book":
                  case "dumbbell":
                  case "trophy":
                  case "treasure":
                    if (
                      level.lessonType === "trophy" &&
                      status === "COMPLETE"
                    ) {
                      return (
                        <div className="relative">
                          <LevelIcon
                            levelType={level.lessonType}
                            status={status}
                          />
                          <div className="absolute left-0 right-0 top-6 flex justify-center text-lg font-bold text-yellow-700">
                            {chapter.chapterNumber}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        className={[
                          "relative -mb-4 h-[93px] w-[98px]",
                          getLevelLeftClassName({
                            index: i,
                            chapterNumber: chapter.chapterNumber,
                            levelsLength: chapter.levels.length,
                          }),
                        ].join(" ")}
                      >
                        <LessonCompletionSvg
                          lessonsCompleted={lessonsCompleted}
                          status={status}
                        />
                        <button
                          className={[
                            "absolute m-3 rounded-full border-b-8 p-4",
                            getLevelColors({
                              levelType: level.lessonType,
                              status,
                              defaultColors: `${chapter.borderColor} ${chapter.backgroundColor}`,
                            }),
                          ].join(" ")}
                          onClick={() => {
                            setSelectedLevel(i);
                          }}
                        >
                          <LevelIcon
                            levelType={level.lessonType}
                            status={status}
                          />
                          <span className="sr-only">Show lesson</span>
                        </button>
                      </div>
                    );
                }
              })()}
              <LevelTooltip
                level={level}
                selectedLevel={selectedLevel}
                index={i}
                chapters={currentCourseContent}
                chapterNumber={chapter.chapterNumber}
                levelsLength={chapter.levels.length}
                description={(() => {
                  switch (level.lessonType) {
                    case "book":
                    case "dumbbell":
                    case "star":
                    case "treasure":
                      return level.description;
                    case "trophy":
                      return `Chapter ${chapter.chapterNumber} review`;
                  }
                })()}
                status={status}
                closeTooltip={closeTooltip}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

const getTopBarColors = (
  scrollY: number,
  chapters: Chapter[]
): {
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
} => {
  // const currentCourseContent = useBoundStore((x) => x.currentCourseContent)
  const defaultColors = {
    backgroundColor: "bg-[#58cc02]",
    borderColor: "border-[#46a302]",
  } as const;

  if (scrollY < 680) {
    return defaultColors;
  } else if (scrollY < 1830) {
    return chapters[1] ?? defaultColors;
  } else {
    return chapters[2] ?? defaultColors;
  }
};

const LessonCompletionSvg = ({
  lessonsCompleted,
  status,
  style = {},
}: {
  lessonsCompleted: number;
  status: LevelStatus;
  style?: React.HTMLAttributes<SVGElement>["style"];
}) => {
  if (status !== "ACTIVE") {
    return null;
  }
  return <LessonCompletionSvg0 style={style} />;
  // switch (lessonsCompleted % 4) {
  //   case 0:
  //     return <LessonCompletionSvg0 style={style} />;
  //   case 1:
  //     return <LessonCompletionSvg1 style={style} />;
  //   case 2:
  //     return <LessonCompletionSvg2 style={style} />;
  //   case 3:
  //     return <LessonCompletionSvg3 style={style} />;
  //   default:
  //     return null;
  // }
};

const HoverLabel = ({
  text,
  textColor,
}: {
  text: string;
  textColor: `text-${string}`;
}) => {
  const hoverElement = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(72);

  useEffect(() => {
    setWidth(hoverElement.current?.clientWidth ?? width);
  }, [hoverElement.current?.clientWidth, width]);

  return (
    <div
      className={`absolute z-10 w-max animate-bounce rounded-lg border-2 border-gray-200 bg-white px-3 py-2 font-bold uppercase ${textColor}`}
      style={{
        top: "-25%",
        left: `calc(50% - ${width / 2}px)`,
      }}
      ref={hoverElement}
    >
      {text}
      <div
        className="absolute h-3 w-3 rotate-45 border-b-2 border-r-2 border-gray-200 bg-white"
        style={{ left: "calc(50% - 8px)", bottom: "-8px" }}
      ></div>
    </div>
  );
};

const ChapterHeader = ({
  chapterNumber,
  description,
  backgroundColor,
  borderColor,
}: {
  chapterNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
}) => {
  const language = useBoundStore((x) => x.currentLanguage);
  return (
    <article
      className={["max-w-2xl rounded-xl text-white", backgroundColor].join(" ")}
    >
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Chapter {chapterNumber}</h2>
          <p className="text-lg">{description}</p>
        </div>
        <Link
          href={`https://duolingo.com/guidebook/${language.code}/${chapterNumber}`}
          className={[
            "flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:text-gray-100",
            borderColor,
          ].join(" ")}
        >
          <GuidebookSvg />
          <span className="sr-only font-bold uppercase lg:not-sr-only">
            Guidebook
          </span>
        </Link>
      </header>
    </article>
  );
};

////////////////////
// MAIN COMPONENT //
////////////////////

const Learn: NextPage = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);
    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const token = useBoundStore((x) => x.token);

  const currentCourse = useBoundStore((x) => x.currentCourse);
  const currentCourseContent = useBoundStore((x) => x.currentCourseContent);
  const setCurrentCourseContent = useBoundStore(
    (x) => x.setCurrentCourseContent
  );
  const courseDatas = useBoundStore((x) => x.courseDatas)
  const lessonsCompleted = courseDatas.find((data) => data.courseID === currentCourse.id)
    ?.lessonsCompleted || 0;

  const fetchChaptersAndLessons = async () => {
    const id = currentCourse.id;
    const response = await fetch(
      `http://localhost:8000/api/courses/chapters/get/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  };

  const {
    data: chapters,
    isLoading,
    error,
  } = useQuery("chapterslessons", fetchChaptersAndLessons);

  useEffect(() => {
    setCurrentCourseContent(chapters);
  }, [chapters, setCurrentCourseContent]);

  const topBarColors = getTopBarColors(scrollY, currentCourseContent);

  return (
    <div>
      <TopBar
        backgroundColor={topBarColors.backgroundColor}
        borderColor={topBarColors.borderColor}
      />
      <LeftBar selectedTab="Learn" />

      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex max-w-2xl grow flex-col">
          <div className="px-4 py-7">
            {" "}
            {isLoading && <DefaultSpinner />}
            {currentCourseContent &&
              currentCourseContent.map((chapter) => (
                <ChapterSection
                  chapter={chapter}
                  key={chapter.chapterNumber}
                  currentCourse={currentCourse}
                  lessonsCompleted={lessonsCompleted}
                  currentCourseContent={currentCourseContent}
                />
              ))}
            <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
              <Link
                href="/level?practice"
                className="absolute left-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-b-4 border-gray-200 bg-white transition hover:bg-gray-50 hover:brightness-90 md:left-0"
              >
                <span className="sr-only">Practice exercise</span>
                <PracticeExerciseSvg className="h-8 w-8" />
              </Link>
              {scrollY > 100 && (
                <button
                  className="absolute right-4 flex h-14 w-14 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 bg-white transition hover:bg-gray-50 hover:brightness-90 md:right-0"
                  onClick={() => scrollTo(0, 0)}
                >
                  <span className="sr-only">Jump to top</span>
                  <UpArrowSvg />
                </button>
              )}
            </div>
          </div>
        </div>
        <RightBar />
      </div>

      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Learn" />
    </div>
  );
};

export default Learn;
