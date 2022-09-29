import { ADD_COMMAND_ACTION, REMOVE_COMMAND_ACTION, RESET_CART_ACTION } from "../reducers/restaurantCartReducer"


export const addMenuAction = (menu, count) => {
          return {
                    type: ADD_COMMAND_ACTION,
                    payload: { ...menu, QUANTITE: count },       
                    
          }
          
}
export const removeProductAction = (ID_RESTAURANT_MENU) => {
          return {
                    type: REMOVE_COMMAND_ACTION,
                    payload: ID_RESTAURANT_MENU
          }
}

export const resetCartAction = () => {
          return {
                    type: RESET_CART_ACTION
          }
}