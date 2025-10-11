import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` (e.g. 'development' or 'production')
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT) || 3000, // ✅ now works
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//         port: Number(env.VITE_PORT) || 3000, // Replace 3000 with your desired port number
//       },
//   resolve: {
//       alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
