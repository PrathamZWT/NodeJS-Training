import Yup from "yup";
export const updateUserProfileSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[A-Za-z'-]+$/, "name must be alphabetic letters onlys")
    .optional(),
  last_name: Yup.string()
    .matches(/^[A-Za-z'-]+$/, "name must be alphabetic letters onlys")
    .optional(),
  email: Yup.string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .optional(),
  role: Yup.string()
    .oneOf(
      ["Admin", "Customer", "customer", "admin"],
      "Role must be either  'customer', 'admin'"
    )
    .optional(),
});
