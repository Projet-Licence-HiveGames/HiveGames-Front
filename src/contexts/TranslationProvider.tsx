import { createContext, ReactNode, useMemo, useState } from "react";

interface TranslationContextProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TranslationContext = createContext<TranslationContextProps>({
  selectedLanguage: "fr",
  setSelectedLanguage: () => {},
});

export const TranslationProviderProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedLanguage, _setSelectedLanguage] = useState<string>(
    localStorage.getItem("selectedLanguage") || "fr",
  );
  const setSelectedLanguage = (language: string) => {
    localStorage.setItem("selectedLanguage", language);
    _setSelectedLanguage(language);
  };
  const contextValue = useMemo(
    () => ({
      selectedLanguage,
      setSelectedLanguage,
    }),
    [selectedLanguage, setSelectedLanguage],
  );

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProviderProvider;
