import {memo} from 'react';
import {CircleMarker, Popup} from 'react-leaflet';
import {Feature} from '../../types/map.types';
import {PopupContent} from '../UI/popup-content';

export const MapMarkers = memo(({
																	features,
																	selectedId,
																	onSelect
																}: {
	features: Feature[];
	selectedId: string | null;
	onSelect: (id: string) => void;
}) => (
	<>
		{features.map((f) => (
			<CircleMarker
				key={f.id}
				center={f.latlng}
				radius={selectedId === f.id ? f.radius * 1.1 : f.radius}
				pathOptions={{
					color: f.color,
					fillOpacity: 0.8,
					weight: selectedId === f.id ? 6 : 1,
				}}
				eventHandlers={{click: () => onSelect(f.id)}}
				className={selectedId === f.id ? 'transition-transform scale-110' : ''}
			>
				<Popup>
					<PopupContent feature={f}/>
				</Popup>
			</CircleMarker>
		))}
	</>
));
