import type { PluginOption } from 'vite';
import compressPlugin from 'vite-plugin-compression';

/**
 * 打包压缩插件
 *
 * @see https://github.com/anncwb/vite-plugin-compression
 */
export default function configCompressPlugin({
  compress,
  deleteOriginFile = false,
}: {
  compress: string;
  deleteOriginFile?: boolean;
}): PluginOption[] {
  const compressList = compress.split(',');
  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      }),
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      }),
    );
  }

  return plugins;
}
