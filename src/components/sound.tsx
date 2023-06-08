import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import useSound from "use-sound";

const soundUrl = "/sounds/effects.mp3";

export const playSound = (id) => {
  const [play] = useSound(soundUrl, {
    sprite: {
      success: [7177, 1550],
      fail: [8859, 1605],
    },
    // onend: () => {
    //   console.info("Sound ended!");
    // },
  });

  const playSoundEffect = () => {
    play({ id: id });
  };

  return playSoundEffect;
};
