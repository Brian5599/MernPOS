// import Message from "./Message";
// import Loader from "../../components/Loader";
// import { Link } from "react-router-dom";
// import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
// import { FaBox } from "react-icons/fa";
// import { FaShippingFast, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";
// import { useState } from "react";

// const Orderlist = () => {
//   const { data: orders, isLoading, error } = useGetAllOrdersQuery();
//   const [searchOrders, setSearchOrders] = useState("");

//   const filterOrders = orders.filter(
//     (order) => order._id && order.user?.name.includeds(searchOrders)
//   );

//   return (
//     <>
//       <div className="flex items-center gap-3 mb-6 ml-[6rem] ">
//         <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
//           <FaBox className="text-white text-xl" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
//           <p className="text-gray-400 text-sm">
//             Latest transactions from your store
//           </p>
//         </div>
//         <div className="">
//           <input
//             type="text"
//             className="px-4 py-2 w-full max-w-md border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:border-white"
//             placeholder="Search ID and Name "
//             value={searchOrders}
//             onChange={(e) => setSearchOrders(e.target.value)}
//           />
//         </div>
//       </div>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : ({filteredUsers.length === 0 ? (
//         <div className="text-center py-16 bg-gray-800/50 rounded-xl">
//           <FaBox className="mx-auto text-gray-600 text-6xl mb-4" />
//           <h3 className="text-xl font-semibold text-gray-300 mb-2">
//             No users found
//           </h3>
//           <p className="text-gray-500 mb-6">
//             Try adjusting your search or filters
//           </p>
//         </div>
//       ) :(
//         <table className="container mx-auto">
//           <thead className="w-full ">
//             <tr className="mb-[5rem]">
//               <th className="text-left pl-1">ITEMS</th>
//               <th className="text-left pl-1">ID</th>
//               <th className="text-left pl-1">USER</th>
//               <th className="text-left pl-1">DATE</th>
//               <th className="text-left pl-1">TOTAL</th>
//               <th className="text-left pl-1">PAID</th>
//               <th className="text-left pl-1">DELIVERED</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>
//                   <img
//                     src={order.orderItems[0].image}
//                     alt={order._id}
//                     className="w-[5rem] h-20 object-cover pt-4 rounded"
//                   />
//                 </td>
//                 <td>{order._id}</td>

//                 <td>{order.user ? order.user.username : "N/A"}</td>

//                 <td>
//                   {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
//                 </td>

//                 <td>$ {order.totalPrice}</td>

//                 {/* <td className="py-2">
//                   {order.isPaid ? (
//                     <span className="flex items-center text-center gap-2 px-1 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
//                       <FaCheckCircle />
//                       Paid
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2 px-2 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
//                       <FaClock />
//                       Pending
//                     </span>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <span className="flex items-center gap-2 px-2 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
//                       <FaShippingFast />
//                       Delivered
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
//                       <FaShippingFast />
//                       Shipping
//                     </span>
//                   )}
//                 </td> */}

//                 <td className="py-2">
//                   {order.isPaid ? (
//                     <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium min-w-[100px]">
//                       <FaCheckCircle className="text-base" />
//                       Paid
//                     </span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium min-w-[100px]">
//                       <FaClock className="text-base" />
//                       Pending
//                     </span>
//                   )}
//                 </td>

//                 <td className="px-2 py-2">
//                   {order.isDelivered ? (
//                     <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium min-w-[110px]">
//                       <FaShippingFast className="text-base" />
//                       Delivered
//                     </span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium min-w-[110px]">
//                       <FaShippingFast className="text-base" />
//                       Shipping
//                     </span>
//                   )}
//                 </td>

//                 <td>
//                   <Link to={`/order/${order._id}`}>
//                     <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
//                       <FaEye />
//                       View
//                     </button>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>)}
//       )}
//     </>
//   );
// };

// export default Orderlist;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";
import { useGetAllOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "./Message";

const Orderlist = () => {
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [searchOrders, setSearchOrders] = useState("");

  // ✅ Filter orders by user name or ID
  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchOrders.toLowerCase()) ||
      order.user?.username?.toLowerCase().includes(searchOrders.toLowerCase())
  );

  return (
    <>
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <FaBox className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
            <p className="text-gray-400 text-sm">
              Latest transactions from your store
            </p>
          </div>
        </div>

        <input
          type="text"
          className="px-4 py-2 w-full md:w-80 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:border-pink-500"
          placeholder="Search by ID or username..."
          value={searchOrders}
          onChange={(e) => setSearchOrders(e.target.value)}
        />
      </div>

      {/* Loader / Error / Table */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-gray-800/50 rounded-xl">
          <FaBox className="mx-auto text-gray-600 text-6xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No orders found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-white">
            <thead className=" text-gray-300 text-sm uppercase rounded-lg border-b border-gray-700">
              <tr>
                <th className="pl-2 py-3">Items</th>
                <th className="pl-2 py-3">ID</th>
                <th className="pl-2 py-3">User</th>
                <th className="pl-2 py-3">Date</th>
                <th className="pl-2 py-3">Total</th>
                <th className="pl-2 py-3">Paid</th>
                <th className="pl-2 py-3">Delivered</th>
                <th className="pl-2 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-3">
                    <img
                      src={order.orderItems?.[0]?.image}
                      alt={order._id}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-3">{order._id}</td>
                  <td className="py-3">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="py-3">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="py-3">${order.totalPrice}</td>

                  {/* Payment Status */}
                  <td className="py-3">
                    {order.isPaid ? (
                      <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium min-w-[100px]">
                        <FaCheckCircle className="text-base" />
                        Paid
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium min-w-[100px]">
                        <FaClock className="text-base" />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Delivery Status */}
                  <td className="py-3">
                    {order.isDelivered ? (
                      <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-medium min-w-[110px]">
                        <FaShippingFast className="text-base" />
                        Delivered
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium min-w-[110px]">
                        <FaShippingFast className="text-base" />
                        Shipping
                      </span>
                    )}
                  </td>

                  <td className="py-3">
                    <Link to={`/order/${order._id}`}>
                      <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        <FaEye />
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orderlist;
