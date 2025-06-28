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

export const MapView = ({bounds, features, selectedId, onSelect}: MapViewProps) => (
	<MapContainer
		className="h-full w-full"
		zoom={6}
		center={[56, 40]}
		scrollWheelZoom
	>
		<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			attribution="&copy; OpenStreetMap contributors"
		/>
		<FitBounds bounds={bounds}/>
		<MapMarkers
			features={features}
			selectedId={selectedId}
			onSelect={onSelect}
		/>
	</MapContainer>
);
