const info = (...params) => {
  if (process.env.NODE_ENV !== "test" || true) {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test" || true) {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
