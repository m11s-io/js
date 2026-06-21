import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/url.ts'],
  format: ['cjs'],
  outDir: 'dist',
  dts: false,
  clean: true,
});
