export const MapLegend = () => {
	const legendItems = [
		{ size: 20, label: "менее 10 тыс.", color: "hsl(0, 70%, 60%)" },
		{ size: 60, label: "10-50 тыс.", color: "hsl(60,95%,52%)" },
		{ size: 140, label: "50-250 тыс.", color: "hsl(120, 70%, 60%)" },
		{ size: 200, label: "более 250 тыс.", color: "hsl(240, 70%, 60%)" }
	];

	return (
		<div className="bg-white/90 rounded-lg shadow-md p-4 space-y-3 text-sm">
			<div className="font-semibold text-gray-800 mb-2">Легенда</div>
			{legendItems.map((item) => (
				<div key={item.size} className="flex items-center gap-3">
					<div
						className="rounded-full border border-gray-300 shadow-sm"
						style={{
							width: `${item.size}px`,
							height: `${item.size}px`,
							backgroundColor: item.color,
							minWidth: `${item.size}px`
						}}
					/>
					<span className="text-gray-700 whitespace-nowrap">{item.label}</span>
				</div>
			))}
		</div>
	);
};
