import {memo} from 'react';
import {CircleMarker, LayerGroup, Popup} from 'react-leaflet';
import {Feature} from '../../types/map.types';
import {PopupContent} from '../ui/popup-content';

interface MapMarkersProps {
	features: Feature[];
	selectedId: string | null;
	onSelect: (id: string | null) => void;
}

export const MapMarkers = memo(({
																	features,
																	selectedId,
																	onSelect,
																}: MapMarkersProps) => {
	return (
		<div>
			{features.map((f) => (
				<LayerGroup key={f.id}>
					{/* Невидимый маркер для обработки кликов (радиус 20px) */}
					<CircleMarker
						pane="markers"
						center={f.latlng}
						radius={20}
						pathOptions={{
							stroke: false,
							fillOpacity: 0,
						}}
						eventHandlers={{
							click: () => onSelect(f.id),
							popupclose: () => onSelect(null)
						}}
						interactive={true}
					>
						<Popup
							eventHandlers={{
								popupclose: () => onSelect(null),
							}}
						>
							<PopupContent feature={f}/>
						</Popup>
					</CircleMarker>
					{/* Визуальный маркер (без обработки кликов) */}
					<CircleMarker
						pane="markers"
						center={f.latlng}
						radius={selectedId === f.id ? f.radius * 1.1 : f.radius}
						pathOptions={{
							color: f.color,
							fillColor: selectedId === f.id ? '#fff' : f.color,
							fillOpacity: 0.8,
							weight: selectedId === f.id ? 4 : 1,
							opacity: 1,
						}}
						interactive={false}
					/>
				</LayerGroup>
			))}
		</div>
	);
});
