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


export interface Feature {
	type: string;
	properties: {
		"ID (№ п": number;
		"Полный адресс": string;
		"Субъект": string;
		"Название": string;
		"Критерий, на основании которого населенный пункт включен в Единый перечень": string;
		"Численность населения 1989": number;
		"Численность населения 2001": number;
		"Численность населения 2010": number;
		"Численность населения 2021": number;
		"Коэффициент смертности": number;
		"Коэффициент избыточной смертности в 2021": number;
		"Убыль населения 1989-2021": number;
	};
	geometry: {
		type: string;
		coordinates: [number, number];
	};
}

export interface GeoJSONData {
	features: Feature[];
}
