"use client";

import { Card } from "flowbite-react";
import { useBoundStore } from "../hooks/useBoundStore";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export default function CourseCard({ course }) {
  const router = useRouter();
  const learningCourses = useBoundStore((x) => x.learningCourses);
  const setCourseProfile = useBoundStore((x) => x.setCourseProfile);
  const setCurrentCourse = useBoundStore((x) => x.setCurrentCourse);
  const setCourseDatas = useBoundStore((x) => x.setCourseDatas);
  const setCourses = useBoundStore((x) => x.setCourses);
  const token = useBoundStore((x) => x.token);

  const setCurrentCourseMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/courses/set_current/", {
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

  const addCourseMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/courses/add/", {
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

  const fetchCourseDatas = async (token) => {
    const response = await fetch(
      "http://localhost:8000/api/courses/data/get/",
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

  const continueHandler = async (course) => {
    try {
      const courseProfileData = await setCurrentCourseMutation.mutateAsync({
        course_id: course.id,
      });
      setCurrentCourse(courseProfileData.current_course);
      void router.push('/learn');
    } catch (error) {
      console.error("Error continuing course:", error);
    }
  };

  const enrollHandler = async (course) => {
    try {
      const courseProfileData = await addCourseMutation.mutateAsync({ course_id: course.id });
      setCoures(courseProfileData.learning_courses);
      setCurrentCourse(courseProfileData.current_course);
      const courseDatas = await fetchCourseDatas(data.token);
      setCourseDatas(courseDatas);    
      void router.push('/learn');
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
    console.log("Enroll clicked");
  };

  return (
    <div className="rounded-lg border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={course.headerImage}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold text-gray-700 dark:text-white">
            {course.courseName}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {course.description}
        </p>
        <button
          href="#"
          className="flex items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110"
          onClick={() =>
            learningCourses.some((_course) => _course.id === course.id)
              ? continueHandler(course)
              : enrollHandler(course)
          }
        >
          {learningCourses.some((_course) => _course.id === course.id)
            ? "Continue"
            : "Enroll and learn"}
          <svg
            aria-hidden="true"
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    // <Card
    //   imgAlt="Meaningful alt text for an image that is not purely decorative"
    //   imgSrc={course.headerImage}
    // >
    //   <h5 className="text-2xl font-bold tracking-tight text-gray-900">
    //     <p>{course.courseName}</p>
    //   </h5>
    //   <div className="font-normal text-gray-700">
    //     <p>{course.language.name}</p>
    //     <p>{course.description}</p>
    //   </div>
    // </Card>
  );
}
