export const API_URL = process.env.NODE_ENV === 'test'
  ? 'http://localhost:3000'  // URL pour les tests
  : process.env.HIVEGAMES_BACKEND_API;  // URL pour le développement/production