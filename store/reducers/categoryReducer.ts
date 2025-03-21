import { Category, Categories, Action } from "../type";

export default function categoryReducer(state: Categories, action: Action<Category>) {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.payload];
    case 'DELETE_CATEGORY':
      return state.filter(category => category.id !== action.payload.id);
    case 'UPDATE_CATEGORY':
      return state.map(category => category.id === action.payload.id ? action.payload : category);
    default:
      return state;
  }
}
