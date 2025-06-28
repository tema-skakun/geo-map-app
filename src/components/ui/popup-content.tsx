import {Feature} from '../../types/map.types';

export const PopupContent = ({feature}: { feature: Feature }) => (
	<div className="text-sm space-y-1">
		{Object.entries(feature.properties).map(([key, value]) => (
			<div key={key}>
				<span className="font-medium">{key}: </span>
				<span>{String(value)}</span>
			</div>
		))}
	</div>
);
