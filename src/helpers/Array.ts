function arrayAdd(array: any[], items: any[]) {
  for (const val of items) {
    array.push(val);
  }
}

function arrayRemove(array: any[], items: any[]) {
  for (const val of items) {
    const index = array.indexOf(val);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
}

function arraySubset(array: any[], subarray: any[]) {
  const tempArray = [...array];
  let result = true;

  for (const val of subarray) {
    const index = tempArray.indexOf(val);
    if (index > -1) {
      tempArray.splice(index, 1);
    } else {
      result = false;
    }
  }

  return result;
}

export { arrayAdd, arrayRemove, arraySubset };
