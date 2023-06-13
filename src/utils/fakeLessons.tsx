import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { AppleSvg, 
  BoySvg, 
  WomanSvg } from "~/components/Svgs";

const lessonProblem1 = {
  formType: "MULTIPLE_CHOICES",
  contentType: "TRANSLATION",
  question: `Which one of these is "the apple"?`,
  answers: [
    { icon: <AppleSvg />, name: "der Apfel" },
    { icon: <BoySvg />, name: "der Junge" },
    { icon: <WomanSvg />, name: "die Frau" },
  ],
  correctAnswer: ["der Apfel"],
} as const;

const lessonProblem2 = {
  formType: "ANSWER_SHUFFLES",
  contentType: "TRANSLATION",
  question: "Der Junge",
  answerTiles: ["woman", "milk", "water", "I", "The", "boy"],
  correctAnswer: ["The boy"],
} as const;

const lessonProblem3 = {
  formType: "MULTIPLE_CHOICES",
  contentType: "FILL_IN",
  question: "Der Junge isst ____________",
  answers: [
    { icon: <AppleSvg />, name: "einen Apfel" },
    { icon: <BoySvg />, name: "einen Junge" },
    { icon: <WomanSvg />, name: "eine Frau" },
  ],
  correctAnswer: ["einen Apfel"],
} as const;

const lessonProblem4 = {
  formType: "SHORT_ANSWER",
  contentType: "FILL_IN",
  question: "Wir essen gerne ____________ (Plural of Apfel)",
  correctAnswer: ["Äpfel"],
}

export const fakeLessonProblems = [lessonProblem1, lessonProblem2, lessonProblem3, lessonProblem4];
