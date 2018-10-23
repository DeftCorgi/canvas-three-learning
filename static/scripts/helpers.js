const randomIntFromRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

module.exports = {
  randomIntFromRange
};
