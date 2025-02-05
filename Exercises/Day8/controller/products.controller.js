import express from "express";
import Categories from "../models/categories.model.js";
import Products from "../models/products.model.js";
import { addProductSchema } from "../validators/addProductSchema.js";
import { updateProductSchema } from "../validators/updateProductSchema.js";
import fs from "fs";
import path from "path";

// POST Add a new product------------(/api/products)-------------ACCESS[admin]
export const addNewProduct = async (req, res) => {
  try {
    console.log("hello");
    await addProductSchema.validate(req.body, {
      abortEarly: false,
    });
    req.body;
    console.log(req.body);

    let { name, description, price, stock, category_id } = req.body;
    let image_url;
    if (req.file === undefined) {
      image_url = "";
    } else {
      image_url = req.file.path;
    }
    if (await Categories.findByPk(category_id)) {
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
    } else {
      res.status(404).json({ message: " no such category exists" });
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

export const updateProduct = async (req, res) => {
  try {
    await updateProductSchema.validate(req.body, {
      abortEarly: false,
    });
    let { name, description, price, stock, category_id, image_url } = req.body;
    console.log(req.body);

    let id = req.params.id;
    const changes = {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(price && { price: price }),
      ...(stock && { stock: stock }),
      ...(category_id && { category_id: category_id }),
      ...(image_url && { image_url: image_url }),
    };
    let product = await Products.findOne({ where: { id } });
    if (product) {
      if (req.file) {
        let image = product.image_url;
        console.log("Image Path:", image);

        if (image) {
          const fileName = path.basename(image);

          // Construct absolute path
          const absolutePath = path.join("D:/NodeJS/products", fileName);

          // Check if file exists before deleting
          if (fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath);
            console.log("File deleted successfully:", fileName);
          } else {
            console.log("File not found:", absolutePath);
          }
        } else {
          console.log("No image associated with the product.");
        }
      }

      if (await Categories.findByPk(category_id)) {
        let [updated] = await Products.update(changes, {
          where: { id },
        });

        if (updated) {
          let updatedUser = await Products.findByPk(req.params.id);
          return res.status(200).json({
            message: "product updated successfully",
            userdata: updatedUser,
          });
        } else {
          return res.status(404).json({
            message: "product was not updated",
          });
        }
      } else {
        res.status(404).json({ message: " no such category exists" });
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

export const DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Product ID:", id);

    // Find the product
    let product = await Products.findOne({ where: { id } });
    console.log("Product Data:", product);

    if (!product) {
      return res.status(404).json({
        message: "No product with such ID found",
      });
    }

    let image = product.image_url;
    console.log("Image Path:", image);

    if (image) {
      const fileName = path.basename(image);

      // Construct absolute path
      const absolutePath = path.join("D:/NodeJS/products", fileName);

      // Check if file exists before deleting
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        console.log("File deleted successfully:", fileName);
      } else {
        console.log("File not found:", absolutePath);
      }
    } else {
      console.log("No image associated with the product.");
    }

    // Delete product from database
    const deleted = await Products.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product could not be deleted" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
