import {Feature} from '../../types/map.types';

export const PopupContent = ({feature}: { feature: Feature }) => (
	<div className="text-sm space-y-1">
		{Object.entries(feature.properties)
		.filter((key) => !key.includes('ID (№ п'))
		.map(([key, value]) => (
			<div key={key}>
				<span className="font-medium">{key}: </span>
				<span>{String(value || 'нет данных')}</span>
			</div>
		))}
	</div>
);
