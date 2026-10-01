/// <reference types="vite-react-ssg" />
// ↑ добавляет ssgOptions в тип конфига Vite
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Дата сборки — строка «Обновлено» в шапке.
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  css: {
    modules: {
      // Короткие хеши в проде, читаемые имена в разработке.
      generateScopedName: process.env.NODE_ENV === 'production' ? '[hash:base64:6]' : '[name]__[local]',
    },
  },
  ssgOptions: {
    // Не async: скрипт должен выполниться после инлайнового __VITE_REACT_SSG_HASH__ в конце <body>,
    // иначе клиент запросит static-loader-data-manifest-undefined.json и упадёт при гидрации.
    script: 'defer',
    formatting: 'none',
    dirStyle: 'nested',
    beastiesOptions: { preload: 'swap', reduceInlineStyles: false },
  },
})
