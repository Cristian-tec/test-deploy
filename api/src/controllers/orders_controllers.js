const { Orders } = require("../db");
const { transporter } = require("../config/mailer");

const createOrder = async (data) => {
  try {
    if (data.status === "approved") {
      const result = await Orders.create({
        userId: data.userId,
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        quantity: data.quantity,
        orderDate: new Date().toISOString(),
        totalPrice: parseFloat(data.totalPrice),
        productId: data.productId,
        branchId: data.branchId,
      });

      await transporter.sendMail({
        from: '"Mc Burger 🍔" <foo@example.com>', // sender address
        to: data.userId, // list of receivers
        subject: "¡Thanks for your purchase!", // Subject line
        html: "<b>Enjoy the best flavors 😊</b>" + data.msg, // html body
      });

      return result;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createOrder };
