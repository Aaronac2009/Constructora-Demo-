import { getDb } from "@/mock/db";

// Sirve las fotos subidas desde la interfaz en modo demo (en el sistema real
// quedaban en Dropbox). Viven en memoria, igual que el resto de datos falsos.
export async function GET(_request, { params }) {
  const { id } = await params;
  const file = getDb().files[id];

  if (!file) {
    return new Response("Archivo no encontrado", { status: 404 });
  }

  return new Response(file.buffer, {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `inline; filename="${encodeURIComponent(file.name)}"`,
      "Cache-Control": "no-store",
    },
  });
}
