import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { type UserConfigExport, type ConfigEnv, loadEnv } from 'vite';
import dayjs from 'dayjs';
import pkg from './package.json';
import createVitePlugins from './options/plugins';

/**
 * Vite配置
 *
 * @see https://cn.vitejs.dev/config/
 */
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  const isBuild = command === 'build';

  // 全局`SCSS`资源
  const scssResources = [];
  fs.readdirSync('src/assets/styles/resources').forEach((scssFile) => {
    if (fs.statSync(`src/assets/styles/resources/${scssFile}`).isFile()) {
      scssResources.push(
        `@use "src/assets/styles/resources/${scssFile}" as *;` as never,
      );
    }
  });

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types'),
      },
      extensions: ['.ts', '.js'],
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __SHARK__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies,
        },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(env, isBuild),
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT) || 9000,
      proxy: {
        '/api': {
          target: env.VITE_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_ENABLE_PROXY === 'true',
          rewrite: (path) => path.replace(/\/proxy/, ''),
        },
      },
      // 预热文件以提前转换和缓存结果, 降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    build: {
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      target: 'es2015',
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
      chunkSizeWarningLimit: 4000,
    },
  };
};
