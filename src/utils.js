export function shuffleArray(array) {
  // create a copy of the array to avoid mutating the original
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // swap the elements at i and randomIndex
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}
