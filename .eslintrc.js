module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    "jsx-quotes": ["error", "prefer-double"], // Enforce double quotes in JSX
    "quotes": ["error", "double", { "avoidEscape": true }], // Enforce double quotes, but allow single quotes if escaping is needed
  },
};
