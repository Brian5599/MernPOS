import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

// const createOrder = async(req,res)=>{
//     try {
//         const {orderItems, shippingAddress, paymentMethod} = req.body;

//         if(orderItems && orderItems.length===0){
//             res.status(400);
//             throw new Error('no order item')
//         }

//         const itemFromDB= await Product.find({
//             _id:{$in :orderItems.map((x)=>x._id)}
//         })

//         const dbOrderItems = orderItems.map((itemFromClient)=>{
//             const matchingItemFromDB = itemFromDB.find(
//                 (itemFromDB) =>itemFromDB._id.toString()=== itemFromClient._id)

//                 if(!matchingItemFromDB){
//                     res.status(400)
//                     throw new Error(`product not found:${itemFromClient}`)
//                 }
//                 if (matchingItemFromDB.countInStock<itemFromClient.qty){
//                     res.status(400)
//                     throw new Error(`not enough stock for ${matchingItemFromDB.name}. Avaiable :${matchingItemFromDB.countInstock}, Request: ${itemFromClient.qty}`)
//                 }

//                 return{
//                     ...itemFromClient,
//                     product: itemFromClient._id,
//                     price: matchingItemFromDB.price,
//                     _id:undefined,
//                 }
//         })

//         const { itemPrice, taxPrice, shippingPrice, totalPrice}= calcPrices(dbOrderItems)

//         const order = new Order({
//             orderItems:dbOrderItems,
//             user: req.user._id,
//             shippingAddress,
//             paymentMethod,
//             itemPrice,
//             shippingPrice,
//             totalPrice
//         })

//         const res = await order.save()

//         try {
//             for (const item of dbOrderItems) {
//               await Product.updateOne(
//                 { _id: item.product },
//                 { $inc: { countInStock: item.qty } }
//               );
//             }
//             res.status(201).json(res);

//             await Order.findByIdAndDelete(res._id);

//             res.status(500).json({ error: "Stock update failed, order rolled back" });
//           } catch (err) {
//         res.status(500).json({error:error.message})

//           }
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// }

const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "No order items" });
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      if (matchingItemFromDB.countInStock < itemFromClient.qty) {
        throw new Error(
          `Not enough stock for ${matchingItemFromDB.name}. Available: ${matchingItemFromDB.countInStock}, Requested: ${itemFromClient.qty}`
        );
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    try {
      // Decrement stock
      for (const item of dbOrderItems) {
        await Product.updateOne(
          { _id: item.product },
          { $inc: { quantity: -item.qty } }
        );
      }

      res.status(201).json(createdOrder);
    } catch (err) {
      // ❌ Rollback stock if something failed
      for (const item of dbOrderItems) {
        await Product.updateOne(
          { _id: item.product },
          { $inc: { quantity: item.qty } } // restore stock
        );
      }

      // Also remove the order
      await Order.findByIdAndDelete(createdOrder._id);

      res.status(500).json({
        error: "Stock update failed, rolled back order and stock",
        details: err.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({}).populate("user", "id username");
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const countTotalSales = async (req, res) => {
//   try {
//     const totalOrder = await Order.countDocuments();
//     res.json(totalOrder);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const calculateTotalSales = async (req, res) => {
//   try {
//     const order = await Order.find();
//     const totalSales = order.reduce((sum, order) => sum + order.totalPrice, 0);
//     res.json({ totalSales });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// Total Revenue (sum of all paid orders)
const calculateTotalSales = async (req, res) => {
  try {
    const totalSalesData = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalSales = totalSalesData[0]?.totalSales || 0;
    res.json({ totalSales });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Total Orders + Average Order Value
const countTotalSales = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ isPaid: true });

    const totalRevenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.json({
      totalOrders,
      avgOrderValue: avgOrderValue.toFixed(2),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const calculateTotalSalesByDate = async (req, res) => {
//   try {
//     const saleByDate = await Order.aggregate([
//       {
//         $match: {
//           isPaid: true,
//         },
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$createdAt",
//             },
//           },
//         },
//       },
//     ]);

//     res.json(saleByDate);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const calculateTotalSalesByDate = async (req, res) => {
  try {
    const saleByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(saleByDate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404).json("order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const orderUpdated = await order.save();
      res.json(orderUpdated);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  getUserOrder,
  countTotalSales,
  calculateTotalSales,
  calculateTotalSalesByDate,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
