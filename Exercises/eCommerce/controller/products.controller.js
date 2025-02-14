import express from "express";
import Categories from "../models/categories.model.js";
import Products from "../models/products.model.js";
import { addProductSchema } from "../validators/addProductSchema.js";
import { updateProductSchema } from "../validators/updateProductSchema.js";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";

// POST Add a new product------------(/api/products)-------------ACCESS[admin]
export const addNewProduct = async (req, res) => {
  try {
    await addProductSchema.validate(req.body, {
      abortEarly: false,
    });

    let { name, description, price, stock, category_id } = req.body;
    let image_url;
    if (req.file === undefined) {
      image_url = "";
    } else {
      image_url = req.file.path;
    }
    let categoryExists = await Categories.findByPk(category_id);
    if (categoryExists) {
      const result = await Products.create({
        name,
        description,
        price,
        stock,
        category_id,
        image_url,
      });
      if (result) {
        res.status(201).json({ message: " product was added successfully" });
      } else {
        res.status(400).json({ message: " product was not added" });
      }
    } else {
      res.status(404).json({ message: " no such category exists" });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.errors,
      error: error.message,
    });
  }
};

// GET Get all products---------------(/api/products)-------------------ACCESS[Public]
export const getAllProducts = async (req, res) => {
  try {
    let filters = {};
    let { min_price, max_price, id } = req.query;
    if (min_price !== undefined) {
      if (isNaN(min_price)) {
        return res.status(400).json({ message: "price must be a number" });
      }
      filters.price = { [Op.gte]: min_price };
    }
    if (max_price !== undefined) {
      if (isNaN(max_price)) {
        return res.status(400).json({ message: "price must be a number" });
      }
      filters.price = { ...filters.price, [Op.lte]: max_price };
    }
    if (id !== undefined) {
      if (isNaN(id)) {
        return res.status(400).json({ message: "id must be a number" });
      }
      filters.category_id = id;
    }
    const result = await Products.findAll({
      where: filters,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Categories,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Categories,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
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
// Update a product
export const updateProduct = async (req, res) => {
  try {
    let { name, description, price, stock, category_id, image_url } = req.body;
    if (isNaN(category_id)) {
      category_id = null;
    }
    if (isNaN(stock)) {
      category_id = null;
    }
    if (isNaN(price)) {
      category_id = null;
    }
    const changes = {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(price && { price: Number(price) }),
      ...(stock && { stock: Number(stock) }),
      ...(category_id && { category_id: Number(category_id) }),
      ...(image_url && { image_url: image_url }),
    };

    await updateProductSchema.validate(changes, {
      abortEarly: false,
    });

    let id = req.params.id;

    let product = await Products.findOne({ where: { id } });
    if (product) {
      if (req.file) {
        let image = product.image_url;

        if (image) {
          const fileName = path.basename(image);
          const absolutePath = path.join("D:/NodeJS/products", fileName);
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
          }
        }
      }
      if (!isNaN(category_id)) {
        if (category_id) {
          let categoriesExists = await Categories.findByPk(category_id);
          if (!categoriesExists) {
            res.status(404).json({ message: " no such category exists" });
          }
        }
      }
      let [updated] = await Products.update(changes, {
        where: { id },
      });

      if (updated) {
        let updatedUser = await Products.findByPk(req.params.id, {
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return res.status(200).json({
          message: "product updated successfully",
          userdata: updatedUser,
        });
      } else {
        return res.status(400).json({
          message: "product was not updated",
        });
      }
    } else {
      res.status(404).json({ message: "no such product found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

// Delete a product
export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the product
    let product = await Products.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({
        message: "No product with such ID found",
      });
    }

    let image = product.image_url;

    if (image) {
      const fileName = path.basename(image);

      // Construct absolute path
      const absolutePath = path.join("D:/NodeJS/products", fileName);

      // Check if file exists before deleting
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    // Delete product from database
    const deleted = await Products.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product was not be deleted" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
