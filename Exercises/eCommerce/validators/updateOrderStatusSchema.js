import Yup from "yup";
export const updateOrderStatusSchema = Yup.object({
  status: Yup.string()
    .oneOf(
      [
        "pending",
        "shipped",
        "delivered",
        "canceled",
        "Pending",
        "Shipped",
        "Delivered",
        "Canceled",
      ],
      "Role must be either 'pending' , 'shipped' , 'delivered' , 'canceled'"
    )
    .required(),
});
