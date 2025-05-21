import React, { FC, useContext } from "react";

import {
  translationCategoryDictionnaries,
  TranslationCategoryLabelType,
} from "../../../constants/CategoriesDict.tsx";
import {
  translationFeatureDictionnaries,
  TranslationFeatureLabelType,
} from "../../../constants/FeaturesDict";
import {
  translationLanguageDictionnaries,
  TranslationLanguageLabelType,
} from "../../../constants/LanguagesDict";
import { TranslationContext } from "../../../context/TranslationProvider";
import { capitalizeFirstLetter as _capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import {
  translationDictionnaries,
  TranslationLabelType,
} from "../../../utils/translations";

interface TLabelProps {
  label:
    | TranslationLabelType
    | TranslationFeatureLabelType
    | TranslationLanguageLabelType
    | TranslationCategoryLabelType; // Type de la clé de traduction
  baliseType?: React.ElementType; // Prop avec camelCase
  translationType?: "app" | "category" | "feature" | "language"; // Type de la clé de traduction
  className?: string;
  noBalise?: boolean; // Prop pour ne pas utiliser de balise
  capitalizeFirstLetter?: boolean; // Prop pour capitaliser la première lettre
  params?: { value?: string };
}

export const TLabel: FC<TLabelProps> = ({
  label,
  baliseType = "span",
  translationType = "app",
  className,
  noBalise = false,
  capitalizeFirstLetter = false,
  params = {},
}) => {
  const { selectedLanguage } = useContext(TranslationContext);

  // Récupère le texte traduit
  const translatedText = (() => {
    switch (translationType) {
      case "app": {
        const value =
          translationDictionnaries[selectedLanguage][
            label as TranslationLabelType
          ] ?? label;
        if (typeof value === "function") {
          return value(params?.value ?? "");
        }
        return value;
      }
      case "category":
        return (
          translationCategoryDictionnaries[selectedLanguage][
            label as TranslationCategoryLabelType
          ] ?? label
        );
      case "feature":
        return (
          translationFeatureDictionnaries[selectedLanguage][
            label as TranslationFeatureLabelType
          ] ?? label
        );
      case "language":
        return (
          translationLanguageDictionnaries[selectedLanguage][
            label as TranslationLanguageLabelType
          ] ?? label
        );
      default:
        return (
          translationDictionnaries[selectedLanguage][
            label as TranslationLabelType
          ] ?? label
        );
    }
  })();

  // Si noBalise est vrai, retourne juste le texte traduit
  if (noBalise) {
    if (typeof translatedText === "function") return null;
    return (
      <>
        {capitalizeFirstLetter
          ? _capitalizeFirstLetter(translatedText)
          : translatedText}
      </>
    );
  }

  if (typeof translatedText === "function") return null;

  // Retourne la balise dynamique avec le texte traduit
  return React.createElement(
    baliseType,
    { className },
    capitalizeFirstLetter
      ? _capitalizeFirstLetter(translatedText)
      : translatedText,
  );
};
