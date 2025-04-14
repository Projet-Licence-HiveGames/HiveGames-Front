export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    const formattedString = str.replace(/_/g, ' ');
    return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};