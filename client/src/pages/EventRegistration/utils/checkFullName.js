const isFullName = (value) => {
  const words = value.split(" ");

  return words[1].length > 0 ? undefined : "Add name and surname";
};

export default isFullName;