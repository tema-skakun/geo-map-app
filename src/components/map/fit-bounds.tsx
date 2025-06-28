import {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {Bounds} from '../../types/map.types';

interface FitBoundsProps {
	bounds: Bounds;
	ignoreFit?: boolean;
}

export const FitBounds = ({bounds, ignoreFit = false}: FitBoundsProps) => {
	const map = useMap();

	useEffect(() => {
		if (!ignoreFit && bounds[0][0] !== 0 && bounds[0][1] !== 0) {
			map.fitBounds(bounds, {padding: [40, 40]});
		}
	}, [bounds, map, ignoreFit]);

	return null;
};
