export const filterTitle = Title => {
  const isALetter = c => c.toLowerCase() !== c.toUpperCase();

  const trimNonLetters = str => {
    return str.split(" ").filter(w => (w.length === 1 ? isALetter(w) : w));
  };

  const removeAllNonLetters = arr => {
    return arr.map(w => {
      return w
        .split("")
        .filter(isALetter)
        .join("");
    });
  };

  const toTitleCase = arr =>
    arr.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" ");

  const trimedNonLetters = trimNonLetters(Title);
  const trimedAllNonLetters = removeAllNonLetters(trimedNonLetters);

  if (trimedAllNonLetters[0].length) {
    return toTitleCase(trimedAllNonLetters);
  } else {
    return "";
  }
};
