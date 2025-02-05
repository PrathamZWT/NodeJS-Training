import Yup from "yup";
export const updateProductSchema = Yup.object({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
  price: Yup.number("Price must be number").optional(),
  stock: Yup.number("stock must be number").optional(),
  category_id: Yup.number("category_id must be number").optional(),
});
