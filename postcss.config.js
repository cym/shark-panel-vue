import process from 'node:process';

/**
 * Postcss配置
 *
 * @see https://github.com/postcss/postcss
 * @type {import('postcss-load-config').Config}
 */
export default {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
