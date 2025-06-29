import proj4 from 'proj4';
import {Bounds, Feature} from "../types/map.types";

proj4.defs(
	'EPSG:3857',
	'+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs',
);

export const projectPoint = ([x, y]: [number, number]): [number, number] => {
	// Для EPSG:3857 координаты уже в метрах, преобразуем напрямую
	const lon = x / 20037508.34 * 180;
	const lat = Math.atan(Math.exp(y / 20037508.34 * Math.PI)) * 360 / Math.PI - 90;
	return [lat, lon];
};

export const radiusFromPop = (pop: number): number => {
	if (pop > 1_000_000) return 9;
	if (pop > 500_000) return 8;
	if (pop > 250_000) return 7;
	if (pop > 100_000) return 6;
	if (pop > 50_000) return 5;
	if (pop > 10_000) return 4;
	if (pop > 5_000) return 3;
	if (pop > 1_000) return 2;
	return 1;
};

export const randomColour = (seed: string): string => {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
	return `hsl(${h}, 70%, 60%)`;
};

export const calculateBounds = (features: Feature[]): Bounds => {
	if (!features.length) return [[0, 0], [0, 0]];

	let minLat = 90, minLng = 180, maxLat = -90, maxLng = -180;

	features.forEach(({latlng: [lat, lng]}) => {
		minLat = Math.min(minLat, lat);
		minLng = Math.min(minLng, lng);
		maxLat = Math.max(maxLat, lat);
		maxLng = Math.max(maxLng, lng);
	});

	return [[minLat, minLng], [maxLat, maxLng]];
};
