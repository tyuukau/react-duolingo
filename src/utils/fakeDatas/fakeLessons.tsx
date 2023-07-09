import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { AppleSvg, 
  BoySvg, 
  WomanSvg } from "~/components/Svgs";

export type LevelProblem = {
  id: number,
  contentType: string,
  question: string,
  prompt: string,
  levelImage: string,
  levelSound: string,
  correctAnswer: string,
  hint: string,
}

const levelProblem1 = {
  formType: "ANSWER_SHUFFLES",
  contentType: "TRANSLATION",
  question: "Translate to English",
  prompt: "Mädchen",
  correctAnswer: "girl",
} as const;

const levelProblem2 = {
  formType: "ANSWER_SHUFFLES",
  contentType: "TRANSLATION",
  question: "Translate to English",
  prompt: "Junge",
  correctAnswer: "boy",
} as const;

const levelProblem3 = {
  formType: "ANSWER_SHUFFLES",
  contentType: "TRANSLATION",
  question: "Translate to English",
  prompt: "Mann",
  correctAnswer: "man",
} as const;

export const fakeLessonProblems = [levelProblem1, levelProblem2, levelProblem3];
