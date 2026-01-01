// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react({
    babel: {
      plugins: ['babel-plugin-styled-components'],
    },
  })],
  vite: {
    ssr: {
      noExternal: ['styled-components', '@emotion/*'],
    },
  },
});
