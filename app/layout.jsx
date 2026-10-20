import "./globals.css";
// Fuentes servidas localmente desde node_modules (en vez de Google Fonts)
// para que el demo funcione sin conexión a servicios de terceros.
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/700.css";
import "@fontsource/pt-sans/400.css";
import "@fontsource/pt-sans/700.css";
import RegisterServiceWorker from "./RegisterServiceWorker";

export const metadata = {
  title: "Ipsum - Sistema (Demo)",
  description: "Sistema de gestión de proyectos de bono de vivienda",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ipsum",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#035496",
};

// Aplica el tema guardado ANTES de que se pinte la página: si esto se
// hiciera en un useEffect de React (después del primer render), se vería un
// parpadeo del tema por defecto antes de cambiar al guardado. Va como
// primer hijo de <body> (no en <head>, que Next.js arma solo a partir de
// "metadata") y usa try/catch porque localStorage puede estar bloqueado.
const themeInitScript = `
  try {
    var theme = localStorage.getItem("theme");
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-[Inter,sans-serif] antialiased bg-base-100">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
