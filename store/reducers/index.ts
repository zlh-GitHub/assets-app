import assetsReducers from './assetsReducer';
import { Store, Action } from '../type';
import { ICON } from '@/constants/Icon';
import categoryReducer from './categoryReducer';
import curCostReducer from './curCostReducer';

const initialState: Store = {
  assets: [
    {
      id: 1,
      name: '唯卓仕 85mm F1.8',
      icon: 'camera.aperture',
      purchaseDate: '1657987200000',
      purchasePrice: 1853.89,
      favorite: true,
      categoryId: 1,
      inService: true,
    },
    {
      id: 2,
      name: 'AirPods Pro 2',
      icon: 'airpods.pro',
      purchaseDate: '1657987200000',
      purchasePrice: 1853.89,
      categoryId: 2,
      inService: true,  
    },
    {
      id: 3,
      name: 'iPhone 15 Pro Max 512GB',  
      icon: 'iphone',
      purchaseDate: '1657987200000',
      purchasePrice: 1853.89,
      favorite: true,
      categoryId: 3,
      inService: true,
    },
    {
      id: 4,
      name: 'Nikon Zf 24-70f/4 套机',
      icon: 'camera.fill',
      purchaseDate: '1657987200000',
      purchasePrice: 1853.89,
      favorite: true,
      categoryId: 3,
      note: '相机坏了，无法使用',
      inService: true,
    },
    {
      id: 5,
      name: 'MacBook Pro M2 16+512',
      icon: 'laptopcomputer',
      purchaseDate: '1657987200000',
      purchasePrice: 1853.89,
      categoryId: 4,
      inService: true,
    },
    {
      id: 6,
      name: 'AirPods 2',
      icon: 'airpods',
      purchaseDate: '1636560000000',
      purchasePrice: 749,
      categoryId: 2,
      inService: false,
      retiredDate: '1732080000000',
      note: '耳机坏了，无法使用',
    },
    {
      id: 7,
      name: 'iPhone 13',
      icon: 'iphone.gen2',
      purchaseDate: '1636560000000',
      purchasePrice: 6000,
      categoryId: 1,
      inService: false,
      retiredDate: '1732080000000',
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
    curCost: curCostReducer(state.curCost, action),
  };
}