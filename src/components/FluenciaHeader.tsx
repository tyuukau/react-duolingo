import Link from "next/link";

export const FluenciaHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 mx-auto flex min-h-[70px] max-w-5xl items-center justify-between px-10 font-bold text-white">
      <Link className="text-4xl" href="/">
        fluencia
      </Link>
    </header>
  );
};
