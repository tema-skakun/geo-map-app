import {MapLegend} from '../map-legend';
import {MapLegendDynamic} from '../map-legend-dynamic';
import {RegionFilter} from '../../filters/region-filter';
import {Feature} from '../../../types/map.types';
import {XMark} from '../../icons';
// import {SettlementFilter} from '../../filters/settlement-filter';

interface SidebarProps {
	features: Feature[];
	filterRegion: string | null;
	filterSettlement?: string | null;
	onRegionChange: (value: string | null) => void;
	onSettlementChange?: (value: string | null) => void;
	dynamicMode?: boolean;
	setMode: (value: "dynamic" | "criteria" | null) => void;
	mode: "dynamic" | "criteria" | null;
}

export const Sidebar = ({
													features,
													filterRegion,
													// filterSettlement,
													onRegionChange,
													// onSettlementChange,
													setMode,
													mode
												}: SidebarProps) => {
	const regions = Array.from(new Set(features.map((f) => f.properties['Субъект'])));
	// const settlements = Array.from(
	//     new Set(features.map((f) => f.properties['Название']))
	// );

	// const handleResetFilters = () => {
	// 	onRegionChange(null);
	// 	onSettlementChange(null);
	// };

	return (
		<div className="bg-white h-[calc(100%-20px)] min-w-[20dvw] flex flex-col p-[10px]">
			<div className="overflow-y-auto">
				{/* Фильтры */}
				<div className="h-[50px] flex items-center gap-2 pt-[10px] pb-[10px]">
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

				{/*<div className="flex items-center gap-2">*/}
				{/*    <SettlementFilter*/}
				{/*        settlements={settlements}*/}
				{/*        value={filterSettlement}*/}
				{/*        onChange={onSettlementChange}*/}
				{/*    />*/}
				{/*    {filterSettlement && (*/}
				{/*        <button*/}
				{/*            onClick={() => onSettlementChange(null)}*/}
				{/*            className="text-gray-500 hover:text-gray-700"*/}
				{/*            aria-label="Сбросить фильтр населённого пункта"*/}
				{/*            title="Сбросить фильтр населённого пункта"*/}
				{/*        >*/}
				{/*            <XMark width={10} height={10}/>*/}
				{/*        </button>*/}
				{/*    )}*/}
				{/*</div>*/}

				{/*{(filterRegion || filterSettlement) && (*/}
				{/*	<button*/}
				{/*		title="Сбросить все фильтры"*/}
				{/*		onClick={handleResetFilters}*/}
				{/*		className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"*/}
				{/*	>*/}
				{/*		Сбросить все фильтры*/}
				{/*	</button>*/}
				{/*)}*/}

				{/* Слои */}
				<div className='flex justify-center items-center text-[25px]'>
					Слои
				</div>
				<div className="m-[4px] flex flex-col gap-[8px]">
					{/* Кнопка по убыли */}
					<div
						className={`flex justify-center rounded-[5px] p-[5px] cursor-pointer border-[1px] ${
							mode === 'dynamic'
								? 'border-blue-500'
								: 'border-gray-300'
						}`}
						onClick={() => setMode('dynamic')}
					>
						<MapLegendDynamic/>
					</div>

					<div
						className={`flex justify-center rounded-[5px] p-[5px] cursor-pointer border-[1px] ${
							mode === 'criteria'
								? 'border-blue-500'
								: 'border-gray-300'
						}`}
						onClick={() => setMode('criteria')}
					>
						Здесь будут Критерии
					</div>

					{/* Кнопка отображения Границ */}
					<div
						className='flex justify-center border-blue border-[1px] rounded-[5px] p-[5px] m-2 opacity-50 cursor-not-allowed'
						// onClick={() => setMode('border')}
					>
						Здесь будут Границы
					</div>
					{/* Легенда по радиусам */}
					<MapLegend/>
				</div>
			</div>
		</div>
	);
};
