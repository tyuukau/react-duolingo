// const ProblemShortAnswer = ({
//   problem,
//   correctAnswerCount,
//   questionCount,
//   writtenAnswer,
//   setWrittenAnswer,
//   quitMessageShown,
//   correctAnswerShown,
//   setQuitMessageShown,
//   isAnswerCorrect,
//   onAttack,
//   onFinish,
//   onSkip,
//   report,
//   hearts,
// }: {
//   problem: LessonProblem;
//   correctAnswerCount: number;
//   questionCount: number;
//   writtenAnswer: string;
//   setWrittenAnswer: React.Dispatch<React.SetStateAction<string>>;
//   correctAnswerShown: boolean;
//   quitMessageShown: boolean;
//   setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
//   isAnswerCorrect: boolean;
//   onAttack: () => void;
//   onFinish: () => void;
//   onSkip: () => void;
//   report: () => void;
//   hearts: number | null;
// }) => {
//   const { question, correctAnswer } = problem;

//   return (
//     <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
//       <div className="flex grow flex-col items-center gap-5">
//         <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
//           <ProgressBar
//             correctAnswerCount={correctAnswerCount}
//             questionCount={questionCount}
//             setQuitMessageShown={setQuitMessageShown}
//             hearts={hearts}
//           />
//         </div>
//         <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24">
//           <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
//             Fill in the blank
//           </h1>

//           <div className="w-full">
//             <div className="flex items-center">
//               {/* <Image src={womanPng} alt="" width={92} height={115} /> */}
//               <div className="relative ml-2 w-fit rounded-2xl border-2 border-gray-200 p-4">
//                 {question}
//                 <div
//                   className="absolute h-4 w-4 rotate-45 border-b-2 border-l-2 border-gray-200 bg-white"
//                   style={{
//                     top: "calc(50% - 8px)",
//                     left: "-10px",
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           <div className="w-full">
//             <div className="flex items-center">
//               <input
//                 className="grow rounded-2xl border-2 border-gray-200 bg-gray-50 px-4 py-3"
//                 placeholder="Write your answer"
//                 onChange={(e) => setWrittenAnswer(e.target.value)}
//               />
//             </div>
//           </div>
//         </section>
//       </div>

//       <CheckAnswer
//         correctAnswer={correctAnswer}
//         correctAnswerShown={correctAnswerShown}
//         isAnswerCorrect={isAnswerCorrect}
//         isAnswerSelected={writtenAnswer !== null && writtenAnswer !== ""}
//         onAttack={onAttack}
//         onFinish={onFinish}
//         onSkip={onSkip}
//         report={report}
//       />

//       <QuitMessage
//         quitMessageShown={quitMessageShown}
//         setQuitMessageShown={setQuitMessageShown}
//       />
//     </div>
//   );
// };

// const ProblemMultipleChoices = ({
//   problem,
//   correctAnswerCount,
//   questionCount,
//   selectedAnswer,
//   setSelectedAnswer,
//   quitMessageShown,
//   correctAnswerShown,
//   setQuitMessageShown,
//   isAnswerCorrect,
//   onAttack,
//   onFinish,
//   onSkip,
//   report,
//   hearts,
// }: {
//   problem: LessonProblem;
//   correctAnswerCount: number;
//   questionCount: number;
//   selectedAnswer: number | null;
//   setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
//   correctAnswerShown: boolean;
//   quitMessageShown: boolean;
//   setQuitMessageShown: React.Dispatch<React.SetStateAction<boolean>>;
//   isAnswerCorrect: boolean;
//   onAttack: () => void;
//   onFinish: () => void;
//   onSkip: () => void;
//   report: () => void;
//   hearts: number | null;
// }) => {
//   const { question, answers, correctAnswer } = problem;

//   return (
//     <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
//       <div className="flex grow flex-col items-center gap-5">
//         <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
//           <ProgressBar
//             correctAnswerCount={correctAnswerCount}
//             questionCount={questionCount}
//             setQuitMessageShown={setQuitMessageShown}
//             hearts={hearts}
//           />
//         </div>
//         <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 sm:px-5">
//           <h1 className="self-start text-2xl font-bold sm:text-3xl">
//             {question}
//           </h1>
//           <div
//             className="grid grid-cols-2 gap-2 sm:grid-cols-3"
//             role="radiogroup"
//           >
//             {answers.map((answer, i) => {
//               return (
//                 <div
//                   key={i}
//                   className={
//                     i === selectedAnswer
//                       ? "cursor-pointer rounded-xl border-2 border-b-4 border-blue-300 bg-blue-100 p-4 text-blue-400"
//                       : "cursor-pointer rounded-xl border-2 border-b-4 border-gray-200 p-4 hover:bg-gray-100"
//                   }
//                   role="radio"
//                   aria-checked={i === selectedAnswer}
//                   tabIndex={0}
//                   onClick={() => setSelectedAnswer(i)}
//                 >
//                   {/* {answer.icon} */}
//                   <h2 className="text-center">{answer.name}</h2>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       </div>

//       <CheckAnswer
//         correctAnswer={correctAnswer}
//         correctAnswerShown={correctAnswerShown}
//         isAnswerCorrect={isAnswerCorrect}
//         isAnswerSelected={selectedAnswer !== null}
//         onAttack={onAttack}
//         onFinish={onFinish}
//         onSkip={onSkip}
//         report={report}
//       />

