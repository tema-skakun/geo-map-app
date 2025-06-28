import {useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {FitBounds} from './fit-bounds';
import {MapMarkers} from './map-markers';
import {Bounds, Feature} from '../../types/map.types';

interface MapViewProps {
	bounds: Bounds;
	features: Feature[];
	selectedId: string | null;
	onSelect: (id: string) => void;
}

export const MapView = ({bounds, features, selectedId, onSelect}: MapViewProps) => {
	const [hasPopupOpen, setHasPopupOpen] = useState(false);

	return (
		<MapContainer
			className="h-full w-full"
			scrollWheelZoom
			maxZoom={18}
			minZoom={3}
			wheelPxPerZoomLevel={150}
			maxBounds={[[-84, -200], [84, 200]]}
			maxBoundsViscosity={0.97}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; OpenStreetMap contributors"
			/>
			<FitBounds bounds={bounds} ignoreFit={hasPopupOpen}/>
			<MapMarkers
				features={features}
				selectedId={selectedId}
				onSelect={onSelect}
				onPopupOpen={setHasPopupOpen}
			/>
		</MapContainer>
	);
};
