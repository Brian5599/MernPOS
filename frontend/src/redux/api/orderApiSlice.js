import { apiSlice } from "./apiSlice";
import { ORDER_URL, PAYPAL_URL } from "../features/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
      providesTags: ["Order"],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
      invalidatesTags: ["Order"],
    }),

    getUserOrder: builder.query({
      query: () => ({
        url: `${ORDER_URL}/userOrders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}`,
      }),
      providesTags: ["Order"],
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: ["Order"],
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDER_URL}/totalSalesCount`,
    }),
    getTotalSales: builder.query({
      query: () => `${ORDER_URL}/totalSales`,
    }),
    getTotalSalesByDate: builder.query({
      query: () => `${ORDER_URL}/totalSalesByDate`,
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetUserOrderQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
  useGetPaypalClientIdQuery,
} = orderApiSlice;
