import { FC } from 'react';
import classNames from 'classnames';

import './FilterSidebar.css';
import { MaterialSymbol } from 'react-material-symbols';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Box, Chip, Slider } from '@mui/joy';

export interface GameFilter {
  search: string;
  categories: number[];
  languages: number[];
  features: number[];
  prices: {
    min: number;
    max: number;
  };
}

interface FilterSidebarProps {
  className?: string;
  filters: GameFilter;
  setFilters: (filters: GameFilter) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ className, filters, setFilters }) => {
  return (
    <div className={classNames('filter-sidebar-container', className)}>
      <div className='filter-sidebar-header'>
        <span>FILTRES</span>
        <MaterialSymbol icon='filter_alt_off' />
      </div>
      <Slider
        sx={{ margin: '1rem', width: 'auto', '& .MuiSlider-markLabel': {
          color: 'white',
        }}}
        getAriaLabel={() => 'Temperature range'}
        value={[filters.prices.min, filters.prices.max]}
        onChange={(_, value) => setFilters({ ...filters, prices: { min: (value as number[])[0], max: (value as number[])[1] } })}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value > 0 ? `${value > 100 ? "+100" : value} €` : "gratuit"}
        getAriaValueText={(value) => value > 0 ? `${value > 100 ? "+100" : value} €` : "gratuit"}
        max={101}
        marks={[
          {
            value: 0,
            label: 'Gratuit',
          },
          {
            value: 101,
            label: '+100 €',
          },
        ]}
      />
      <Select
        multiple
        defaultValue={['dog', 'cat']}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
            {selected.map((selectedOption) => (
              <Chip variant="soft" color="primary">
                {selectedOption.label}
              </Chip>
            ))}
          </Box>
        )}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
      >
        <Option value="dog">Dog</Option>
        <Option value="cat">Cat</Option>
        <Option value="fish">Fish</Option>
        <Option value="bird">Bird</Option>
      </Select>
    </div>
  );
};

export default FilterSidebar;