import {useState, useMemo} from 'react';
import {MapView} from './map/map-view';
import {Sidebar} from './ui/sidebar/sidebar';
import {useMapData} from '../hooks/use-map-data';
import {calculateBounds, dynamicColorFromChange} from '../utils/map.utils';

export const AppLayout = () => {
	const {features} = useMapData();

	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [filterRegion, setFilterRegion] = useState<string | null>(null);
	const [filterSettlement, setFilterSettlement] = useState<string | null>(null);
	const [dynamicMode, setDynamicMode] = useState(false);

	// Отфильтрованные по региону/населённому пункту
	const filteredFeatures = useMemo(
		() =>
			features.filter((f) => {
				const okRegion =
					!filterRegion || f.properties['Субъект'].includes(filterRegion);
				const okSettlement =
					!filterSettlement ||
					f.properties['Название'].includes(filterSettlement);
				return okRegion && okSettlement;
			}),
		[features, filterRegion, filterSettlement]
	);

	// При dynamicMode — перекрашиваем точки по динамике
	const displayedFeatures = useMemo(
		() =>
			filteredFeatures.map((f) => {
				if (!dynamicMode) return f;
				const dynamic = Number(f.properties['Убыль населения 1989-2021']);
				const dynColor = dynamicColorFromChange(dynamic);
				return {...f, color: dynColor};
			}),
		[filteredFeatures, dynamicMode]
	);

	const bounds = useMemo(() => calculateBounds(filteredFeatures), [
		filteredFeatures,
	]);

	return (
		<div className="flex h-full w-screen overflow-hidden">
			<Sidebar
				features={features}
				filterRegion={filterRegion}
				// filterSettlement={filterSettlement}
				onRegionChange={setFilterRegion}
				onSettlementChange={setFilterSettlement}
				// dynamicMode={dynamicMode}
				onToggleDynamic={() => setDynamicMode((m) => !m)}
				onResetDynamic={() => setDynamicMode(false)}
			/>
			<div className="screen overflow-hidden w-[80dvw]">
				<MapView
					bounds={bounds}
					features={displayedFeatures}
					selectedId={selectedId}
					onSelect={setSelectedId}
				/>
			</div>
		</div>
	);
};
