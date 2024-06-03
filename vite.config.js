import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import svgr from "vite-plugin-svgr";
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  define: {
    "global": {},
  },
  resolve: {
    alias: [
      {
        find: 'stream',
        replacement: `stream-browserify`,
      },
    ],
  },
  plugins: [
      react(),
    svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
    include: "**/*.svg",
  }),
    viteStaticCopy({
      targets: [
        {
          src: 'netlify.toml',
          dest: ''
        }
      ]
    }),
  ],
  optimizeDeps: {
    include: [
      "@mui/material"
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      plugins: [
          rollupNodePolyFill()
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup/setup.ts',
    include: ['**/*.test.?(c|m)[jt]s?(x)']
  }
})

