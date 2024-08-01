import process from 'node:process';
import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import vitePluginVueDevTools from 'vite-plugin-vue-devtools';
import configCompressPlugin from './compress';

/**
 * 创建Vite插件
 */
export default function createVitePlugins(
  env: Record<string, string>,
  isBuild: boolean,
) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    Unocss(),
  ];

  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin({ compress: env.VITE_BUILD_COMPRESS }),
    );

    /**
     * 生成打包分析
     *
     * @see https://github.com/btd/rollup-plugin-visualizer
     */
    if (process.env.REPORT === 'true') {
      vitePlugins.push(
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      );
    }
  } else {
    vitePlugins.push(vitePluginVueDevTools({ launchEditor: 'code' }));
  }

  return vitePlugins;
}
