import {useEffect, useState} from 'react';
import {Feature, GeoJSONFeatureCollection, PolygonFeature} from '../types/map.types';
import {
	getUniqueCriteria,
	projectPoint,
	radiusFromPop,
	randomColour
} from '../utils/map.utils';

export const useMapData = () => {
	const [features, setFeatures] = useState<Feature[]>([]);
	const [polygons, setPolygons] = useState<PolygonFeature[]>([]);

	useEffect(() => {
		const loadData = async () => {
			// Загрузка точек
			const pointsResponse = await fetch(`${import.meta.env.BASE_URL}data2.geojson`);
			const pointsGeojson = await pointsResponse.json() as GeoJSONFeatureCollection;

			// Загрузка полигонов
			const polygonsResponse = await fetch(`${import.meta.env.BASE_URL}polygonsDataV1.geojson`);
			const polygonsGeojson = await polygonsResponse.json() as GeoJSONFeatureCollection;

			const uniqueCriteria = getUniqueCriteria({features: pointsGeojson.features as Feature[]});
			console.log("список уникальных критериев = ", uniqueCriteria);

			const processedFeatures = pointsGeojson.features.map((f: any, idx: number) => {
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

			// Обработка полигонов
			const processedPolygons = polygonsGeojson.features.map((f: any, idx: number) => ({
				...f,
				id: `polygon-${idx}`,
			})) as PolygonFeature[];

			setFeatures(processedFeatures);
			setPolygons(processedPolygons);
		};

		loadData();
	}, []);

	return {features, polygons};
};
