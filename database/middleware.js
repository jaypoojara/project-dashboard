module.exports = (req, res, next) => {
  const shouldThrowError = Math.random() < 0.05; // 5% chance to throw an error
  if (shouldThrowError) {
    res.status(500).json("Internal Server Error");
  } else {
    next();
  }
};
