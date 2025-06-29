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

export const MapView = ({
													bounds,
													features,
													selectedId,
													onSelect
												}: MapViewProps) => {
	return (
		<MapContainer
			className="h-full w-full"
			scrollWheelZoom
			maxZoom={18}
			minZoom={3}
			wheelPxPerZoomLevel={150}
			maxBounds={[[-84, 0], [84, 200]]}
			maxBoundsViscosity={0.97}
			attributionControl={false}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<FitBounds bounds={bounds}/>
			<MapMarkers
				features={features}
				selectedId={selectedId}
				onSelect={onSelect}
			/>
		</MapContainer>
	);
}
