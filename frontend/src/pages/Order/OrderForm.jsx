import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../Admin/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const OrderForm = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal?.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        dispatch(clearCartItems());
        navigate("/");
        toast.success("Order Paid!");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || "Error loading order"}
    </Message>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Order Items</h2>
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto bg-[#181818] rounded-lg">
              <table className="w-full">
                <thead className="border-b-2 border-gray-700">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Unit Price</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/product/${item.product}`}
                          className="hover:text-pink-500 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-4 text-center">{item.qty}</td>
                      <td className="p-4 text-right">
                        ${Number(item.price).toFixed(2)}
                      </td>
                      <td className="p-4 text-right font-semibold">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column - Order Details */}
        <div className="lg:col-span-1">
          {/* Shipping Information */}
          <div className="bg-[#181818] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <div className="space-y-3">
              <p className="text-sm">
                <strong className="text-pink-500">Order ID:</strong>
                <br />
                <span className="text-gray-300">{order._id}</span>
              </p>

              <p className="text-sm">
                <strong className="text-pink-500">Customer:</strong>
                <br />
                <span className="text-gray-300">{order.user?.username}</span>
              </p>

              <p className="text-sm">
                <strong className="text-pink-500">Email:</strong>
                <br />
                <span className="text-gray-300">{order.user?.email}</span>
              </p>

              <p className="text-sm">
                <strong className="text-pink-500">Address:</strong>
                <br />
                <span className="text-gray-300">
                  {order.shippingAddress?.address}
                  <br />
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.postalCode}
                  <br />
                  {order.shippingAddress?.country}
                </span>
              </p>

              <p className="text-sm">
                <strong className="text-pink-500">Payment Method:</strong>
                <br />
                <span className="text-gray-300">{order.paymentMethod}</span>
              </p>
            </div>

            <div className="mt-4">
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </div>

            {/* {order.isDelivered ? (
              <div className="mt-2">
                <Message variant="success">
                  Delivered on{" "}
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </Message>
              </div>
            ) : (
              <div className="mt-2">
                <Message variant="danger">Not delivered</Message>
              </div>
            )} */}
          </div>

          {/* Order Summary */}
          <div className="bg-[#181818] rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Items:</span>
                <span>${Number(order.itemsPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping:</span>
                <span>${Number(order.shippingPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax:</span>
                <span>${Number(order.taxPrice || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-pink-500">
                  ${Number(order.totalPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* PayPal Buttons */}
            {!order.isPaid && (
              <div className="mt-6">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                />
              </div>
            )}

            {/* Admin Deliver Button */}
            {loadingDeliver && <Loader />}
            {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-pink-600 hover:bg-pink-700 text-white w-full py-3 rounded-lg font-semibold transition-colors"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
