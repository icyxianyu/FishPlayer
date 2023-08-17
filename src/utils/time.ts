function timeToMinutes(time: string | number) {
  const minutes = Math.floor(Number(time) / 60);
  const seconds = Math.floor(Number(time) % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
export { timeToMinutes };
