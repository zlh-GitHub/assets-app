import { CostItemData } from "../type";
import { SET_CUR_COST } from "../actions/curCostActions";

export const createSetCurCostAction = (cost: CostItemData) => {
  return {
    type: SET_CUR_COST,
    payload: cost,
  };
};
