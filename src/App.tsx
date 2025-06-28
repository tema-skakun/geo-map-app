import {AppLayout} from "./components/app-layout";

export default function App() {
	return <AppLayout/>;
}

// Single‑page map app: React 18 + Vite 5 + TS + Tailwind + Leaflet
// Requirements implemented:
//   • Loads local /public/data.geojson (EPSG:3857) → projects to WGS‑84
//   • Fixed‑bucket radii: 0‑10k→10 px · 10‑50k→30 px · 50‑250k→70 px · >250k→100 px
//   • Random colour per feature (re‑randomises on each reload)
//   • Two independent autocomplete filters (region + settlement)
//   • CircleMarker popup with all properties; CSS highlight (6 px orange outline + scale 1.1) on click
//   • OSM base layer, responsive layout & legend
