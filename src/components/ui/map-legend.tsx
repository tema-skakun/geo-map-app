export const MapLegend = () => {
	const color = "hsla(0,2%,65%,0.56)";
	const legendItems = [
		{size: 2, label: "< 1"},
		{size: 4, label: "1-5"},
		{size: 6, label: "5-10"},
		{size: 8, label: "10-50"},
		{size: 10, label: "50-100"},
		{size: 12, label: "100-250"},
		{size: 14, label: "250-500"},
		{size: 16, label: "500-1000"},
		{size: 18, label: "> 1000"}
	];

	return (
		<div className="bg-white/90 rounded-lg shadow-md p-4 space-y-3 text-sm">
			<div className="font-semibold text-gray-800 mb-2">
				Легенда
				<p>Численность населения, тыс. чел.</p>
			</div>
			{legendItems.map((item) => (
				<div key={item.size} className="flex items-center gap-3">
					<div
						className="rounded-full border border-gray-300 shadow-sm"
						style={{
							width: `${item.size}px`,
							height: `${item.size}px`,
							backgroundColor: color,
							minWidth: `${item.size}px`
						}}
					/>
					<span className="text-gray-700 whitespace-nowrap">{item.label}</span>
				</div>
			))}
		</div>
	);
};
