export default function msToMinutesAndSeconds(ms: number) {
  const totalSeconts = ms / 100;
  const minutes = Math.floor(totalSeconts / 60);
  const seconds = minutes % 60;

  return { minutes, seconds };
}
