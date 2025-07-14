import {memo} from 'react';
import {GeoJSON, useMap} from 'react-leaflet';
import {PolygonFeature} from '../../types/map.types';
import L from 'leaflet';

interface PolygonLayerProps {
	features: PolygonFeature[];
}

export const PolygonLayer = memo(({features}: PolygonLayerProps) => {
	const style = {
		weight: 2,
		opacity: 1,
		color: '#3388ff',
		fillOpacity: 0.2,
		fillColor: '#3388ff',
	};

	const hoverStyle = {
		weight: 4,
		color: '#3388ff',
	};

	const map = useMap();

	return (
		<div>
			{features.map((feature) => (
				<GeoJSON
					key={feature.id}
					pane="polygons"
					data={feature as any}
					style={style}
					eventHandlers={{
						mouseover: (e) => {
							const layer = e.target;
							layer.setStyle(hoverStyle);
						},
						mouseout: (e) => {
							const layer = e.target;
							layer.setStyle(style);
						},
						click: (e) => {
							L.popup()
							.setLatLng(e.latlng)
							.setContent(`
          <div class="text-sm">
            <h3 class="font-bold">${feature.properties.Название}</h3>
            <p>Субъект: ${feature.properties.Субъект}</p>
            <p>Население: ${feature.properties['Численность населения 2020']}</p>
          </div>
        `)
							.openOn(map);
						},
					}}
				/>
			))}
		</div>
	);
});
