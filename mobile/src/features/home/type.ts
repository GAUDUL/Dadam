type ProductItemProps = {
  item: { id: number; name: string; price: number };
  owned: number[];
  coin: number;
  processing: number | null;
  onPurchase: (product: { id: number; name: string; price: number }) => void;
};