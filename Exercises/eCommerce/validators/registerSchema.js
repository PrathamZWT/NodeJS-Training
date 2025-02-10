import Yup from "yup";
export const registerSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[A-Za-z'-]+$/, "name must be alphabetic letters onlys")
    .required("Name is required"),
  last_name: Yup.string()
    .matches(/^[A-Za-z'-]+$/, "name must be alphabetic letters onlys")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  role: Yup.string()
    .oneOf(
      ["Admin", "Customer", "customer", "admin"],
      "Role must be either 'Admin' or 'User'"
    )
    .optional(),
});
