"use client";

import { useState } from "react";
import DemoMap, { parseGoogleUrl } from "../../../components/DemoMap";

// Modo demo: en vez de cargar Google Maps (API key + conexión), se usa un
// mapa local simplificado. google_url se sigue guardando con el mismo
// formato "https://www.google.com/maps?q=lat,lng" que espera el resto de la
// app (ver SearchFilters.jsx).
export default function LocationMap({ locationForm, setLocationForm }) {
  const saved = parseGoogleUrl(locationForm.google_url);
  const [lat, setLat] = useState(saved ? String(saved.lat) : "");
  const [lng, setLng] = useState(saved ? String(saved.lng) : "");

  const saveCoords = (newLat, newLng) => {
    const parsedLat = parseFloat(newLat);
    const parsedLng = parseFloat(newLng);
    if (!Number.isFinite(parsedLat) || !Number.isFinite(parsedLng)) return;
    setLocationForm((prev) => ({
      ...prev,
      google_url: `https://www.google.com/maps?q=${parsedLat},${parsedLng}`,
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm opacity-70">
        Da clic en el mapa para marcar la ubicación del proyecto, o escribe las
        coordenadas. Se guarda junto con el resto de la información al
        presionar Guardar.
      </p>

      <DemoMap
        position={saved}
        onPick={(newLat, newLng) => {
          setLat(String(newLat));
          setLng(String(newLng));
          saveCoords(newLat, newLng);
        }}
        className="h-96"
      />

      <div className="flex gap-3">
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend">Latitud</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="9.9333"
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
              saveCoords(e.target.value, lng);
            }}
          />
        </fieldset>
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend">Longitud</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="-84.0833"
            value={lng}
            onChange={(e) => {
              setLng(e.target.value);
              saveCoords(lat, e.target.value);
            }}
          />
        </fieldset>
      </div>
    </div>
  );
}
