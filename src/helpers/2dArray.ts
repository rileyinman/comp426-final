function indexOf2d(array2d: string[][], toFind: string) {
  let colIndex;

  let result = array2d.map((row, rowIndex) => {
    colIndex = row.indexOf(toFind);
    if (colIndex > -1) {
      return [rowIndex, colIndex];
    }
    return -1;
  });

  return result.find(elem => elem !== -1);
}

export { indexOf2d };
