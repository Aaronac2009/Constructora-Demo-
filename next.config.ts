import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Raíz fija: dentro de OneDrive, Turbopack a veces infería mal la raíz
  // del proyecto y el servidor de desarrollo se caía.
  turbopack: {
    root: __dirname,
  },
  // Modo demo: no hay backend real. Esta URL nunca sale a la red; el fetch
  // del servidor la intercepta y la responde con datos falsos en memoria
  // (ver instrumentation.ts y mock/).
  env: {
    BACKEND_URL: "http://backend.demo.local/api",
  },
  images: {
    // Todas las imágenes del demo son locales (public/mock y las fotos
    // subidas en memoria, servidas por app/mock-files), así que no hace
    // falta el optimizador ni dominios remotos como Dropbox.
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Las 3 subidas de fotos (proyecto, ubicación, cédula de familiar)
      // llaman a su Server Action pasándole el File directo como argumento
      // (ver saveImages.jsx, saveLocationImages.jsx, uploadMemberPhoto.jsx),
      // así que quedan sujetas a este límite — el default de Next.js es
      // 1mb, que es justo la restricción que se estaba viendo.
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
