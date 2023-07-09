import type { NextPage } from "next";
import Link from "next/link";
// import languages from "../utils/fakeDatas/fakeLanguages";
import { FluenciaHeader } from "../components/FluenciaHeader";
import { useBoundStore } from "../hooks/useBoundStore";
import _bgSnow from "../../public/bg-snow.svg";
import type { StaticImageData } from "next/image";

import DefaultSpinner from "../components/Spinner";

import { useQuery, useMutation } from "react-query";

const bgSnow = _bgSnow as StaticImageData;

const RegisterLanguage: NextPage = () => {
  const token = useBoundStore((x) => x.token);
  const setLanguages = useBoundStore((x) => x.setLanguages);
  const setCurrentLanguage = useBoundStore((x) => x.setCurrentLanguage);

  const addLanguageMutation = useMutation((data) =>
    fetch("http://localhost:8000/api/courses/languages/add/", {
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

  // const fetchLanguageProfile = async (token) => {
  //   const response = await fetch(
  //     "http://localhost:8000/api/courses/languages/profile/get/",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     return response.json();
  //   }
  //   return Promise.reject(response);
  // };

  const addNewLanguageHandler = async (language) => {
    try {
      const languageCode = language.code;
      const languageProfileData = await addLanguageMutation.mutateAsync({ language_code: languageCode });
      setLanguages(languageProfileData.learning_languages);
      setCurrentLanguage(languageProfileData.current_language);
      console.log('Language added and set as current language successfully');
    } catch (error) {
      console.error('Failed to add language and set as current language:', error);
    }
  };

  const fetchLanguages = async () => {
    const response = await fetch(
      "http://localhost:8000/api/courses/languages/all/",
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
    data: languages,
    isLoading,
    error,
  } = useQuery("languages", fetchLanguages);

  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <FluenciaHeader />
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          I want to learn...
        </h1>
        {isLoading && <DefaultSpinner />}
        {languages && (
          <section className="mx-auto grid w-full max-w-5xl grow grid-cols-1 flex-col gap-x-2 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {languages.map((language) => (
              <Link
                key={language.name}
                href="/learn"
                className={
                  "flex max-h-20 cursor-pointer place-content-center items-center flex-col gap-4 rounded-2xl border-2 border-b-4 border-gray-400 px-5 text-xl font-bold hover:bg-gray-300 hover:bg-opacity-20"
                }
                onClick={() => addNewLanguageHandler(language)}
              >
                <span>{language.name}</span>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default RegisterLanguage;
