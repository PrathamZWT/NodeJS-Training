import Orders from "../models/orders.model.js";
import Order_Items from "../models/order_items.model.js";
import Products from "../models/products.model.js";
import Carts from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  try {
    let user_id = req.user.id;
    let cart = await Carts.findAll({
      where: { user_id },
      attributes: ["product_id"],
    });
    let total_price;
    cart.forEach((product) => {});
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    if (isNaN(product_id)) {
      res.status(404).json({ message: "product_id must be a number" });
    }
    if (isNaN(quantity)) {
      res.status(404).json({ message: "quantity must be a number" });
    }
    let product = await Products.findByPk(product_id);
    let price = product.price;
    let created = await Orders.create({ user_id, total_price });
    if (created) {
      console.log("hello");
      let order_details = await Orders.findOne({ where: { user_id } });
      let order_id = order_details.id;
      let price = order_details.total_price / quantity;
      let order_item_placed = await Order_Items.create({
        order_id,
        product_id,
        quantity,
        price,
      });
      if (order_item_placed) {
        await Carts.destroy({ where: { user_id, product_id } });
        return res.status(200).json({ message: "Order Placed Successfully" });
      } else {
        return res.status(404).json({ message: "order was not placed" });
      }
    } else {
      console.log("bye");
    }
  } catch (error) {
    return res.status(500).json({
      error: error.errors || error.message,
    });
  }
};
