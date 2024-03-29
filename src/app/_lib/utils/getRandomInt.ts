interface Params {
  min?: number
  max?: number
}

function getRandomInt({ min = 0, max = 1 }: Params) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default getRandomInt;