//       <QuitMessage
//         quitMessageShown={quitMessageShown}
//         setQuitMessageShown={setQuitMessageShown}
//       />
//     </div>
//   );
// };

// switch (problem.formType) {
//     case "MULTIPLE_CHOICES": {
//       return (
//         <ProblemMultipleChoices
//           problem={problem}
//           correctAnswerCount={correctAnswerCount}
//           questionCount={questionCount}
//           selectedAnswer={selectedAnswer}
//           setSelectedAnswer={setSelectedAnswer}
//           quitMessageShown={quitMessageShown}
//           correctAnswerShown={correctAnswerShown}
//           setQuitMessageShown={setQuitMessageShown}
//           isAnswerCorrect={isAnswerCorrect}
//           onAttack={onAttack}
//           onFinish={onFinish}
//           onSkip={onSkip}
//           report={report}
//           hearts={hearts}
//         />
//       );
//     }

//     case "ANSWER_SHUFFLES": {
//       return (
//         <ProblemWithAnswerFragments
//           problem={problem}
//           correctAnswerCount={correctAnswerCount}
//           questionCount={questionCount}
//           selectedAnswers={selectedAnswers}
//           setSelectedAnswers={setSelectedAnswers}
//           quitMessageShown={quitMessageShown}
//           correctAnswerShown={correctAnswerShown}
//           setQuitMessageShown={setQuitMessageShown}
//           isAnswerCorrect={isAnswerCorrect}
//           onAttack={onAttack}
//           onFinish={onFinish}
//           onSkip={onSkip}
//           report={report}
//           hearts={hearts}
//         />
//       );
//     }

//     case "SHORT_ANSWER": {
//       return (
//         <ProblemShortAnswer
//           problem={problem}
//           correctAnswerCount={correctAnswerCount}
//           questionCount={questionCount}
//           writtenAnswer={writtenAnswer}
//           setWrittenAnswer={setWrittenAnswer}
//           quitMessageShown={quitMessageShown}
//           correctAnswerShown={correctAnswerShown}
//           setQuitMessageShown={setQuitMessageShown}
//           isAnswerCorrect={isAnswerCorrect}
//           onAttack={onAttack}
//           onFinish={onFinish}
//           onSkip={onSkip}
//           report={report}
//           hearts={hearts}
//         />
//       );
//     }
//   }

// const LessonFastForwardStart = ({
//     chapterNumber,
//     setIsStartingLesson,
//   }: {
//     chapterNumber: number;
//     setIsStartingLesson: React.Dispatch<React.SetStateAction<boolean>>;
//   }) => {
//     return (
//       <div className="flex min-h-screen flex-col px-5 py-8 text-center">
//         <div className="flex grow flex-col items-center justify-center gap-5">
//           <LessonFastForwardStartSvg />
//           <h1 className="text-lg font-bold">
//             Want to jump to Chapter {chapterNumber}?
//           </h1>
//           <p className="text-sm text-gray-400">
//             {`Pass the test to jump ahead. We won't make it easy for you though.`}
//           </p>
//         </div>
//         <div className="flex flex-col gap-5"></div>
//         <section className="border-gray-200 sm:border-t-2 sm:p-10">
//           <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
//             <Link
//               href="/learn"
//               className="font-bold uppercase text-blue-400 transition hover:brightness-110"
//             >
//               Maybe later
//             </Link>
//             <button
//               className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
//               onClick={() => setIsStartingLesson(false)}
//             >
//               {`Let's go`}
//             </button>
//           </div>
//         </section>
//       </div>
//     );
//   };

// const LessonFastForwardEndPass = ({
//   chapterNumber,
//   reviewLessonShown,
//   setReviewLessonShown,
//   questionResults,
// }: {
//   chapterNumber: number;
//   reviewLessonShown: boolean;
//   setReviewLessonShown: React.Dispatch<React.SetStateAction<boolean>>;
//   questionResults: QuestionResult[];
// }) => {
//   const jumpToChapter = useBoundStore((x) => x.jumpToChapter);
//   const language = useBoundStore((x) => x.currentLanguage);
//   return (
//     <div className="flex min-h-screen flex-col px-5 py-8 text-center">
//       <div className="flex grow flex-col items-center justify-center gap-5">
//         <LessonFastForwardEndPassSvg />
//         <h1 className="text-2xl font-bold">
//           You unlocked Chapter {chapterNumber}!
//         </h1>
//         <p className="text-lg text-gray-500">
//           Way to go! You’re making great strides!
//         </p>
//       </div>
//       <section className="border-gray-200 sm:border-t-2 sm:p-10">
//         <div className="mx-auto flex max-w-5xl sm:justify-between">
//           <button
//             className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
//             onClick={() => setReviewLessonShown(true)}
//           >
//             Review lesson
//           </button>
//           <Link
//             className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
//             href="/learn"
//             onClick={() => jumpToChapter(language, chapterNumber)}
//           >
//             Continue
//           </Link>
//         </div>
//       </section>
//       <ReviewLesson
//         reviewLessonShown={reviewLessonShown}
//         setReviewLessonShown={setReviewLessonShown}
//         questionResults={questionResults}
//       />
//     </div>
//   );
// };
