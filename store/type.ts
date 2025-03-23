import { IconName } from '@/constants/Icon';

export type AssetItemData = {
  id: number; // id
  name: string; // 物品名字
  purchaseDate: string; // 购买日期 timestamp
  purchasePrice: number; // 购买价格
  icon: IconName; // 物品图标
  warrantyDate?: string; // 保修日期
  usageCount?: number; // 设置目标使用次数
  dailyPrice?: number; // 设置目标每日价格要达到多少
  favorite?: boolean; // 是否收藏
  categoryId?: number; // 分类ID
  note?: string; // 备注
  inService: boolean; // 是否在使用
  retiredDate?: string; // 退役日期 timestamp
  sellingPrice?: number; // 出售价格
  specifiedDailyPrice?: number; // 指定每日价格
  image?: string; // 物品图片
  extraCosts?: CostItemData[];
}

export type CostItemData = {
  id?: number; // id
  name: string; // 费用名称
  amount: number; // 费用价格
  date: string; // 费用日期 timestamp
  description?: string; // 费用描述
}

export type Category = {
  id: number; // 分类id
  name: string; // 分类名称
  icon: IconName; // 分类图标
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
  curCost?: CostItemData;
}