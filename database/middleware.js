module.exports = (req, res, next) => {
  const shouldThrowError = Math.random() < 0.3; // 30% chance to throw an error
  if (shouldThrowError) {
    res.status(500).json("Random server error");
  } else {
    next();
  }
};
