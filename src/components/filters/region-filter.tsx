import {Combobox} from '@headlessui/react';
import Fuse from 'fuse.js';
import {useState} from 'react';
import {XMark} from "../icons";

interface RegionFilterProps {
	regions: string[];
	value: string | null;
	onChange: (value: string | null) => void;
}

export const RegionFilter = ({regions, value, onChange}: RegionFilterProps) => {
	const [query, setQuery] = useState('');
	const fuse = new Fuse(regions, {threshold: 0.3});

	return (
		<>
			<Combobox
				value={value}
				onChange={onChange}
			>
				<div className="relative ml-[8px] w-[calc(20dvw-70px)]">
					<Combobox.Input
						className="w-full rounded-[4px] border border-gray-300 bg-white py-[8px] pl-[12px] shadow-sm sm:text-sm"
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Субъект (регион)"
					/>
					<Combobox.Options
						className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
						style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
					>
						{(query ? fuse.search(query).map((r) => r.item) : regions).map((item) => (
							<Combobox.Option
								key={item}
								value={item}
								className="w-full cursor-pointer select-none py-[8px] pl-[12px] pr-[36px] hover:bg-indigo-600 hover:text-white"
							>
								{item}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</div>
			</Combobox>
			{value && (
				<button
					onClick={() => onChange(null)}
					className="flex ml-[10px] justify-center"
					aria-label="Сбросить фильтр региона"
					title="Сбросить фильтр региона"
				>
					<XMark width={20} height={20}/>
				</button>
			)}
		</>
	);
};
