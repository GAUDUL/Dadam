interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

interface ProductItemProps {
  item: Product;
  owned: number[];
  coin: number;
  processing: number | null;
  equippedId: number | null;
  tryEquipped: boolean;
  onPurchase: (item: Product) => void;
  onEquip: (item: Product) => void;
  onTry: (item: Product) => void;
}
