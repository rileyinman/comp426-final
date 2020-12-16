function formatTime(rawSeconds: number) {
  const minutes = Math.floor(rawSeconds / 60) % 60;
  const seconds = rawSeconds % 60;
  return [minutes, seconds].map(part => part < 10 ? `0${part}` : part).join(':');
}

export { formatTime };
