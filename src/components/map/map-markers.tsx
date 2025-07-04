import {memo} from 'react';
import {CircleMarker, Popup} from 'react-leaflet';
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
																	onSelect
																}: MapMarkersProps) => {
	return (
		<div className='z-[100]'>
			{features.map((f) => (
				<CircleMarker
					key={f.id}
					center={f.latlng}
					radius={selectedId === f.id ? f.radius * 1.1 : f.radius}
					pathOptions={{
						color: f.color,
						fillColor: selectedId === f.id ? '#fff' : f.color,
						fillOpacity: 0.8,
						weight: selectedId === f.id ? 5 : 2,
						opacity: 1,
					}}
					eventHandlers={{
						click: () => onSelect(f.id),
						popupclose: () => onSelect(null)
					}}
					// className='duration-500 ease-in-out'
					data-id={f.id}
				>
					<Popup
						eventHandlers={{
							popupclose: () => onSelect(null)
						}}
					>
						<PopupContent feature={f}/>
					</Popup>
				</CircleMarker>
			))}
		</div>
	);
});
