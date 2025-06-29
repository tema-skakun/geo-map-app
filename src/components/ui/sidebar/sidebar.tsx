import {MapLegend} from '../map-legend';
import {RegionFilter} from '../../filters/region-filter';
import {SettlementFilter} from '../../filters/settlement-filter';
import {Feature} from '../../../types/map.types';
import {XMark} from "../../icons";

interface SidebarProps {
	isOpen?: boolean;
	onToggle?: () => void;
	features: Feature[];
	filterRegion: string | null;
	filterSettlement: string | null;
	onRegionChange: (value: string | null) => void;
	onSettlementChange: (value: string | null) => void;
}

export const Sidebar = ({
													features,
													filterRegion,
													filterSettlement,
													onRegionChange,
													onSettlementChange,
												}: SidebarProps) => {
	const regions = Array.from(new Set(features.map((f) => f.properties['Субъект'])));
	const settlements = Array.from(new Set(features.map((f) => f.properties['Название'])));

	const handleResetFilters = () => {
		onRegionChange(null);
		onSettlementChange(null);
	};

	return (
		<div className='bg-white h-[calc(100%-20px)] min-w-[20dvw] flex flex-col transition-all duration-500 ease-linear p-[10px]'>
			{/*<button*/}
			{/*	onClick={onToggle}*/}
			{/*	className="self-end p-2 focus:outline-none text-gray-600 hover:text-gray-900"*/}
			{/*	aria-label={isOpen ? "Свернуть сайдбар" : "Развернуть сайдбар"}*/}
			{/*>*/}
			{/*	{isOpen ? <ChevronLeft/> : <ChevronRight/>}*/}
			{/*</button>*/}

			<div className="flex-1 overflow-y-auto space-y-4 mt-2">
				<div className="flex items-center gap-2">
					<RegionFilter
						regions={regions}
						value={filterRegion}
						onChange={onRegionChange}
					/>
					{filterRegion && (
						<button
							onClick={() => onRegionChange(null)}
							className="text-gray-500 hover:text-gray-700 p-1"
							aria-label="Сбросить фильтр региона"
							title="Сбросить фильтр региона"
						>
							<XMark width={10} height={10}/>
						</button>
					)}
				</div>

				<div className="flex items-center gap-2">
					<SettlementFilter
						settlements={settlements}
						value={filterSettlement}
						onChange={onSettlementChange}
					/>
					{filterSettlement && (
						<button
							onClick={() => onSettlementChange(null)}
							className="text-gray-500 hover:text-gray-700"
							aria-label="Сбросить фильтр населенного пункта"
							title="Сбросить фильтр населенного пункта"
						>
							<XMark width={10} height={10}/>
						</button>
					)}
				</div>

				{(filterRegion || filterSettlement) && (
					<button
						title="Сбросить все фильтры"
						onClick={handleResetFilters}
						className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
					>
						Сбросить все фильтры
					</button>
				)}

				<MapLegend/>
			</div>
		</div>
	);
};
