import Yup from "Yup";

// user
export const CreateUserSchema = Yup.object({
  name: Yup.string().required("Name field is empty; it is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email field is empty; it is required"),
  age: Yup.number()
    .integer("Age must be an integer")
    .required("Age field is empty; it is required"),
  role: Yup.string()
    .oneOf(["Admin", "User"], "Role must be either 'Admin' or 'User'")
    .required("Role field is empty; it is required"),
  isActive: Yup.boolean()
    .oneOf([true, false], "isActive must be either true or false")
    .required("isActive field is empty; it is required"),
});
export const UpdateUserSchema = Yup.object({
  name: Yup.string().optional(),
  email: Yup.string().email("Invalid email format").optional(),
  age: Yup.number().integer("Age must be an integer").optional(),
  role: Yup.string()
    .oneOf(["Admin", "User"], "Role must be either 'Admin' or 'User'")
    .optional(),
  isActive: Yup.boolean()
    .oneOf([true, false], "isActive must be either true or false")
    .optional(),
});
export const getUserSchema = Yup.object({
  ageGT: Yup.number().integer("Age must be an integer").optional(),
  ageLT: Yup.number().integer("Age must be an integer").optional(),
  role: Yup.string()
    .oneOf(["Admin", "User"], "Role must be either 'Admin' or 'User'")
    .optional(),
  isActive: Yup.boolean()
    .oneOf([true, false], "isActive must be either true or false")
    .optional(),
});

//  User Profile
export const createUserProfileSchema = Yup.object({
  userId: Yup.number("userId must be integer").required(
    "  filed is empty it is required"
  ),
  bio: Yup.string().required("  filed is empty it is required"),
  linkedInUrl: Yup.string().url().required("  filed is empty it is required"),
  facebookUrl: Yup.string().url().required("  filed is empty it is required"),
  instaUrl: Yup.string().url().required("  filed is empty it is required"),
});
export const createUserProfileUpdateSchema = Yup.object({
  bio: Yup.string().optional(),
  linkedInUrl: Yup.string().url().required("  filed is empty it is required"),
  facebookUrl: Yup.string().url().required("  filed is empty it is required"),
  instaUrl: Yup.string().url().required("  filed is empty it is required"),
});

// user form

export const CreateformSchema = Yup.object({
  name: Yup.string().required("Name field is empty; it is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email field is empty; it is required"),
  age: Yup.number()
    .integer("Age must be an integer")
    .required("Age field is empty; it is required"),
  role: Yup.string()
    .oneOf(["Admin", "User"], "Role must be either 'Admin' or 'User'")
    .required("Role field is empty; it is required"),
  isActive: Yup.boolean()
    .oneOf([true, false], "isActive must be either true or false")
    .required("isActive field is empty; it is required"),
});
