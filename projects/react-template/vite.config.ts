import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { stringXml } from './script/vitePlugins/string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stringXml()],
});
