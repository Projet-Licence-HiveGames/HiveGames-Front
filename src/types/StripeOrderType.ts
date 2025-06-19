export type StripeOrderType = {
  id: number;
  name: string;
  status: string;
  amount: number;
  invoice_url: string;
  game_ids: number[];
};
