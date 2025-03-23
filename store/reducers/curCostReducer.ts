import { CostItemData, Action } from '../type';

export default function curCostReducer(state: CostItemData | undefined, action: Action<CostItemData>) {
  switch (action.type) {
    case 'SET_CUR_COST':
      return action.payload;
    default:
      return state;
  }
}
