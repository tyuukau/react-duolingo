import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BottomBar } from "../components/navigation/BottomBar";
import { LeftBar } from "../components/navigation/LeftBar";
import { RightBar } from "../components/navigation/RightBar";
import { TopBar } from "../components/navigation/TopBar";
import { useBoundStore } from "../hooks/useBoundStore";

import { useQuery } from "react-query";
import CourseCard from "~/components/CourseCard";
import DefaultSpinner from "~/components/Spinner";


const Home: NextPage = () => {
  const router = useRouter();
  const loggedIn = useBoundStore((x) => x.loggedIn);
  const language = useBoundStore((x) => x.currentLanguage);
  const token = useBoundStore((x) => x.token);

  useEffect(() => {
    if (!loggedIn) {
      void router.push("/");
    }
    if (!language) {
      void router.push("/register");
    }
  }, [router]);

  const fetchCourses = async () => {
    const code = language.code;
    const response = await fetch(`http://localhost:8000/api/courses/${code}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  };

  const { data: courses, isLoading, error } = useQuery("courses", fetchCourses);

  return (
    <div>
      <TopBar />
      <LeftBar selectedTab="Courses" />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex max-w-2xl grow flex-col px-4 pb-20">
          <div className="py-7">
            <h1 className="mb-5 text-2xl font-bold">Courses</h1>
            {isLoading && <DefaultSpinner />}
            {courses && (
              <div className="flex flex-col gap-y-6">
                {" "}
                {courses.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}{" "}
              </div>
            )}
          </div>
        </div>
        <RightBar />
      </div>

      <div className="pt-[90px]"></div>

      <BottomBar selectedTab="Courses" />
    </div>
  );
};

export default Home;
