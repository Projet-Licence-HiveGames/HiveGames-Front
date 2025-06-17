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

const dictionnariesMap = {
  app: translationDictionnaries,
  category: translationCategoryDictionnaries,
  feature: translationFeatureDictionnaries,
  language: translationLanguageDictionnaries,
};

function interpolateText(
  text: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (acc, [key, value]) =>
      acc.replace(new RegExp(`%${key}%`, "g"), String(value)),
    text,
  );
}

function interpolate(
  text: string,
  values: Record<string, string | number | React.ReactNode>,
): (string | React.ReactNode)[] {
  let parts: (string | React.ReactNode)[] = [text];
  for (const [key, value] of Object.entries(values)) {
    const placeholder = `%${key}%`;
    parts = parts.flatMap((part) =>
      typeof part === "string"
        ? part
            .split(placeholder)
            .flatMap((seg, i) => (i > 0 ? [value, seg] : [seg]))
        : [part],
    );
  }
  return parts;
}

interface TLabelProps {
  label:
    | TranslationLabelType
    | TranslationFeatureLabelType
    | TranslationLanguageLabelType
    | TranslationCategoryLabelType;
  baliseType?: React.ElementType;
  translationType?: "app" | "category" | "feature" | "language";
  className?: string;
  noBalise?: boolean;
  capitalizeFirstLetter?: boolean;
  replaceValues?: Record<string, string | number | React.ReactNode>;
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
  // Get the current selected language
  const { selectedLanguage } = useContext(TranslationContext);
  // Get the dictionary corresponding to type of translation
  const dict = dictionnariesMap[translationType] ?? translationDictionnaries;
  // Get the translated label from the dictionary corresponding to the selected language
  const translated =
    dict[selectedLanguage]?.[label as keyof (typeof dict)[string]] ?? label;

  let content: string | React.ReactNode | (string | React.ReactNode)[] =
    translated;
  if (replaceValues && Object.keys(replaceValues).length > 0) {
    // Interpolate the translated label with the replaceValues
    content = interpolate(translated as string, replaceValues);
  } else if (capitalizeFirstLetter) {
    // Capitalize the first letter of the translated label
    content = _capitalizeFirstLetter(translated as string);
  }

  if (noBalise) return <>{content}</>;
  // Return the translated label wrapped in the baliseType
  return React.createElement(baliseType, { className }, content);
};

export const TText = ({
  label,
  translationType = "app",
  capitalizeFirstLetter = false,
  replaceValues = {},
}: {
  label: TranslationLabelType;
  translationType?: "app" | "category" | "feature" | "language";
  capitalizeFirstLetter?: boolean;
  replaceValues?: Record<string, string | number>;
}) => {
  const { selectedLanguage } = useContext(TranslationContext);
  const dict = dictionnariesMap[translationType] ?? translationDictionnaries;
  const translated =
    dict[selectedLanguage]?.[label as keyof (typeof dict)[string]] ?? label;

  let content: string = translated;
  if (replaceValues && Object.keys(replaceValues).length > 0) {
    content = interpolateText(translated as string, replaceValues);
  } else if (capitalizeFirstLetter) {
    content = _capitalizeFirstLetter(translated as string);
  }

  return content;
};
