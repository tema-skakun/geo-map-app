import {useEffect, useState} from 'react';
import {Feature, GeoJSONFeatureCollection} from '../types/map.types';
import {
	getUniqueCriteria,
	projectPoint,
	radiusFromPop,
	randomColour
} from '../utils/map.utils';

export const useMapData = () => {
	const [features, setFeatures] = useState<Feature[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const response = await fetch(`${import.meta.env.BASE_URL}data2.geojson`);
			const geojson = await response.json() as GeoJSONFeatureCollection;

			const uniqueCriteria = getUniqueCriteria(geojson);
			console.log("список уникальных критериев = ", uniqueCriteria);

			const processedFeatures = geojson.features.map((f: any, idx: number) => {
				const pop = f.properties['Численность населения 2021'];
				const latlng = projectPoint(f.geometry.coordinates);

				return {
					...f,
					id: `${idx}`,
					latlng,
					radius: radiusFromPop(pop),
					color: randomColour(f.properties['Название']),
				} as Feature;
			});

			setFeatures(processedFeatures);
		};

		loadData();
	}, []);

	return {features};
};
