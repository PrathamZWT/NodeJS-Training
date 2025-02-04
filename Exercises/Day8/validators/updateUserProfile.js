import Yup from "yup";
export const updateUserProfileSchema = Yup.object({
  first_name: Yup.string().optional(),
  last_name: Yup.string().optional(),
  email: Yup.string().email("Invalid email format").optional(),
  role: Yup.string()
    .oneOf(
      ["Admin", "User", "user", "admin"],
      "Role must be either 'Admin' or 'User'"
    )
    .optional(),
});
