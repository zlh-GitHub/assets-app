import { Category } from "../type";

export const createAddCategoryAction = (category: Category) => {
  return {
    type: 'ADD_CATEGORY',
    payload: category,
  };
};

export const createDeleteCategoryAction = (category: Category) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: category,
  };
};

export const createUpdateCategoryAction = (category: Category) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: category,
  };
};
