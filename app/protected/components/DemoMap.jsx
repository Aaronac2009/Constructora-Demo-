"use client";

// Mapa simplificado de Costa Rica para el modo demo: reemplaza a Google Maps
// (que necesita API key y conexión) con un SVG local. Convierte clics a
// latitud/longitud con una proyección lineal, suficiente para marcar y
// mostrar la ubicación aproximada de un proyecto.

// 100 px por grado: x = (lng + 86.1) * 100, y = (11.3 - lat) * 100
const WIDTH = 380;
const HEIGHT = 340;
const toX = (lng) => (lng + 86.1) * 100;
const toY = (lat) => (11.3 - lat) * 100;
const toLng = (x) => x / 100 - 86.1;
const toLat = (y) => 11.3 - y / 100;

// Contorno aproximado del país (lng, lat).
const OUTLINE = [
  [-85.7, 11.08], [-85.0, 11.03], [-84.67, 11.08], [-84.35, 10.99],
  [-83.93, 10.71], [-83.65, 10.94], [-83.4, 10.4], [-83.03, 9.98],
  [-82.56, 9.57], [-82.93, 9.07], [-82.87, 8.25], [-82.89, 8.03],
  [-83.3, 8.37], [-83.6, 8.45], [-83.9, 8.75], [-84.6, 9.5],
  [-84.9, 9.8], [-85.1, 9.6], [-85.65, 9.9], [-85.85, 10.3],
  [-85.72, 10.7], [-85.95, 10.9],
];

const CITIES = [
  { name: "San José", lat: 9.93, lng: -84.08 },
  { name: "Liberia", lat: 10.63, lng: -85.44 },
  { name: "Limón", lat: 9.99, lng: -83.03 },
  { name: "Puntarenas", lat: 9.98, lng: -84.83 },
  { name: "San Isidro", lat: 9.37, lng: -83.7 },
];

export function parseGoogleUrl(url) {
  if (!url) return null;
  const match = url.match(/q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (!match) return null;
  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
}

export default function DemoMap({ position, onPick, className = "" }) {
  const handleClick = (e) => {
    if (!onPick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    onPick(Number(toLat(y).toFixed(5)), Number(toLng(x).toFixed(5)));
  };

  const points = OUTLINE.map(([lng, lat]) => `${toX(lng)},${toY(lat)}`).join(" ");

  return (
    <div className={`relative w-full rounded-box border border-base-300 bg-info/10 overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={`w-full h-full ${onPick ? "cursor-crosshair" : ""}`}
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
        role="img"
        aria-label="Mapa de Costa Rica"
      >
        <defs>
          <pattern id="demo-map-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" className="stroke-base-content/10" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#demo-map-grid)" />
        <polygon points={points} className="fill-success/30 stroke-success" strokeWidth="1.5" strokeLinejoin="round" />

        {CITIES.map((city) => (
          <g key={city.name} className="fill-base-content/60">
            <circle cx={toX(city.lng)} cy={toY(city.lat)} r="2" />
            <text x={toX(city.lng) + 4} y={toY(city.lat) + 3} fontSize="9">
              {city.name}
            </text>
          </g>
        ))}

        {position && (
          <g transform={`translate(${toX(position.lng)}, ${toY(position.lat)})`} className="fill-error">
            <path d="M0 0 C -6 -9 -8 -12 -8 -16 A 8 8 0 1 1 8 -16 C 8 -12 6 -9 0 0 Z" />
            <circle cy="-16" r="3" className="fill-base-100" />
          </g>
        )}
      </svg>
      <span className="absolute bottom-1 right-2 text-[10px] opacity-60">Mapa simulado (demo)</span>
    </div>
  );
}
