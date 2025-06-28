export const MapLegend = () => (
	<div className="bg-white/90 rounded-lg shadow-md p-4 space-y-2 text-sm">
		<div className="font-semibold">Легенда</div>
		<div className="flex items-center gap-2">
      <span className="inline-block rounded-full bg-gray-900"
						style={{width: 10, height: 10}}></span>
			менее 10 тыс.
		</div>
		<div className="flex items-center gap-2">
      <span className="inline-block rounded-full bg-gray-900"
						style={{width: 30, height: 30}}></span>
			10‑50 тыс.
		</div>
		<div className="flex items-center gap-2">
      <span className="inline-block rounded-full bg-gray-900"
						style={{width: 70, height: 70}}></span>
			50‑250 тыс.
		</div>
		<div className="flex items-center gap-2">
      <span className="inline-block rounded-full bg-red-900"
						style={{width: 100, height: 100}}></span>
			более 250 тыс.
		</div>
	</div>
);
