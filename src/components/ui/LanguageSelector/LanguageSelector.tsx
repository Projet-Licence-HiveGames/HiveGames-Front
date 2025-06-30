import { FC, useContext, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { AVAILABLE_TRANSLATION_LANGUAGES } from "@constants/LanguagesDict";
import classNames from "classnames";

import { TranslationContext } from "@contexts/TranslationProvider";
import { useOutsideClick } from "@hooks/useOutsideClick";

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
      className={classNames("language-selector-container", className)}
      ref={containerRef}
    >
      <MaterialSymbol
        className="language-selector-icon"
        color="white"
        icon="translate"
        onClick={handleIconClick}
        size={24}
      />
      <div
        className={classNames("language-dropdown", {
          "language-dropdown-open": isOpen,
        })}
      >
        {AVAILABLE_TRANSLATION_LANGUAGES.map((language) => (
          <div
            className={classNames("language-option", {
              "language-option-selected": language.value === selectedLanguage,
            })}
            key={language.value}
            onClick={() => handleOptionClick(language.value)}
          >
            {language.label}
          </div>
        ))}
      </div>
    </div>
  );
};
