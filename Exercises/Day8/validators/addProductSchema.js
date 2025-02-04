import Yup from "yup";
export const addProductSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("description is required"),
  price: Yup.number("Price must be number").required("Price must not be empty"),
  stock: Yup.number("stock must be number").required("stock must not be empty"),
  category_id: Yup.number("category_id must be number").required(
    "category_id must not be empty"
  ),
});
