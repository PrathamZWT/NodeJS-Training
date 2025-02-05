import Carts from "../models/cart.model.js";
import Products from "../models/products.model.js";
import Users from "../models/users.model.js";
import { addProductToCartSchema } from "../validators/addProductToCartSchema.js";

export const addProductToCart = async (req, res) => {
  try {
    await addProductToCartSchema.validate(req.body, {
      abortEarly: false,
    });
    console.log(req.body);

    let product_id = req.body.product_id;
    let user_id = req.user.id;
    let quantity = req.body.quantity;
    if (!(await Products.findByPk(product_id))) {
      return res.status(404).json({ message: "no such product exists" });
    }
    let product = await Products.findByPk(product_id);
    let stock = product.stock;
    if (quantity > stock) {
      return res.status(404).json({
        message:
          "please decrease the quantity it is more then that we have in stock",
      });
    }
    console.log("hello");

    if (await Carts.findOne({ where: { user_id, product_id } })) {
      return res
        .status(200)
        .json({ message: "product is already in your cart" });
    } else {
      let added = await Carts.create({ user_id, product_id, quantity });
      if (added) {
        res
          .status(200)
          .json({ message: "product was successfully added to cart" });
      } else {
        res.status(404).json({ message: "product was not added to cart" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    let user_id = req.user.id;
    let userCart = await Carts.findAll({
      where: { user_id },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "description", "price"],
          required: true,
        },
      ],
      attributes: ["product_id"],
    });

    console.log(userCart);

    if (!(userCart.length < 1)) {
      res.status(404).json({
        Cart: userCart,
      });
    } else {
      res.status(404).json({
        message: "no product in cart",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    let userId = req.user.id;
    let productId = req.params.id;

    if (isNaN(productId)) {
      return res.status(404).json({
        message: "product_id must be a number",
      });
    }
    console.log("Removing product ID:", productId);

    let exists = await Carts.findOne({
      where: { user_id: userId, product_id: productId },
    });
    console.log("Product exists in cart:", exists);

    if (exists) {
      let deleted = await Carts.destroy({
        where: { user_id: userId, product_id: productId },
      });

      if (deleted) {
        res.status(200).json({
          message: "Product was successfully removed from cart",
        });
      } else {
        res.status(404).json({
          message: "The product was not removed from your cart",
        });
      }
    } else {
      res.status(404).json({
        message: "No such product exists in your cart",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
