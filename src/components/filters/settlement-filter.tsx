import {Combobox} from '@headlessui/react';
import Fuse from 'fuse.js';
import {useState} from 'react';

interface SettlementFilterProps {
	settlements: string[];
	value: string | null;
	onChange: (value: string | null) => void;
}

export const SettlementFilter = ({
																	 settlements,
																	 value,
																	 onChange
																 }: SettlementFilterProps) => {
	const [query, setQuery] = useState('');
	const fuse = new Fuse(settlements, {threshold: 0.3});

	return (
		<Combobox value={value} onChange={onChange} nullable>
			<div className="relative">
				<Combobox.Input
					className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Название населённого пункта…"
				/>
				<Combobox.Options
					className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
					style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}
				>
					{(query ? fuse.search(query).map((r) => r.item) : settlements).map((item) => (
						<Combobox.Option
							key={item}
							value={item}
							className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
						>
							{item}
						</Combobox.Option>
					))}
				</Combobox.Options>
			</div>
		</Combobox>
	);
};
