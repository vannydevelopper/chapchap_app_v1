export const restaurantCartSelector = ({ restaurantCart }) => restaurantCart
export const restaurantCartLengthSelector = ({ restaurantCart }) => restaurantCart.length
export const restaurantProductSelector = ID_PRODUIT_PARTENAIRE => ({ restaurantCart }) => restaurantCart.find(commande => commande.produit_partenaire.ID_PRODUIT_PARTENAIRE == ID_PRODUIT_PARTENAIRE)