import { FC, useContext, useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import classNames from "classnames";

import { AVAILABLE_TRANSLATION_LANGUAGES } from "../../../constants/LanguagesDict";
import { TranslationContext } from "../../../context/TranslationProvider";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

import "./LanguageSelector.css";

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const { selectedLanguage, setSelectedLanguage } =
    useContext(TranslationContext);

  const handleIconClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={classNames("language-selector-container", className)}
    >
      <MaterialSymbol
        icon="translate"
        size={24}
        color="white"
        className="language-selector-icon"
        onClick={handleIconClick}
      />
      <div
        className={classNames("language-dropdown", {
          "language-dropdown-open": isOpen,
        })}
      >
        {AVAILABLE_TRANSLATION_LANGUAGES.map((language) => (
          <div
            key={language.value}
            className={classNames("language-option", {
              "language-option-selected": language.value === selectedLanguage,
            })}
            onClick={() => handleOptionClick(language.value)}
          >
            {language.label}
          </div>
        ))}
      </div>
    </div>
  );
};
