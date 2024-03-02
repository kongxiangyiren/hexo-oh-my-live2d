import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import dts from 'vite-plugin-dts'
export default defineConfig({
  plugins: [
    VitePluginNode({
      appPath: './src/index.ts',
      tsCompiler: 'esbuild',
      adapter: params => {
        const { app, server, req, res, next } = params
        console.log(app, server, req, res, next)
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
})
