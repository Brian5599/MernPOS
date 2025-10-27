import { apiSlice } from "./apiSlice";
import { PRODUCT_URL, UPLOAD_URL } from "../features/constants";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getShopProducts: builder.query({
      query: ({ page, limit }) => ({
        url: `${PRODUCT_URL}/allproducts?page=${page}&limit=${limit}`,
      }),
      providesTags: ["Product"],
    }),

    getSpecialProducts: builder.query({
      query: ({ limit = 6 }) => ({
        url: `${PRODUCT_URL}/allproducts?limit=${limit}`,
      }),
      providesTags: ["Product"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/allproducts`,
      }),
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      providesTags: ["Product"],
    }),

    getProductDetail: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: keyword ? { keyword } : {},
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    createReviews: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `${PRODUCT_URL}/${productId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/top`,
      }),
      providesTags: ["Product"],
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
      }),
      providesTags: ["Product"],
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getFilteredProducts: builder.mutation({
      query: (filters) => ({
        url: `${PRODUCT_URL}/filteredproducts`,
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductDetailQuery,
  useGetAllProductsQuery,
  useCreateReviewsMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadImageMutation,
  useGetFilteredProductsMutation,
  useGetShopProductsQuery,
  useGetSpecialProductsQuery,
} = productApiSlice;
