import {memo, useState} from 'react';
import {CircleMarker, Popup} from 'react-leaflet';
import {Feature} from '../../types/map.types';
import {PopupContent} from '../ui/popup-content';

interface MapMarkersProps {
	features: Feature[];
	selectedId: string | null;
	onSelect: (id: string) => void;
	onPopupOpen: (isOpen: boolean) => void;
}

export const MapMarkers = memo(({
																	features,
																	selectedId,
																	onSelect,
																	onPopupOpen
																}: MapMarkersProps) => {
	const [currentPopup, setCurrentPopup] = useState<string | null>(null);

	return (
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
					eventHandlers={{
						click: () => {
							onSelect(f.id);
							setCurrentPopup(f.id);
							onPopupOpen(true);
						}
					}}
					className={selectedId === f.id ? 'transition-transform scale-110' : ''}
				>
					<Popup
						eventHandlers={{
							add: () => {
								setCurrentPopup(f.id);
								onPopupOpen(true);
							},
							remove: () => {
								setCurrentPopup(null);
								onPopupOpen(false);
							}
						}}
					>
						<PopupContent feature={f}/>
					</Popup>
				</CircleMarker>
			))}
		</>
	);
});
