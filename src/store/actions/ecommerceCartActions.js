import { ADD_COMMAND_ACTION, REMOVE_COMMAND_ACTION, RESET_CART_ACTION } from "../reducers/ecommerceCartReducer"


export const addProductAction = (product, count, combinaison) => {
          return {
                    type: ADD_COMMAND_ACTION,
                    payload: { ...product, QUANTITE: count , combinaison}
          }
}
export const removeProductAction = (ID_PRODUIT_PARTENAIRE) => {
          return {
                    type: REMOVE_COMMAND_ACTION,
                    payload: ID_PRODUIT_PARTENAIRE
          }
}

export const resetCartAction = () => {
          return {
                    type: RESET_CART_ACTION
          }
}