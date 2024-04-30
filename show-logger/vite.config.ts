import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['vite.svg'],
    useCredentials: true,
    manifest: {
        name: 'show-logger',
        short_name: 'Show Logger',
        description: 'Show Logger',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'vite.svg',
                sizes: '192x192',
                type: 'image/svg+xml'
            },
            {
                src: 'vite.svg',
                sizes: '512x512',
                type: 'image/svg+xml'
            }
        ]
    }
}),react()],
build: {
    manifest: true,
},
// resolve: {
//     alias: [
//         { find: '@', replacement: path.resolve(__dirname, 'src') },
//     ],
// },
  server: {
    open: true,
    port: 5173
  }
})
