import Categories from "../models/categories.model.js";
import Products from "../models/products.model.js";
import { addProductSchema } from "../validators/addProductSchema.js";

// POST Add a new product------------(/api/products)-------------ACCESS[admin]
export const addNewProduct = async (req, res) => {
  try {
    console.log("hello");
    await addProductSchema.validate(req.body, {
      abortEarly: false,
    });
    let { name, description, price, stock, category_id } = req.body;
    let image_url = req.file.path;
    const result = await Products.create({
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    });
    if (result) {
      res.status(200).json({ message: " product was added successfully" });
    } else {
      res.status(404).json({ message: " product was not added" });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

// GET Get all products---------------(/api/products)-------------------ACCESS[Public]
export const getAllProducts = async (req, res) => {
  try {
    const result = await Products.findAll({
      include: [
        {
          model: Categories,
          required: true,
        },
      ],
    });
    {
      if (result) {
        res.status(200).json({ products: result });
      } else {
        res.status(404).json({ message: "no products found" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

// GET Get product details---------------(/api/products/:id)-------------------ACCESS[Public]
export const getProductDetail = async (req, res) => {
  try {
    const result = await Products.findByPk(req.params.id, {
      include: [
        {
          model: Categories,
          required: true,
        },
      ],
    });
    {
      if (result) {
        res.status(200).json({ products: result });
      } else {
        res.status(404).json({ message: "no product found" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
