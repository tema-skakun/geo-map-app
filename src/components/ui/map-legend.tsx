export const MapLegend = () => {
	const color = "hsla(0,2%,65%,0.56)";
	const legendItems = [
		{size: 2, label: "<1"},
		{size: 4, label: "1-5"},
		{size: 6, label: "5-10"},
		{size: 8, label: "10-50"},
		{size: 10, label: "50-100"},
		{size: 12, label: "100-250"},
		{size: 14, label: "250-500"},
		{size: 16, label: "500-1000"},
		{size: 18, label: ">1000"}
	];

	return (
		<div className="bg-white/90 rounded-lg shadow-md p-3 text-xs">
			<div className="font-semibold text-gray-800 mb-2 text-center">
				<div className='flex justify-center items-center text-[18px]'>
					Легенда
				</div>
				<div className="text-xs font-normal">
					Численность населения, тыс. чел.
				</div>
			</div>
			<div className="flex items-end justify-center gap-[4px] h-[5dvh]">
				{legendItems.map((item) => (
					<div key={item.size} className="flex flex-col items-center">
						<div
							className="rounded-full border border-gray-300 shadow-sm"
							style={{
								width: `${item.size}px`,
								height: `${item.size}px`,
								backgroundColor: color,
								minWidth: `${item.size}px`
							}}
						/>
						<span className="text-gray-700 mt-1 text-[10px]">{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};
