import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    assetsInclude: ['**/*.glb'],
});
