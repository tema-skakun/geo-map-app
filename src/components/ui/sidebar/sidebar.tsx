import {MapLegend} from '../map-legend';
import {MapLegendDynamic} from '../map-legend-dynamic';
import {RegionFilter} from '../../filters/region-filter';
import {Feature} from '../../../types/map.types';
// import {SettlementFilter} from '../../filters/settlement-filter';

interface SidebarProps {
	features: Feature[];
	filterRegion: string | null;
	filterSettlement?: string | null;
	onRegionChange: (value: string | null) => void;
	onSettlementChange?: (value: string | null) => void;
	dynamicMode?: boolean;
	setShowPolygons: (value: boolean) => void;
	showPolygons: boolean;
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
													mode,
													setShowPolygons,
													showPolygons
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
			<div className="font-bold mb-[8px] text-center text-[20px]">
				Опорные населённые пункты
			</div>
			<div className="overflow-y-auto">
				{/* Фильтры */}
				<div
					className="h-[50px] flex justify-start items-center gap-[12px] pt-[6px] pb-[6px]"
				>
					<RegionFilter
						regions={regions}
						value={filterRegion}
						onChange={onRegionChange}
					/>
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
				<div className='flex justify-center items-center text-[18px]'>
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
						className={`flex justify-center rounded-[5px] p-[5px] cursor-pointer border-[1px] ${
							showPolygons//TODO fix tw colors
								? 'border-blue-500'
								: 'border-gray-300'
						}`}
						onClick={() => setShowPolygons(!showPolygons)}
					>
						Границы субъектов
					</div>
					{/* Легенда по радиусам */}
					<MapLegend/>
				</div>
			</div>
		</div>
	);
};
