import {MapContainer, Pane, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {FitBounds} from './fit-bounds';
import {MapMarkers} from './map-markers';
import {Bounds, Feature, PolygonFeature} from '../../types/map.types';
import {PolygonLayer} from "./polygon-layer";

interface MapViewProps {
	bounds: Bounds;
	features: Feature[];
	polygons: PolygonFeature[];
	selectedId: string | null;
	onSelect: (id: string | null) => void;
	showPolygons: boolean;
}

export const MapView = ({
													bounds,
													features,
													polygons,
													selectedId,
													onSelect,
													showPolygons
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
			{/* Панель для полигонов (ниже маркеров) */}
			<Pane name="polygons"/>
			{showPolygons && <PolygonLayer features={polygons}/>}
			{/* Панель для маркеров (выше полигонов) */}
			<Pane name="markers"/>
			<MapMarkers
				features={features}
				selectedId={selectedId}
				onSelect={onSelect}
			/>
		</MapContainer>
	);
}
