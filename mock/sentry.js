// Reemplazo sin efecto de @sentry/nextjs para el modo demo: los errores solo
// se escriben en la consola, no se envían a ningún servicio externo.
export function captureException(error) {
  console.error("[demo] error capturado:", error);
}

export function captureMessage(message, context) {
  console.warn("[demo] mensaje capturado:", message, context?.extra ?? "");
}
