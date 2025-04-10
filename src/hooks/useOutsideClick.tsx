import { LegacyRef, useEffect, useRef } from 'react';

export type useOutsideClickCallback = (
  event?: MouseEvent,
  ref?: HTMLElement,
) => void;
export type useOutsideClickOptions = { disableContextMenu?: boolean };

export function useOutsideClick<T extends HTMLElement>(
  callback: useOutsideClickCallback,
  options: useOutsideClickOptions = {},
) {
  const ref: LegacyRef<T> = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event, ref.current);
      }
    };

    document.addEventListener('click', handleClick);
    if (!options.disableContextMenu) {
      document.addEventListener('contextmenu', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
      if (!options.disableContextMenu) {
        document.removeEventListener('contextmenu', handleClick);
      }
    };
  }, [ref, callback, options]);

  return ref;
}