const labelList = [
  "sidebar.home",
  "sidebar.catalog",
  "sidebar.calendar",
  "sidebar.subscription",
  "navitem.about",
  "footer.contact",
  "navitem.profil",
  "navitem.friend",
  "navitem.library",
  "navitem.setting",
  "logout",
  "subscription.classic",
  "subscription.premium",
  "subscription.ultimate",
] as const;

export type TranslationLabelType = (typeof labelList)[number];

export const translationDictionnaries: {
  [language: string]: { [label in TranslationLabelType]: string };
} = {
  // -------------------- English --------------------
  en: {
    "sidebar.home": "Home",
    "sidebar.catalog": "Catalog",
    "sidebar.calendar": "Calendar",
    "sidebar.subscription": "Subscription",
    "navitem.about": "About",
    "footer.contact": "Contact",
    "navitem.profil": "Profil",
    "navitem.friend": "Friends",
    "navitem.library": "Library",
    "navitem.setting": "Settings",
    logout: "Logout",
    "subscription.classic": "Subscription 1",
    "subscription.premium": "Subscription 2",
    "subscription.ultimate": "Subscription 3",
  },

  // -------------------- French --------------------
  fr: {
    "sidebar.home": "Accueil",
    "sidebar.catalog": "Catalogue",
    "sidebar.calendar": "Calendrier",
    "sidebar.subscription": "Abonnement",
    "navitem.about": "A propos",
    "footer.contact": "Contact",
    "navitem.profil": "Profil",
    "navitem.friend": "Amis",
    "navitem.library": "Bibliothèque",
    "navitem.setting": "Paramètres",
    logout: "Déconnexion",
    "subscription.classic": "Abonnement 1",
    "subscription.premium": "Abonnement 2",
    "subscription.ultimate": "Abonnement 3",
  },
};
