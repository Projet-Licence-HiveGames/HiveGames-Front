import { FC, useState } from 'react';
import classNames from 'classnames';

import './Dropdown.css';
import { MaterialSymbol } from 'react-material-symbols';

export interface DropdownOption {
	label: string | number;
	value: string | number;
	additionalValue?: string | number;
}

interface DropdownProps {
  className?: string;
  title: string;
  options: (string | number)[] | DropdownOption[];
  selected: (string | number)[];
  setSelected: (selected: (string | number)[]) => void;
}

const Dropdown: FC<DropdownProps> = ({ className, title, options, selected, setSelected }) => {
    const [isExpanded, setIsExpanded] = useState(false);
	const [_options, _] = useState<DropdownOption[]>(options.map(value => typeof value === 'object' ? value : { label: value, value }));
	// const [selected, setSelected] = useState<(number | string)[]>([]);
	  
	const handleClick = (item: DropdownOption) => {
		const isSelected = selected.some(i => i === item.value);
		setSelected(isSelected ? selected.filter(selectedItem => selectedItem !== item.value) : [...selected, item.value]);
		// setSelected(prev =>
		// 	isSelected
		// 		? prev.filter(selectedItem => selectedItem !== item.value) : [...prev, item.value]
		// );
	};

    return (
        <div className={classNames('dropdown-container', className)}>
			<div className='dropdown-header' onClick={() => setIsExpanded(!isExpanded)}>
				<span className='dropdown-header-title'>{title}</span>
				<MaterialSymbol icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} size={24}/>
			</div>
			{isExpanded && _options.length && (
				<div className='dropdown-content'>
					{selected.length > 0 && (
						<div className='dropdown-content-selected'>
							{_options.filter(value => selected.some(selectedItem => selectedItem === value.value)).map((value, index) => (
								<div key={index} className='dropdown-content-item dropdown-content-item--selected' onClick={() => handleClick(value)}>
									<span>{value.label}</span>
									<div className='dropdown-content-item-right'>
										{value.additionalValue && <span>{value.additionalValue}</span>}
										<MaterialSymbol icon='close' />
									</div>
								</div>
							))}
						</div>
					)}
					<div className='dropdown-content-available'>
						{_options.filter(value => !selected.some(selectedItem => selectedItem === value.value)).map((value, index) => (
							<div key={index} className='dropdown-content-item' onClick={() => handleClick(value)}>
								<span>{value.label}</span>
								{value.additionalValue && <span>{value.additionalValue}</span>}
							</div>
						))}
					</div>
				</div>
			)}
        </div>
    );
};

export default Dropdown;