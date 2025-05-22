export const calculateDiscount = (price: number, promotionRate: number) => {
  return Math.round(price * (1 - promotionRate / 100) * 100) / 100;
};
