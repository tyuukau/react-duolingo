import { type NextPage } from "next";
import type { StaticImageData } from "next/image";
import _bgSnow from "../../public/bg-snow.svg";
import _globe from "../../public/svgs/globe.svg";
import { FluenciaHeader } from "../components/FluenciaHeader";
import { GlobeSvg } from "../components/Svgs";
import { LoginScreen, useLoginScreen } from "../components/screens/LoginScreen";

const bgSnow = _bgSnow as StaticImageData;
const globe = _globe as StaticImageData;

const Home: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-[#235390] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <FluenciaHeader />
      <div className="flex w-full flex-col items-center justify-center gap-3 px-4 pt-12 2xs:pt-16 md:flex-row md:gap-36">
        <GlobeSvg className="w-[280px] xs:w-[300px]" />
        <div>
          <p className="mb-6 max-w-[600px] text-center font-bold md:mb-12 text-2xl xs:text-3xl xl:text-5xl">
            Learn a new language!
          </p>
          <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-3">
            <button
              className="w-full border-b-4 border-r-4 border-green-700 bg-green-600 px-10 py-3 text-center text-xl font-bold uppercase transition hover:border-green-600 hover:bg-green-500 md:min-w-[320px]"
              onClick={() => setLoginScreenState("SIGNUP")}
            >
              Get started
            </button>
            <button
              className="w-full border-2 border-b-4 border-r-4 border-[#042c60] bg-[#235390] px-8 py-3 text-xl font-bold uppercase transition hover:bg-[#204b82] md:min-w-[320px]"
              onClick={() => setLoginScreenState("LOGIN")}
            >
              Or sign in
            </button>
          </div>
        </div>
      </div>
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </main>
  );
};

export default Home;
