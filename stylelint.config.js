module.exports = {
    files: ["src/**/*.css"],
    extends: [
      "stylelint-config-standard",
      "stylelint-config-prettier",
    ],
    plugins: ["stylelint-order"],
    rules: {
      "number-leading-zero": ["never", { severity: "warning" }],
      "order/properties-alphabetical-order": [true, { severity: "warning" }],
      "no-empty-source": [true, { severity: "warning" }],
    },
  };