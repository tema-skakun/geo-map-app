export interface FeatureProperties {
	'Субъект': string;
	'Название': string;
	'Численность населения согласно Всероссийской переписи населения 2021 г.': number;

	[key: string]: unknown;
}

export interface Feature {
	id: string;
	type: 'Feature';
	geometry: { type: 'Point'; coordinates: [number, number] };
	properties: FeatureProperties;
	color: string;
	radius: number;
	latlng: [number, number];
}

export type Bounds = [[number, number], [number, number]];

export type IconProps = {
	width?: number;
	height?: number;
	fill?: string;
};
