import {MapLegend} from '../map-legend';
import {RegionFilter} from '../../Filters/region-filter';
import {SettlementFilter} from '../../Filters/settlement-filter';
import {Feature} from '../../../types/map.types';
import {ChevronLeft, ChevronRight} from "../../icons";

interface SidebarProps {
	isOpen: boolean;
	onToggle: () => void;
	features: Feature[];
	filterRegion: string | null;
	filterSettlement: string | null;
	onRegionChange: (value: string | null) => void;
	onSettlementChange: (value: string | null) => void;
}

export const Sidebar = ({
													isOpen,
													onToggle,
													features,
													filterRegion,
													filterSettlement,
													onRegionChange,
													onSettlementChange,
												}: SidebarProps) => {
	const regions = Array.from(new Set(features.map((f) => f.properties['Субъект'])));
	const settlements = Array.from(new Set(features.map((f) => f.properties['Название'])));

	return (
		<div
			className={`bg-white shadow-green-light p-[10px] h-full flex flex-col transition-all duration-500 ease-linear ${
				isOpen ? 'w-[20dvw] min-w-[250px]' : 'w-0 overflow-hidden'
			}`}
		>
			<button
				onClick={onToggle}
				className="self-end p-2 focus:outline-none text-gray-600 hover:text-gray-900"
				aria-label={isOpen ? "Свернуть сайдбар" : "Развернуть сайдбар"}
			>
				{isOpen ? <ChevronLeft/> : <ChevronRight/>}
			</button>

			<div className="flex-1 overflow-y-auto space-y-4 mt-2">
				<RegionFilter
					regions={regions}
					value={filterRegion}
					onChange={onRegionChange}
				/>

				<SettlementFilter
					settlements={settlements}
					value={filterSettlement}
					onChange={onSettlementChange}
				/>

				<MapLegend/>
			</div>
		</div>
	);
};
