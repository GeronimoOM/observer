import { createActions } from 'redux-actions'
import Api from '../config/api'


export const { fetchCategoriesSucc,  fetchCategoriesReq, fetchCategoriesErr } = createActions({
  FETCH_CATEGORIES_SUCC: (categories) => ({ categories }),
}, 'FETCH_CATEGORIES_REQ', 'FETCH_CATEGORIES_ERR')

export function fetchCategories() {
  return (dispatch) => {
      dispatch(fetchCategoriesReq())

      return fetch(Api.categories, {method: "GET"})
      .then(response => response.json())
      .then(categories => dispatch(fetchCategoriesSucc(categories)))
      .catch(e => dispatch(fetchCategoriesErr(e.message)))
  }
}
