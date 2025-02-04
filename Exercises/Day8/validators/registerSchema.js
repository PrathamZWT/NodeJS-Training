import Yup from "yup";
export const registerSchema = Yup.object({
  first_name: Yup.string().required("Name is required"),
  last_name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
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
      ["Admin", "User", "user", "admin"],
      "Role must be either 'Admin' or 'User'"
    )
    .required("Role is required"),
});
