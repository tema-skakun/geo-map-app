// src/components/GeoMapApp.tsx
// ───────────────────────────────────────────────────────────
// Single‑page map app: React 18 + Vite 5 + TS + Tailwind + Leaflet
// Requirements implemented:
//   • Loads local /public/data.geojson (EPSG:3857) → projects to WGS‑84
//   • Fixed‑bucket radii: 0‑10k→10 px · 10‑50k→30 px · 50‑250k→70 px · >250k→100 px
//   • Random colour per feature (re‑randomises on each reload)
//   • Two independent autocomplete filters (region + settlement)
//   • CircleMarker popup with all properties; CSS highlight (6 px orange outline + scale 1.1) on click
//   • OSM base layer, responsive layout & legend

import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
    useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import proj4 from 'proj4';
import {useEffect, useMemo, useState} from 'react';
import {Combobox} from '@headlessui/react';
import Fuse from 'fuse.js';

/** GeoJSON minimal typings */
interface FeatureProps {
    [key: string]: unknown;

    'Субъект': string;
    'Название': string;
    'Численность населения согласно Всероссийской переписи населения 2021 г.': number;
}

interface Feature {
    id: string; // synthetic
    type: 'Feature';
    geometry: { type: 'Point'; coordinates: [number, number] };
    properties: FeatureProps;
    color: string; // runtime
    radius: number; // runtime
    latlng: [number, number]; // runtime [lat,lng]
}

// register projection (EPSG:3857 → WGS84)
proj4.defs(
    'EPSG:3857',
    '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
);

function projectPoint([x, y]: [number, number]): [number, number] {
    const [lon, lat] = proj4('EPSG:3857', 'EPSG:4326', [x, y]);
    return [lat, lon];
}

/** Radius bucket by population */
function radiusFromPop(pop: number): number {
    if (pop > 250_000) return 100;
    if (pop > 50_000) return 70;
    if (pop > 10_000) return 30;
    return 10;
}

/** Random HSL colour (pastel‑ish) */
function randomColour(seed: string): string {
    // simple hash → hue 0‑360
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
    return `hsl(${h}, 70%, 60%)`;
}

/** Autosize map to features */
function FitBounds({bounds}: { bounds: [[number, number], [number, number]] }) {
    const map = useMap();
    useEffect(() => {
        map.fitBounds(bounds, {padding: [40, 40]});
    }, [bounds, map]);
    return null;
}

