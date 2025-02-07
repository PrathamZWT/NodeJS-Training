import Yup from "yup";
export const getAllUsersSchema = Yup.object({
  role: Yup.string()
    .oneOf(
      ["Admin", "Customer", "customer", "admin"],
      "Role must be either 'Admin' or 'User'"
    )
    .optional(),
});
