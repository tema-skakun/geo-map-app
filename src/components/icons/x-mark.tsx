import {IconProps} from "../../types/map.types.ts";

export const XMark = ({
												width = 24,
												height = 24,
											}: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="#ffffff"
				 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x">
			<path d="M18 6 6 18"/>
			<path d="m6 6 12 12"/>
		</svg>
	)
}

