const config = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ["./jest-setup.js"]
};

module.exports = config;