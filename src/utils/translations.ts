export const currentLanguage: "fr" | "en" = "fr";

const labelList = [
  "sidebar_home",
  "navitem_about",
  "footer_contact",
  "navitem_profil",
  "navitem_friend",
  "navitem_library",
  "navitem_setting",
  "logout",
  "subscription_1",
  "subscription_2",
  "subscription_3",
] as const;

type TranslationLabelType = (typeof labelList)[number];

export const translate = (label: TranslationLabelType): string =>
  translationDictionnaries[currentLanguage][label];

export const translationDictionnaries: {
  [language: string]: { [label in TranslationLabelType]: string };
} = {
  // -------------------- English --------------------
  en: {
    sidebar_home: "Home",
    navitem_about: "About",
    footer_contact: "Contact",
    navitem_profil: "Profil",
    navitem_friend: "Friends",
    navitem_library: "Library",
    navitem_setting: "Settings",
    logout: "Logout",
    subscription_1: "Subscription 1",
    subscription_2: "Subscription 2",
    subscription_3: "Subscription 3",
  },

  // -------------------- French --------------------
  fr: {
    sidebar_home: "Accueil",
    navitem_about: "A propos",
    footer_contact: "Contact",
    navitem_profil: "Profil",
    navitem_friend: "Amis",
    navitem_library: "Bibliothèque",
    navitem_setting: "Paramètres",
    logout: "Déconnexion",
    subscription_1: "Abonnement 1",
    subscription_2: "Abonnement 2",
    subscription_3: "Abonnement 3",
  },
};
