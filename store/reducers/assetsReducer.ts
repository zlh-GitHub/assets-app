import { Assets, Action, AssetItemData } from '../type'; 
import * as actions from '../actions/assetsActions';

export default function assetsReducer(state: Assets, action: Action<AssetItemData>) {
  switch (action.type) {
    case actions.ADD_ASSET:
      return [...state, action.payload];
    case actions.DELETE_ASSET:
      return state.filter(asset => asset.id !== action.payload.id);
    case actions.UPDATE_ASSET:
      return state.map(asset => asset.id === action.payload.id ? action.payload : asset);
    default:
      return state;
  }
}