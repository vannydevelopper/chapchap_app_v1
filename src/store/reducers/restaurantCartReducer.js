export const ADD_COMMAND_ACTION = 'ADD_COMMAND_ACTION'
export const REMOVE_COMMAND_ACTION = 'REMOVE_COMMAND_ACTION'
export const RESET_CART_ACTION = 'RESET_CART_ACTION'

export function restaurantCartReducer(products = [], action) {
          switch (action.type) {
                    case ADD_COMMAND_ACTION:
                              const product = products.find(command => command.produit_partenaire.ID_PRODUIT_PARTENAIRE == action.payload.produit_partenaire.ID_PRODUIT_PARTENAIRE)
                              if(product) {
                                        const newCommands = products.map(commande => {
                                                  if(commande.produit_partenaire.ID_PRODUIT_PARTENAIRE == product.produit_partenaire.ID_PRODUIT_PARTENAIRE) {
                                                            return {...commande, QUANTITE: action.payload.QUANTITE}
                                                  }
                                                  return commande
                                        })
                                        return newCommands
                              }
                              return [...products, action.payload]
                    case REMOVE_COMMAND_ACTION:
                              return products.filter((command, index) => command.produit_partenaire.ID_PRODUIT_PARTENAIRE != action.payload)
                    case RESET_CART_ACTION:
                              return []
                    default:
                              return products
          }
}