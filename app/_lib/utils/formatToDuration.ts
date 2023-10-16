interface Params {
  minutes: number
  seconds: number
}

export default function formatToDuration({ minutes, seconds }: Params) {
  const padStart = (number: number) => number.toString().padStart(2, '0');

  return `${padStart(minutes)}:${padStart(seconds)}`;
}
