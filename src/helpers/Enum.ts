function enumContains(anyEnum: any, key: string) {
  return Object.values(anyEnum).includes(key as typeof anyEnum);
}

export { enumContains };
