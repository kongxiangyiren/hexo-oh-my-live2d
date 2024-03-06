import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import dts from 'vite-plugin-dts';
import CopyPlugin from 'vite-copy-plugin';
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      // 通过vite插件将dist目录复制到example/node_modules/hexo-oh-my-live2d/dist,实现热更新
      mode === 'dev' &&
        CopyPlugin([
          {
            from: './dist',
            to: './example/node_modules/hexo-oh-my-live2d/dist'
          }
        ]),
      VitePluginNode({
        appPath: './src/index.ts',
        tsCompiler: 'esbuild',
        adapter: params => {
          const { app, server, req, res, next } = params;
          console.log(app, server, req, res, next);
        }
      }),
      dts({
        entryRoot: 'src',
        copyDtsFiles: false,
        insertTypesEntry: true
      })
    ],
    build: {
      minify: 'esbuild',
      lib: {
        entry: 'src/index.ts',
        formats: ['cjs']
      }
    }
  };
});
