import Yup from "yup";
export const categoriesSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});
