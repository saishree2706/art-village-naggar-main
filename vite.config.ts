import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import compression from "vite-plugin-compression";
import { vercelApiDev } from "./vite-plugins/api-dev";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Expose all env vars (including NOTION_*) to process.env for the dev API plugin.
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of Object.keys(env)) {
    if (process.env[key] === undefined) process.env[key] = env[key];
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    assetsInclude: ["**/*.JPG"],
    plugins: [
      react(),
      mode === "development" && vercelApiDev(),
      mode === "development" && componentTagger(),
      mode === "production" && compression({ algorithm: "brotliCompress", ext: ".br" }),
      mode === "production" && compression({ algorithm: "gzip", ext: ".gz" }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-motion": ["framer-motion"],
            "vendor-query": ["@tanstack/react-query"],
          },
        },
      },
    },
  };
});
