import { FC, useContext } from "react";

import { TranslationContext } from "../../../context/TranslationProvider";
import {
  translationDictionnaries,
  TranslationLabelType,
} from "../../../utils/translations";

interface TLabelProps {
  label: TranslationLabelType;
  BaliseType?: React.ElementType;
  className?: string;
}

const TLabel: FC<TLabelProps> = ({ label, BaliseType = "span", className }) => {
  const { selectedLanguage } = useContext(TranslationContext);
  return (
    <BaliseType className={className}>
      {translationDictionnaries[selectedLanguage][label]}
    </BaliseType>
  );
};

export default TLabel;
