import React, { FC, useContext, useId } from "react";

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

const dictionnariesMap = {
  app: translationDictionnaries,
  category: translationCategoryDictionnaries,
  feature: translationFeatureDictionnaries,
  language: translationLanguageDictionnaries,
};

type GlobalTranslationLabelType =
  | TranslationLabelType
  | TranslationFeatureLabelType
  | TranslationLanguageLabelType
  | TranslationCategoryLabelType;

function interpolate(
  text: string,
  values: Record<string, React.ReactNode>,
): React.ReactNode {
  return text.split(/(%\w+%)/g).map((part, i) => {
    const match = part.match(/^%(\w+)%$/);
    if (match) {
      const val = values[match[1]];
      return React.isValidElement(val)
        ? React.cloneElement(val, { key: `interpolate-${i}` })
        : (val ?? part);
    }
    return part;
  });
}

interface TLabelProps {
  label: GlobalTranslationLabelType;
  baliseType?: React.ElementType;
  translationType?: "app" | "category" | "feature" | "language";
  className?: string;
  noBalise?: boolean;
  capitalizeFirstLetter?: boolean;
  replaceValues?: Record<string, React.ReactNode>;
}

export const TLabel: FC<TLabelProps> = ({
  label,
  baliseType = "span",
  translationType = "app",
  className,
  noBalise = false,
  capitalizeFirstLetter = false,
  replaceValues = {},
}) => {
  const { selectedLanguage } = useContext(TranslationContext);
  const dict = dictionnariesMap[translationType] ?? translationDictionnaries;
  const translated: string =
    dict[selectedLanguage]?.[label as keyof (typeof dict)[string]] ?? label;

  let content: React.ReactNode = translated;
  if (replaceValues && Object.keys(replaceValues).length > 0) {
    // Interpolate the translated label with the replaceValues
    content = interpolate(translated, replaceValues);
  } else if (capitalizeFirstLetter) {
    // Capitalize the first letter of the translated label
    content = _capitalizeFirstLetter(translated as string);
  }

  if (noBalise) return <>{content}</>;
  // Return the translated label wrapped in the baliseType
  return React.createElement(baliseType, { className }, content);
};

function interpolateString(
  text: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (acc, [key, value]) =>
      acc.replace(new RegExp(`%${key}%`, "g"), String(value)),
    text,
  );
}

export const TText = ({
  label,
  translationType = "app",
  capitalizeFirstLetter = false,
  replaceValues = {},
}: {
  label: GlobalTranslationLabelType;
  translationType?: "app" | "category" | "feature" | "language";
  capitalizeFirstLetter?: boolean;
  replaceValues?: Record<string, string | number>;
}) => {
  const { selectedLanguage } = useContext(TranslationContext);
  const dict = dictionnariesMap[translationType] ?? translationDictionnaries;
  const translated: string =
    dict[selectedLanguage]?.[label as keyof (typeof dict)[string]] ?? label;

  let content = translated;
  if (replaceValues && Object.keys(replaceValues).length > 0) {
    content = interpolateString(translated, replaceValues);
  } else if (capitalizeFirstLetter) {
    content = _capitalizeFirstLetter(translated);
  }

  return content;
};
