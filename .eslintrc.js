module.exports = {
  // 支持解析ts
  parser: "@typescript-eslint/parser",
  // @typescript-eslint检查语法，@stylistic检查代码风格
  plugins: ["@typescript-eslint", "@stylistic"],
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "warn",
    "no-unused-vars": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-var": "error",
    "prefer-template": "error",
    "no-multi-assign": "error",
    "no-case-declarations": "error",
    "no-else-return": "error",
    "comma-dangle": ["error", "always-multiline"],
    "function-paren-newline": ["error", "consistent"],
    "object-shorthand": [
      "error",
      "methods",
      {
        avoidExplicitReturnArrows: true,
      },
    ],
    "no-confusing-arrow": "error",
    quotes: ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "space-infix-ops": [
      "error",
      {
        int32Hint: false,
      },
    ],
    "max-len": [
      "error",
      120,
      {
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    eqeqeq: ["off", "always"],
    "arrow-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "block-spacing": ["error", "always"],
    "comma-spacing": [
      "error",
      {
        before: false,
        after: true,
      },
    ],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    "no-unneeded-ternary": [
      "error",
      {
        defaultAssignment: false,
      },
    ],
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before",
        },
      },
    ],
    semi: ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    camelcase: "off",
    "no-mixed-operators": "off",
    "jsx-a11y/alt-text": "off",
    "arrow-parens": ["error", "always"],
    "no-param-reassign": "off",
    "prefer-rest-params": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@stylistic/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "none",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": ["off", { args: "none" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
