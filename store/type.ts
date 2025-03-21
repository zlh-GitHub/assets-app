import { IconName } from '@/constants/Icon';

export type AssetItemData = {
  id: number;
  name: string;
  price: number;
  dailyCost: number;
  days: number;
  icon: IconName;
  purchaseDate: string;
  purchasePrice: number;
  totalPrice: number;
  favorite?: boolean;
  category: {
    id: number;
    name: string;
    icon: IconName;
  },
  note?: string;
  retired?: boolean;
  retiredDate?: string;
}

export type Category = {
  id: number;
  name: string;
  icon: IconName;
}

export type Assets = AssetItemData[];
export type Categories = Category[];

export type Action<T = any> = {
  type: string;
  payload: T;
}

export type Store = {
  assets: Assets;
  categories: Categories;
}