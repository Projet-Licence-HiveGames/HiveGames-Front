import { FC, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import classNames from "classnames";

import { useOutsideClick } from "../../../../hooks/useOutsideClick";

import "./Dropdown.css";

export interface DropdownOption {
  label: string;
  value: string | number;
  additionalValue?: string | number;
}

interface DropdownProps {
  className?: string;
  title: string | JSX.Element;
  options: DropdownOption[];
  selected: (string | number)[];
  setSelected: (selected: (string | number)[]) => void;
  alphabeticalOrder?: boolean;
}

const Dropdown: FC<DropdownProps> = ({
  className,
  title,
  options,
  selected,
  setSelected,
  alphabeticalOrder,
}) => {
  const ref = useOutsideClick<HTMLDivElement>(() => setIsExpanded(false));
  const [isExpanded, setIsExpanded] = useState(false);

  const orderedOptions = alphabeticalOrder
    ? options.sort((a, b) => {
        return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
      })
    : options;

  const handleClick = (item: DropdownOption) => {
    const isSelected = selected.some((i) => i === item.value);
    setSelected(
      isSelected
        ? selected.filter((selectedItem) => selectedItem !== item.value)
        : [...selected, item.value],
    );
  };

  return (
    <div className={classNames("dropdown-container", className)} ref={ref}>
      <div
        className="dropdown-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="dropdown-header-title regular-16">{title}</span>
        <MaterialSymbol
          icon={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          size={24}
        />
      </div>
      {options.length > 0 &&
        ((selected.length > 0 && !isExpanded) || isExpanded) && (
          <div className="dropdown-content">
            {selected.length > 0 && (
              <div className="dropdown-content-selected regular-12">
                {orderedOptions
                  .filter((value) =>
                    selected.some(
                      (selectedItem) => selectedItem === value.value,
                    ),
                  )
                  .map((value, index) => (
                    <div
                      className="dropdown-content-item dropdown-content-item--selected"
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(value);
                      }}
                    >
                      {typeof value.label === "string" ? (
                        <span>{value.label}</span>
                      ) : (
                        value.label
                      )}
                      <div className="dropdown-content-item-right">
                        {value.additionalValue && (
                          <span>{value.additionalValue}</span>
                        )}
                        <MaterialSymbol icon="close" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {isExpanded && (
              <div className="dropdown-content-available regular-12">
                {orderedOptions
                  .filter(
                    (value) =>
                      !selected.some(
                        (selectedItem) => selectedItem === value.value,
                      ),
                  )
                  .map((value, index) => (
                    <div
                      className="dropdown-content-item"
                      key={index}
                      onClick={() => handleClick(value)}
                    >
                      {typeof value.label === "string" ? (
                        <span>{value.label}</span>
                      ) : (
                        value.label
                      )}
                      {value.additionalValue && (
                        <span>{value.additionalValue}</span>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default Dropdown;
