export const MapLegendDynamic = () => {
	const items = [
		{color: '#0000FF', label: 'Убыль >15%'},
		{color: '#ADD8E6', label: 'Убыль 0–15%'},
		{color: '#FF0000', label: 'Прирост'},
	];

	return (
		<div className="bg-white/90 rounded-lg shadow-md p-3 text-xs mt-4">
			<div className="font-semibold text-gray-800 mb-2 text-center">
				<div>Легенда: динамика численности</div>
			</div>
			<div className="flex flex-col gap-2 items-start">
				{items.map((item) => (
					<div key={item.label} className="flex items-center gap-2">
						<div
							className="rounded-full"
							style={{
								width: '10px',
								height: '10px',
								backgroundColor: item.color,
							}}
						/>
						<span className="text-gray-700 text-[10px]">{item.label}</span>
					</div>
				))}
			</div>
		</div>
	);
};
