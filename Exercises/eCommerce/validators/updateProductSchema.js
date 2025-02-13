import Yup from "yup";
export const updateProductSchema = Yup.object({
  name: Yup.string().optional(),
  description: Yup.string().optional(),
});
