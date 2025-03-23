import { AssetItemData } from '../type';
import * as actions from '../actions/assetsActions';

export const createAddAssetAction = (asset: AssetItemData) => {
  return {
    type: actions.ADD_ASSET,
    payload: asset,
  };
};

export const createDeleteAssetAction = (asset: AssetItemData) => {
  return {
    type: actions.DELETE_ASSET,
    payload: asset,
  };
};

export const createUpdateAssetAction = (asset: AssetItemData) => {
  return {
    type: actions.UPDATE_ASSET,
    payload: asset,
  };
};