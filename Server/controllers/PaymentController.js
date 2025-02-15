const midtransClient = require("midtrans-client");
const { Order } = require("../models/");
require("dotenv").config();

class PaymentController {
  static async initiateMidtransTrx(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const OrderId = Math.random().toString();
      const amount = 150_000;

      let parameter = {
        transaction_details: {
          order_id: OrderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
    //   console.log(transaction);

      // transaction token
      let transactionToken = transaction.token;

      await Order.create({
        OrderId,
        amount,
        UserId: req.user.id,
      });

    //   console.log("transactionToken:", transactionToken);
      res.json({ message: "Order Created", transactionToken, OrderId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { PaymentController };
