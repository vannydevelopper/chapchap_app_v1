export const ecommerceCartSelector = ({ ecommerceCart }) => ecommerceCart
export const ecommerceCartLengthSelector = ({ ecommerceCart }) => ecommerceCart.length
export const ecommerceProductSelector = ID_PRODUIT_PARTENAIRE => ({ ecommerceCart }) => ecommerceCart.find(commande => commande.produit_partenaire.ID_PRODUIT_PARTENAIRE == ID_PRODUIT_PARTENAIRE)