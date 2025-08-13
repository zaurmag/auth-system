import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createSvgIconsPlugin({
      // https://github.com/vbenjs/vite-plugin-svg-icons
      // Specify the icon folder to be cached
      iconDirs: [fileURLToPath(new URL('src/app/assets/icons', import.meta.url))],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // __api: 'modern-compiler',
        additionalData: `
          @use '/node_modules/zm-ui-vue/src/app/styles/variables.scss' as *;
          @use '/node_modules/zm-ui-vue/src/app/styles/functions.scss' as *;
        `,
      },
    },
  },
})
