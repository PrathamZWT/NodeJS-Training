import Categories from "../models/categories.model.js";
import { categoriesSchema } from "../validators/categoriesSchema.js";

// POST Create a new category------------(/api/categories)-------------ACCESS(Admin)
export const createNewCategories = async (req, res) => {
  try {
    await categoriesSchema.validate(req.body, {
      abortEarly: false,
    });
    const name = req.body.name;

    const exists = await Categories.findOne({ where: { name } });
    if (exists) {
      res.status(409).json({ message: "!!! CATEGORY ALREADY EXISTS !!!" });
    } else {
      const result = await Categories.create({ name });
      if (result) {
        res.status(201).json({ message: "category was added successfully" });
      } else {
        res.status(400).json({ message: "!!! category was not added !!!" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

// GET Get all categories------------(/api/categories)-------------ACCESS(Public)
export const getAllCategories = async (req, res) => {
  try {
    const allcategories = await Categories.findAll({
      attributes: ["id", "name"],
    });

    if (allcategories) {
      res.status(200).json({ data: allcategories });
    } else {
      res.status(404).json({ message: "no categories found" });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
