import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import './FilterSidebar.css';
import { MaterialSymbol } from 'react-material-symbols';
import { Slider } from '@mui/joy';
import Dropdown, { DropdownOption } from './Dropdown/Dropdown';
import { GameCategory, GameFeature, Language } from '../../../types/Game';
import { useFetch } from '../../../api/privateApi';

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
  const fetchAPI = useFetch();
  // const [categories, setCategories] = useState<GameCategory[]>([
  //   {id: 1, label: "rpg"},
  //   {id: 2, label: "sandbox"},
  //   {id: 3, label: "fps"},
  //   {id: 4, label: "pvp"},
  //   {id: 5, label: "pve"},
  //   {id: 6, label: "shooter"},
  //   {id: 7, label: "rogue_like"},
  // ]);

  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [features, setFeatures] = useState<GameFeature[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const categoriesRes = await fetchAPI.get<GameCategory[]>("/categories");
        const featuresRes = await fetchAPI.get<GameFeature[]>("/features");
        const languagesRes = await fetchAPI.get<Language[]>("/languages");

        setCategories(categoriesRes);
        setFeatures(featuresRes);
        setLanguages(languagesRes);
      } catch (error) {
        console.error("Erreur lors de la récupération des filtres", error);
      }
    };

    fetchFilters();
  }, []);

  const priceLabel = (() => {
    const min = filters.prices.min === 0 ? 'Gratuit' : `${filters.prices.min} €`
    const max = filters.prices.max === 101 ? '+100 €' : `${filters.prices.max} €`
    if (filters.prices.min == filters.prices.max) {
      if (filters.prices.min === 0) {
        return 'Gratuit';
      } else if (filters.prices.min === 101) {
        return '+100 €';
      } else {
        return `${filters.prices.min} €`;
      }
    } else {
      return `Entre ${min} et ${max}`;
    }
  })();
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
        // marks={[
        //   {
        //     value: 0,
        //     label: filters.prices.min == 0 ? "Gratuit" : filters.prices.min == 101 ? "+100 €" : `${filters.prices.min} €`,
        //   },
        //   {
        //     value: 101,
        //     label: filters.prices.max == 0 ? "Gratuit" : filters.prices.max == 101 ? "+100 €" : `${filters.prices.max} €`,
        //   },
        // ]}
      />
      <span>{priceLabel}</span>

      <Dropdown title='Categories' options={categories.map((category) => ({ label: category.label, value: category.id } as DropdownOption))} selected={filters.categories} setSelected={(selected) => setFilters({ ...filters, categories: selected as number[] })}/>
      <Dropdown title='Languages' options={languages.map((language) => ({ label: language.label, value: language.id } as DropdownOption))} selected={filters.languages} setSelected={(selected) => setFilters({ ...filters, languages: selected as number[] })}/>
      <Dropdown title='Features' options={features.map((feature) => ({ label: feature.label, value: feature.id } as DropdownOption))} selected={filters.features} setSelected={(selected) => setFilters({ ...filters, features: selected as number[] })}/>
    </div>
  );
};

export default FilterSidebar;