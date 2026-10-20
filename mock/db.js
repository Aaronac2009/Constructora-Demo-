import { createSeed } from "./seed";

// Un solo "base de datos" en memoria por proceso. Se guarda en globalThis
// porque Next.js puede cargar este módulo varias veces (instrumentation,
// Server Actions, route handlers y recargas en caliente en dev), y todos
// tienen que ver los mismos datos.
const KEY = "__ipsumMockDb";

export function getDb() {
  if (!globalThis[KEY]) {
    globalThis[KEY] = createSeed();
  }
  return globalThis[KEY];
}

export function nextId(counter) {
  const db = getDb();
  return db.counters[counter]++;
}
