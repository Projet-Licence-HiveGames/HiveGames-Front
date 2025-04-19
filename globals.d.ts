import type { translate as translateFunction } from './src/utils/translations';

declare global {
  const translate: typeof translateFunction;
}

export {};