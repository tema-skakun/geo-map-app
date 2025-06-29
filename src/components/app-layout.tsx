import {useState, useMemo} from 'react';
import {MapView} from './map/map-view';
import {Sidebar} from './ui/sidebar/sidebar';
import {useMapData} from '../hooks/use-map-data';
import {calculateBounds} from '../utils/map.utils';

export const AppLayout = () => {
	const {features} = useMapData();
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [filterRegion, setFilterRegion] = useState<string | null>(null);
	const [filterSettlement, setFilterSettlement] = useState<string | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const filteredFeatures = useMemo(() =>
			features.filter((f) => {
				const okRegion = !filterRegion || f.properties['Субъект'].includes(filterRegion);
				const okSettlement = !filterSettlement || f.properties['Название'].includes(filterSettlement);
				return okRegion && okSettlement;
			}),
		[features, filterRegion, filterSettlement]
	);

	const bounds = useMemo(() =>
			calculateBounds(filteredFeatures),
		[filteredFeatures]
	);

	return (
		<div className="flex h-full w-screen overflow-hidden">
			<div className='overflow-hidden'>
				<Sidebar
					onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
					features={features}
					filterRegion={filterRegion}
					filterSettlement={filterSettlement}
					onRegionChange={setFilterRegion}
					onSettlementChange={setFilterSettlement}
				/>
			</div>
			<div className='screen overflow-hidden w-[80dvw]'>
				<MapView
					bounds={bounds}
					features={filteredFeatures}
					selectedId={selectedId}
					onSelect={setSelectedId}
				/>
			</div>
		</div>
	);
};
