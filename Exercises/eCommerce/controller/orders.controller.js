import Orders from "../models/orders.model.js";
import Order_Items from "../models/order_items.model.js";
import Products from "../models/products.model.js";
import Carts from "../models/cart.model.js";
import { updateOrderStatusSchema } from "../validators/updateOrderStatusSchema.js";
// Place a new order
export const placeOrder = async (req, res) => {
  try {
    let user_id = req.user.id;
    let cart = await Carts.findAll({
      where: { user_id },
      include: [
        {
          model: Products,
          required: true,
        },
      ],
    });
    let total_price = 0;
    let products_id = [];
    let outOfStockList = {};
    let errorQuantity = false;
    for (let product of cart) {
      if (product.quantity > product.dataValues.Product.dataValues.stock) {
        errorQuantity = true;
        let id = product.dataValues.Product.id;
        outOfStockList[id] = {
          stock: product.dataValues.Product.dataValues.stock,
        };
      }
    }
    if (errorQuantity) {
      return res
        .status(400)
        .json({ message: "stock is short for :", outOfStockList });
    }
    for (let product of cart) {
      total_price +=
        product.dataValues.Product.dataValues.price * product.quantity;
      products_id.push(product.dataValues.Product.id);
      let stock =
        product.dataValues.Product.dataValues.stock - product.quantity;
      let stockUpdated = await Products.update(
        { stock },
        { where: { id: product.dataValues.Product.id } }
      );
    }
    if (products_id.length < 1) {
      return res.status(404).json({ message: "Your Cart is Empty" });
    }

    let created = await Orders.create({ user_id, total_price });

    if (created) {
      let order_details = await Orders.findOne({
        where: { user_id },
        order: [["id", "DESC"]],
      });
      let order_id = order_details.id;
      let orderItems = [];
      for (let product of cart) {
        let price = product.dataValues.Product.dataValues.price;
        let quantity = product.quantity;
        let product_id = product.dataValues.Product.id;
        orderItems.push({
          order_id,
          product_id,
          quantity,
          price,
        });
      }
      const orderItemData = await Order_Items.bulkCreate(orderItems);
      if (orderItemData) {
        await Carts.destroy({ where: { user_id } });
        return res.status(200).json({
          message: "order was placed successfully",
          order_Items: orderItems,
        });
      } else {
        return res.status(400).json({
          message: "order was not placed",
          order_Items: orderItems,
        });
      }
    } else {
      console.log("Order Creation Failed");
      return res.status(400).json({ message: "Order was not placed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
// Get customer’s order history
export const getOrderHistory = async (req, res) => {
  try {
    let user_id = req.user.id;
    let orderHistory = await Orders.findAll({
      where: { user_id },
      include: [
        {
          model: Order_Items,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Products,
              attributes: ["id", "name", "description", "price"],
              required: true,
            },
          ],
        },
      ],
    });
    if (orderHistory) {
      return res.status(200).json({ orderhistory: orderHistory });
    } else {
      return res.status(400).json({ message: "orderHistory was not fetched" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
// Get order details
export const getOrderDetails = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.user.id;
    let orderDetails = await Orders.findAll({
      where: { id, user_id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Order_Items,
          required: true,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Products,
              attributes: ["id", "name", "description", "price"],
              required: true,
            },
          ],
        },
      ],
    });
    if (orderDetails) {
      res.status(200).json({ orderDetails: orderDetails });
    } else {
      res.status(400).json({ message: "unable to fetch order details" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error.errors || error.message,
    });
  }
};
// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    await updateOrderStatusSchema.validate(req.body, {
      abortEarly: false,
    });
    let id = req.params.id;
    let status = req.body.status;
    let statusUpdated = await Orders.update({ status }, { where: { id } });
    if (statusUpdated) {
      return res.status(200).json({
        message: `status was successfully updated to ${status}`,
        order: await Orders.findByPk(id),
      });
    } else {
      res.status(400).json({ message: "status was not updated" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error.errors || error.message,
    });
  }
};
