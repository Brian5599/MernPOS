// import Message from "../Admin/Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetUserOrderQuery } from "../../redux/api/orderApiSlice";

// const UserOrder = () => {
//   const { data: orders, isLoading, error } = useGetUserOrderQuery();

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <table className="w-full">
//           <thead>
//             <tr>
//               <td className="py-2">IMAGE</td>
//               <td className="py-2">ID</td>
//               <td className="py-2">DATE</td>
//               <td className="py-2">TOTAL</td>
//               <td className="py-2">PAID</td>
//               <td className="py-2">DELIVERED</td>
//               <td className="py-2"></td>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <img
//                   src={order.orderItems[0].image}
//                   alt={order.user}
//                   className="w-[6rem] mb-5 rounded-lg"
//                 />

//                 <td className="py-2">{order._id}</td>
//                 <td className="py-2">{order.createdAt.substring(0, 10)}</td>
//                 <td className="py-2">$ {order.totalPrice}</td>

//                 <td className="py-2">
//                   {order.isPaid ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
//                       Completed
//                     </p>
//                   ) : (
//                     <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
//                       Pending
//                     </p>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   <Link to={`/order/${order._id}`}>
//                     <button className="bg-pink-400 text-back py-2 px-3 rounded">
//                       View Details
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserOrder;

import Message from "../Admin/Message";
import Loader from "../../components/Loader";
import { data, Link } from "react-router-dom";
import { useGetUserOrderQuery } from "../../redux/api/orderApiSlice";
import { FaShippingFast, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetUserOrderQuery();
  console.log(orders);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
        <p className="text-gray-400">Track and manage your order history</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : orders?.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-500 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No orders yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start shopping to see your orders here
          </p>
          <Link to="/">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto bg-[#1a1a1a] rounded-lg shadow-xl">
            <table className="w-full">
              <thead className="bg-[#252525] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-[#222] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.orderItems[0]?.image}
                          alt={order.orderItems[0]?.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                        />
                        <div>
                          <p className="text-white font-medium line-clamp-1">
                            {order.orderItems[0]?.name}
                          </p>
                          {order.orderItems.length > 1 && (
                            <p className="text-gray-400 text-sm">
                              +{order.orderItems.length - 1} more item(s)
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-300 font-mono text-sm">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-gray-300">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">
                        ${Number(order.totalPrice).toFixed(2)}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {order.isPaid ? (
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                            <FaCheckCircle />
                            Paid
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                            <FaClock />
                            Pending
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {order.isDelivered ? (
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                            <FaShippingFast />
                            Delivered
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                            <FaShippingFast />
                            Shipping
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Link to={`/order/${order._id}`}>
                          <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            <FaEye />
                            View
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1a1a1a] rounded-lg p-5 shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={order.orderItems[0]?.image}
                    alt={order.orderItems[0]?.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-700"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1 line-clamp-2">
                      {order.orderItems[0]?.name}
                    </p>
                    {order.orderItems.length > 1 && (
                      <p className="text-gray-400 text-sm mb-2">
                        +{order.orderItems.length - 1} more item(s)
                      </p>
                    )}
                    <p className="text-gray-400 text-sm font-mono">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Date</p>
                    <p className="text-white text-sm">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total</p>
                    <p className="text-white text-sm font-semibold">
                      ${Number(order.totalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {order.isPaid ? (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex-1 justify-center">
                      <FaCheckCircle />
                      Paid
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium flex-1 justify-center">
                      <FaClock />
                      Pending
                    </span>
                  )}

                  {order.isDelivered ? (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex-1 justify-center">
                      <FaShippingFast />
                      Delivered
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium flex-1 justify-center">
                      <FaShippingFast />
                      Shipping
                    </span>
                  )}
                </div>

                <Link to={`/order/${order._id}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                    <FaEye />
                    View Order Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserOrder;
