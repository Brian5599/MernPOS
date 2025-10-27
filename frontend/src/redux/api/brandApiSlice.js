import { apiSlice } from "./apiSlice";
import { BRAND_URL } from "../features/constants";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBrand: builder.query({
      query: () => `${BRAND_URL}/brands`,
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: `${BRAND_URL}`,
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ brandId, updatedBrand }) => ({
        url: `${BRAND_URL}/${brandId}`,
        method: "PUT",
        body: updatedBrand,
      }),
      invalidatesTags: ["Brand"],
    }),

    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `${BRAND_URL}/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useFetchBrandQuery,
  useUpdateBrandMutation,
} = brandApiSlice;
