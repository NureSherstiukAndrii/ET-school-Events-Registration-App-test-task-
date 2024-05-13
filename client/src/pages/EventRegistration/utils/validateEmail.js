const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !(emailRegex.test(value)) ? "Incorrect email" : undefined;
};

export default validateEmail;