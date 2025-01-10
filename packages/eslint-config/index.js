module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    'no-console': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'indent': ['error', 2],
    'no-var': 'error',
    'prefer-template': 'error',
    'no-multi-assign': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': ['error', 'consistent'],
    'object-shorthand': ['error', 'methods', {
      'avoidExplicitReturnArrows': true,
    }],
    'no-confusing-arrow': 'error',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'space-infix-ops': ['error', {
      'int32Hint': false,
    }],
    'max-len': ['error', 120, {
      'ignoreComments': true,
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],
    'eqeqeq': ['off', 'always'],
    'arrow-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'block-spacing': ['error', 'always'],
    'comma-spacing': ['error', {
      'before': false,
      'after': true,
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true,
    }],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1,
    }],
    'no-unneeded-ternary': ['error', {
      'defaultAssignment': false,
    }],
    'operator-linebreak': ['error', 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    'semi': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'camelcase': 'off',
    'no-mixed-operators': 'off',
    'jsx-a11y/alt-text': 'off',
    'arrow-parens': ['error', 'always'],
    'no-param-reassign': 'off',
    'no-empty': 'off',
    'prefer-rest-params': 'off',
    'vue/html-self-closing': 'error',
    'vue/attributes-order': 'error',
    'vue/html-closing-bracket-spacing': ['error', {
      'selfClosingTag': 'always',
    }],
    'vue/html-indent': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
}
