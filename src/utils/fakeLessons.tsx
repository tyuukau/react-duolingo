import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { AppleSvg, 
  BoySvg, 
  WomanSvg } from "~/components/Svgs";

const lessonProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Which one of these is "the apple"?`,
  answers: [
    { icon: <AppleSvg />, name: "la manzana" },
    { icon: <BoySvg />, name: "el niño" },
    { icon: <WomanSvg />, name: "la mujer" },
  ],
  correctAnswer: 0,
} as const;

const lessonProblem2 = {
  type: "WRITE_IN_ENGLISH",
  question: "El niño",
  answerTiles: ["woman", "milk", "water", "I", "The", "boy"],
  correctAnswer: [4, 5],
} as const;

export const fakeLessonProblems = [lessonProblem1, lessonProblem2];
