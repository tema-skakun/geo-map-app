export const MapLegendDynamic = () => {
	const items = [
		{color: '#0000FF', label: 'Убыль >15%'},
		{color: '#ADD8E6', label: 'Убыль 0–15%'},
		{color: '#FF0000', label: 'Прирост'},
	];

	return (
		<div className="bg-white/90 rounded-lg shadow-md p-3 text-xs mt-4">
			<div className="font-semibold text-gray-800 mb-2 text-center">
				<div>Динамика численности</div>
			</div>
			<div className="flex gap-[8px] justify-center">
				{items.map((item) => (
					<div key={item.label} className="flex justify-center items-center gap-[8px]">
						<div
							className=""
							style={{
								width: '25px',
								height: '25px',
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
