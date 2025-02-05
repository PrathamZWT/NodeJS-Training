import Yup from "yup";
export const addProductToCartSchema = Yup.object({
  product_id: Yup.number("product_id must be number").required(
    "product_id must not be empty"
  ),
  quantity: Yup.number("quantity must be number").required(
    "quantity must not be empty"
  ),
});
