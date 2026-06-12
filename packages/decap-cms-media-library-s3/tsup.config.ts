import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  globalName: 'S3MediaLibrary',
  dts: true,
  clean: true,
});
