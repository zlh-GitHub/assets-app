import assetsReducers from './assetsReducer';
import { Store, Action } from '../type';
import { ICON } from '@/constants/Icon';
import categoryReducer from './categoryReducer';

const initialState: Store = {
  assets: [
    {
      id: 1,
      name: '唯卓仕 85mm F1.8',
      price: 1853.89,
      dailyCost: 16.0,
      days: 116,
      icon: 'camera.aperture',
      purchaseDate: 'July 17, 2022',
      purchasePrice: 1853.89,
      totalPrice: 216000.00,
      favorite: true,
      category: {
        id: 1,
        name: '相机',
        icon: 'camera.aperture',
      },
    },
    {
      id: 2,
      name: 'AirPods Pro 2',
      price: 1379.67,
      dailyCost: 10.3,
      days: 134,
      icon: 'airpods.pro',
      purchaseDate: 'July 17, 2022',
      purchasePrice: 1853.89,
      totalPrice: 216000.00,
      category: {
        id: 1,
        name: '耳机',
        icon: 'airpods.pro',
      },
    },
    {
      id: 3,
      name: 'iPhone 15 Pro Max 512GB',
      price: 6500.00,
      dailyCost: 46.4,
      days: 140,
      icon: 'iphone',
      purchaseDate: 'July 17, 2022',
      purchasePrice: 1853.89,
      totalPrice: 216000.00,
      favorite: true,
      category: {
        id: 1,
        name: '手机',
        icon: 'iphone',
      },
    },
    {
      id: 4,
      name: 'Nikon Zf 24-70f/4 套机',
      price: 17517.00,
      dailyCost: 62.6,
      days: 280,
      icon: 'camera.fill',
      purchaseDate: 'July 17, 2022',
      purchasePrice: 1853.89,
      totalPrice: 216000.00,
      favorite: true,
      category: {
        id: 1,
        name: '相机',
        icon: 'camera.aperture',
      },
      note: '相机坏了，无法使用',
    },
    {
      id: 5,
      name: 'MacBook Pro M2 16+512',
      price: 11449.00,
      dailyCost: 11.9,
      days: 965,
      icon: 'laptopcomputer',
      purchaseDate: 'July 17, 2022',
      purchasePrice: 1853.89,
      totalPrice: 216000.00,
      category: {
        id: 1,
        name: '笔记本',
        icon: 'laptopcomputer',
      },
    },
    {
      id: 6,
      name: 'AirPods 2',
      price: 749,
      dailyCost: 0.7,
      days: 1110,
      icon: 'airpods',
      purchaseDate: 'November 11, 2021',
      purchasePrice: 749,
      totalPrice: 749,
      category: {
        id: 1,
        name: '耳机',
        icon: 'airpods.pro',
      },
      retired: true,
      retiredDate: 'November 25, 2024',
      note: '耳机坏了，无法使用',
    },
    {
      id: 7,
      name: 'iPhone 13',
      price: 6000,
      dailyCost: 5.5,
      days: 1083,
      icon: 'iphone.gen2',
      purchaseDate: 'November 1, 2021',
      purchasePrice: 6000,
      totalPrice: 6000,
      category: {
        id: 1,
        name: '手机',
        icon: 'iphone',
      },
      retired: true,
      retiredDate: 'October 19, 2024',
      note: '手机坏了，无法使用',
    },
  ],
  categories: [
    {
      id: 1,
      name: '相机',
      icon: ICON['camera.aperture'],
    },
    {
      id: 2,
      name: '耳机',
      icon: ICON['airpods.pro'],
    },
    {
      id: 3,
      name: '手机',
      icon: ICON['iphone'],
    },
    {
      id: 4,
      name: '笔记本',
      icon: ICON['macbook'],
    },
  ],
};

export default function rootReducer(state: Store | undefined = initialState, action: Action): Store {
  return {
    assets: assetsReducers(state.assets, action),
    categories: categoryReducer(state.categories, action),
  };
}