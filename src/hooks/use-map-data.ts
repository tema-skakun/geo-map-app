import {useEffect, useState} from 'react';
import {Feature} from '../types/map.types';
import {projectPoint, radiusFromPop, randomColour} from '../utils/map.utils';

export const useMapData = () => {
	const [features, setFeatures] = useState<Feature[]>([]);

	useEffect(() => {
		const loadData = async () => {
			const response = await fetch(`${import.meta.env.BASE_URL}data.geojson`);
			const geojson = await response.json();

			const processedFeatures = geojson.features.map((f: any, idx: number) => {
				const pop = f.properties['Численность населения согласно Всероссийской переписи населения 2021 г.'];
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