export default function GeoMapApp() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filterRegion, setFilterRegion] = useState<string | null>(null);
    const [filterSettlement, setFilterSettlement] = useState<string | null>(null);

    // load geojson once
    useEffect(() => {
        // fetch('/data.geojson')
        fetch(`${import.meta.env.BASE_URL}data.geojson`)
            .then((r) => r.json())
            .then((gj) => {
                const arr: Feature[] = gj.features.map((f: any, idx: number) => {
                    const pop = f.properties['Численность населения согласно Всероссийской переписи населения 2021 г.'] as number;
                    const latlng = projectPoint(f.geometry.coordinates);
                    return {
                        ...f,
                        id: `${idx}`,
                        latlng: latlng as [number, number],
                        radius: radiusFromPop(pop),
                        color: randomColour(f.properties['Название'] as string),
                    } as Feature;
                });
                setFeatures(arr);
            });
    }, []);

    /** Derived lists for autocomplete */
    const regions = useMemo(() => Array.from(new Set(features.map((f) => f.properties['Субъект']))), [features]);
    const settlements = useMemo(() => Array.from(new Set(features.map((f) => f.properties['Название']))), [features]);

    const fuseRegion = useMemo(() => new Fuse(regions, {threshold: 0.3}), [regions]);
    const fuseSettlement = useMemo(() => new Fuse(settlements, {threshold: 0.3}), [settlements]);

    const filteredFeatures = useMemo(() => {
        return features.filter((f) => {
            const okRegion = !filterRegion || f.properties['Субъект'].toLowerCase().includes(filterRegion.toLowerCase());
            const okSettlement = !filterSettlement || f.properties['Название'].toLowerCase().includes(filterSettlement.toLowerCase());
            return okRegion && okSettlement;
        });
    }, [features, filterRegion, filterSettlement]);

    // get bounds for FitBounds
    const bounds = useMemo(() => {
        if (!filteredFeatures.length) return [[0, 0], [0, 0]] as [[number, number], [number, number]];
        let minLat = 90, minLng = 180, maxLat = -90, maxLng = -180;
        filteredFeatures.forEach(({latlng: [lat, lng]}) => {
            minLat = Math.min(minLat, lat);
            minLng = Math.min(minLng, lng);
            maxLat = Math.max(maxLat, lat);
            maxLng = Math.max(maxLng, lng);
        });
        return [[minLat, minLng], [maxLat, maxLng]] as [[number, number], [number, number]];
    }, [filteredFeatures]);

    /** UI helpers */
    const inputClass =
        'w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm';

    return (
        <div className="h-screen w-screen flex flex-col">
            {/* Filters */}
            <div className="p-2 bg-white shadow-md z-[1000] flex flex-col sm:flex-row gap-2 sm:gap-4">
                {/* Region */}
                <Combobox value={filterRegion} onChange={setFilterRegion} nullable>
                    <div className="relative w-64">
                        <Combobox.Input
                            className={inputClass}
                            onChange={(e) => setFilterRegion(e.target.value)}
                            placeholder="Субъект (регион)…"
                        />
                        <Combobox.Options
                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {(filterRegion ? fuseRegion.search(filterRegion).map((r) => r.item) : regions).map((item) => (
                                <Combobox.Option key={item} value={item}
                                                 className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white">
                                    {item}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </div>
                </Combobox>
                {/* Settlement */}
                <Combobox value={filterSettlement} onChange={setFilterSettlement} nullable>
                    <div className="relative w-64">
                        <Combobox.Input
                            className={inputClass}
                            onChange={(e) => setFilterSettlement(e.target.value)}
                            placeholder="Название населённого пункта…"
                        />
                        <Combobox.Options
                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {(filterSettlement ? fuseSettlement.search(filterSettlement).map((r) => r.item) : settlements).map((item) => (
                                <Combobox.Option key={item} value={item}
                                                 className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white">
                                    {item}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </div>
                </Combobox>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
                <MapContainer
                    className="h-[500px] w-[500px]"
                    zoom={6}
                    center={[56, 40]}
                    scrollWheelZoom
                    style={{ height:'100%', width:'100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                               attribution="&copy; OpenStreetMap contributors"/>

                    {/* Fit map to filtered bounds */}
                    <FitBounds bounds={bounds}/>

                    {filteredFeatures.map((f) => (
                        <CircleMarker
                            key={f.id}
                            center={f.latlng}
                            radius={selectedId === f.id ? f.radius * 1.1 : f.radius}
                            pathOptions={{color: f.color, fillOpacity: 0.8, weight: selectedId === f.id ? 6 : 1}}
                            eventHandlers={{click: () => setSelectedId(f.id)}}
                            className={selectedId === f.id ? 'transition-transform scale-110' : ''}
                        >
                            <Popup>
                                <div className="text-sm space-y-1">
                                    {Object.entries(f.properties).map(([k, v]) => (
                                        <div key={k}>
                                            <span className="font-medium">{k}: </span>
                                            <span>{String(v)}</span>
                                        </div>
                                    ))}
                                </div>
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg shadow-md p-4 space-y-2 text-sm">
                    <div className="font-semibold">Легенда</div>
                    <div className="flex items-center gap-2"><span
                        className="block h-2.5 w-2.5 rounded-full bg-red-800" style={{width: 10, height: 10}}></span>менее
                        10 тыс.
                    </div>
                    <div className="flex items-center gap-2"><span
                        className="block h-2.5 w-2.5 rounded-full bg-gray-400" style={{width: 30, height: 30}}></span>10‑50
                        тыс.
                    </div>
                    <div className="flex items-center gap-2"><span
                        className="block h-2.5 w-2.5 rounded-full bg-gray-400" style={{width: 70, height: 70}}></span>50‑250
                        тыс.
                    </div>
                    <div className="flex items-center gap-2"><span
                        className="block h-2.5 w-2.5 rounded-full bg-gray-400" style={{width: 100, height: 100}}></span>более
                        250 тыс.
                    </div>
                </div>
            </div>
        </div>
    );
}
