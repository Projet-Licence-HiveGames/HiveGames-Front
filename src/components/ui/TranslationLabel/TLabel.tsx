import React, { FC, useContext } from "react";

import { TranslationContext } from "../../../context/TranslationProvider";
import {
  translationDictionnaries,
  TranslationLabelType,
} from "../../../utils/translations";

interface TLabelProps {
  label: TranslationLabelType;
  baliseType?: React.ElementType;  // Prop avec camelCase
  className?: string;
}

export const TLabel: FC<TLabelProps> = ({ label, baliseType = "span", className }) => {
  const { selectedLanguage } = useContext(TranslationContext);

  // Récupère le texte traduit
  const translatedText = translationDictionnaries[selectedLanguage][label];

  // Retourne la balise dynamique avec le texte traduit
  return React.createElement(
    baliseType,
    { className },
    translatedText
  );
};
