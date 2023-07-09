import useSound from "use-sound";

const soundUrl = "/sounds/effects.mp3";

export const playSound = (id) => {
  const [play] = useSound(soundUrl, {
    sprite: {
      success: [7177, 1550],
      fail: [8859, 1605],
    },
  });

  const playSoundEffect = () => {
    play({ id: id });
  };

  return playSoundEffect;
};
