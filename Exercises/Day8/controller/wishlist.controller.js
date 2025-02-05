import Products from "../models/products.model.js";
import Wishlist from "../models/wishlist.model.js";

export const addProductToWishlist = async (req, res) => {
  try {
    let product_id = req.body.product_id;
    let user_id = req.user.id;
    console.log(user_id);
    console.log(product_id);

    if (isNaN(product_id)) {
      return res.status(404).json({ message: "product_id must be a number" });
    }
    if (await Products.findByPk(product_id)) {
      let alreadyExists = await Wishlist.findOne({
        where: { user_id, product_id },
      });
      console.log(alreadyExists);

      if (alreadyExists) {
        return res
          .status(404)
          .json({ message: "product is alredy in your Wish List" });
      } else {
        let result = Wishlist.create({ user_id, product_id });
        if (result) {
          return res
            .status(200)
            .json({ message: "product successfully added to the Wish List" });
        } else {
          return res
            .status(404)
            .json({ message: "product was not added to the Wish List" });
        }
      }
    } else {
      res.status(404).json({ message: "no such product exists" });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    let user_id = req.user.id;

    let wishListExists = await Wishlist.findOne({ where: { user_id } });

    if (!wishListExists) {
      return res.status(404).json({
        message: "Wishlist is empty.",
      });
    }

    console.log(wishListExists.dataValues);

    let list = await Wishlist.findAll({
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

    if (!list || list.length === 0) {
      return res.status(404).json({
        message: "No products found in wishlist.",
      });
    }

    return res.status(200).json({ WishList: list });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({
      error: error.errors || error.message,
    });
  }
};

export const removeItemFromWishlist = async (req, res) => {
  try {
    let user_id = req.user.id;
    let product_id = req.params.id;
    if (isNaN(product_id)) {
      return res.status(404).json({ message: "product_id must be a number" });
    }

    let exists = await Wishlist.findOne({
      where: { user_id: user_id, product_id: product_id },
    });
    console.log("Product exists in cart:", exists);

    if (exists) {
      let deleted = await Wishlist.destroy({
        where: { user_id: user_id, product_id: product_id },
      });

      if (deleted) {
        res.status(200).json({
          message: "Product was successfully removed from your wishlist",
        });
      } else {
        res.status(404).json({
          message: "The product was not removed from your wishlist",
        });
      }
    } else {
      res.status(404).json({
        message: "No such product exists in  your wishlist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.errors || error.message,
    });
  }
};
