import { handleMockRequest } from "./backend";

// Reemplaza fetch del lado del servidor para que toda llamada a
// process.env.BACKEND_URL se responda con el backend simulado (mock/backend.js)
// en vez de salir a la red. Cualquier otra URL sigue usando el fetch normal.
export function installMockFetch() {
  if (globalThis.__ipsumMockFetchInstalled) return;
  globalThis.__ipsumMockFetchInstalled = true;

  const backendUrl = process.env.BACKEND_URL;
  const basePath = new URL(backendUrl).pathname.replace(/\/$/, "");
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function mockAwareFetch(input, init) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    if (url && url.startsWith(backendUrl)) {
      return handleMockRequest(new Request(url, init), basePath);
    }
    return originalFetch(input, init);
  };

  console.log(`[mock-backend] modo demo activo: ${backendUrl} se responde con datos falsos en memoria`);
}
