import antfu from '@antfu/eslint-config';

/**
 * Eslint配置
 *
 * @see https://github.com/antfu/eslint-config
 * @type {import("@antfu/eslint-config").Config}
 */
export default antfu(
  {
    vue: true,
    unocss: true,
    typescript: true,
    ignores: ['node_modules', 'public', 'dist*'],
    stylistic: {
      semi: true,
    },
  },
  [
    {
      rules: {
        curly: ['error', 'all'],
        'sort-imports': 'off',
        'style/arrow-parens': ['error', 'always'],
        'style/brace-style': [
          'warn',
          '1tbs',
          {
            allowSingleLine: true,
          },
        ],
        'style/quote-props': [
          'error',
          'as-needed',
          {
            keywords: false,
            unnecessary: true,
            numbers: false,
          },
        ],
      },
    },
    {
      files: ['src/**/*.vue'],
      rules: {
        'vue/block-order': [
          'error',
          {
            order: ['route', 'template', 'script', 'style'],
          },
        ],
      },
    },
  ],
);
