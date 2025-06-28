import {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {Bounds} from '../../types/map.types';

export const FitBounds = ({bounds}: { bounds: Bounds }) => {
	const map = useMap();

	useEffect(() => {
		if (bounds[0][0] !== 0 && bounds[0][1] !== 0) {
			map.fitBounds(bounds, {padding: [40, 40]});
		}
	}, [bounds, map]);

	return null;
};
