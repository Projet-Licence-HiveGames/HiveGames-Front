declare module 'react-material-symbols/rounded' {
  export * from 'react-material-symbols';
}

declare module NodeJS {
  interface Global {
    translate: (label: string) => string;
  }
}
declare const translate: (label: string) => string;