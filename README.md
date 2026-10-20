# Ipsum Frontend — Modo Demo

Copia del frontend de Ipsum que funciona **sin backend ni servicios de terceros**.
Todos los datos son ficticios y viven en memoria en el servidor de Next.js.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000/login>.

## Usuarios de prueba

La contraseña de todos es `demo1234` (definida en `mock/seed.js`).

| Correo                | Rol                                     |
| --------------------- | --------------------------------------- |
| `admin@ipsum.demo`    | Administrador (ve todo)                 |
| `maria@ipsum.demo`    | Analista Admin                          |
| `carlos@ipsum.demo`   | Analista (solo ve sus proyectos)        |
| `luis@ipsum.demo`     | Arquitecto                              |
| `jorge@ipsum.demo`    | Ingeniero                               |
| `nuevo@ipsum.demo`    | Analista que debe cambiar su contraseña |

## Cómo funciona

- `mock/seed.js` — datos iniciales: usuarios, roles, catálogos, 14 proyectos,
  familias, notas de bitácora, fotos y notificaciones.
- `mock/db.js` — "base de datos" en memoria (se reinicia al reiniciar el servidor).
- `mock/backend.js` — simula cada endpoint que el frontend llamaba con
  `process.env.BACKEND_URL` (`/login`, `/allProjects`, `/projectData/:id`, …),
  devolviendo la misma forma de respuesta que el backend real.
- `mock/installFetch.js` + `instrumentation.ts` — al arrancar el servidor
  reemplazan `fetch` para que toda llamada a `BACKEND_URL` la responda
  `mock/backend.js`. `BACKEND_URL` está fijo en `next.config.ts` y nunca sale a la red.
- `app/mock-files/[id]/route.js` — sirve las fotos que se suben desde la interfaz.
- `public/mock/` — imágenes de ejemplo (casas, terrenos, cédula ficticia).

Gracias a esto, las páginas, componentes y Server Actions son casi idénticos
al proyecto original.

## Diferencias con el proyecto original

- **Sentry** eliminado: `@/mock/sentry` solo escribe los errores en consola.
- **Google Maps** reemplazado por un mapa simplificado local
  (`app/protected/components/DemoMap.jsx`); se puede marcar con clic o escribir
  las coordenadas.
- **Google Fonts** reemplazado por fuentes locales (`@fontsource/*`).
- **Dropbox**: las fotos subidas se guardan en memoria.
- **Correos** (recuperar contraseña, notificaciones): no se envía nada, solo se
  simula el éxito.
- El login muestra un recuadro con los usuarios de prueba.

Los únicos enlaces externos que quedan son los de WhatsApp/correo, que solo se
abren si el usuario les hace clic.

> Los cambios no persisten: al reiniciar `npm run dev` todo vuelve a los datos
> iniciales. En un hosting serverless (p. ej. Vercel) cada instancia tiene su
> propia copia de los datos.
