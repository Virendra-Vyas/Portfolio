import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import remix from '@remix-run/dev/vite';


// Removed remix import and usage
// import remix from '@remix-run/dev/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    remix(),
  ],
})
