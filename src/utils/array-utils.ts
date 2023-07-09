export const range = (lo: number, hi: number): number[] => {
  const result = Array<number>(hi - lo);
  for (let i = lo; i < hi; i++) {
    result[i - lo] = i;
  }
  return result;
};

export const sum = (numbers: number[]): number => {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return total;
};

export const generateFragments = (answer: string): string[] => {
  let fragments: string[] = Array.from(answer); // Convert answer string to an array

  while (fragments.length < 20) {
    const randomIndex = Math.floor(Math.random() * 26); // Generate a random index from 0 to 26 (for 26 lowercase letters)
    const randomChar = String.fromCharCode(randomIndex + 97); // Convert random index to character code

    fragments.push(randomChar);
  }

  for (let i = fragments.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fragments[i], fragments[j]] = [fragments[j], fragments[i]];
  }

  return fragments;
};