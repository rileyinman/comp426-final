function indexOf2d(array2d: string[][], toFind: string) {
  let colIndex;

  let result = array2d.map((row, rowIndex) => {
    colIndex = row.indexOf(toFind);
    if (colIndex > -1) {
      return [rowIndex, colIndex];
    }
    return null;
  });

  return result.find(elem => elem !== null);
}

export { indexOf2d };
