// import { useEffect, useState } from "react";
// import {
//   useGetAllProductsQuery,
//   useDeleteProductMutation,
//   useUpdateProductMutation,
//   useUploadImageMutation,
// } from "../../redux/api/productApiSlice";

// import { Link } from "react-router";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice";
// import { useFetchBrandQuery } from "../../redux/api/brandApiSlice";

// const Productlist = () => {
//   const { data, refetch } = useGetAllProductsQuery();
//   const products = data?.products ?? [];
//   const [updateProduct] = useUpdateProductMutation();
//   const [uploadImage] = useUploadImageMutation();
//   const { data: categories } = useFetchCategoryQuery();
//   const { data: brands } = useFetchBrandQuery();

//   const [modal, setModal] = useState(false);
//   const [editProductId, setEditProductId] = useState("null");
//   const [editProductName, setEditProductName] = useState("");
//   const [editProductQuantity, setEditProductQuantity] = useState("");
//   const [editProductCategory, setEditProductCategory] = useState("");
//   const [editProductBrand, setEditProductBrand] = useState("");
//   const [editProductStock, setEditProductStock] = useState("");
//   const [editProductPrice, setEditProductPrice] = useState("");
//   const [editProductDescription, setEditProductDescription] = useState("");
//   const [editProductImage, setEditProductImage] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   const openModal = (product) => {
//     setModal(true);
//     setEditProductId(product._id);
//     setEditProductName(product.name);
//     setEditProductQuantity(product.quantity);
//     // setEditProductCategory(product.category?._id || product.category?.name);
//     // setEditProductBrand(product.brand);

//     setEditProductCategory(product.category?._id || product.category);
//     setEditProductBrand(product.brand?._id || product.brand);

//     setEditProductStock(product.countInStock);
//     setEditProductPrice(product.price);
//     setEditProductImage(product.image);
//     setEditProductDescription(product.description);
//   };

//   const closeModal = (product) => {
//     setModal(false);
//     setEditProductId(null);
//     setEditProductName("");
//     setEditProductQuantity("");
//     setEditProductCategory("");
//     setEditProductBrand("");
//     setEditProductStock("");
//     setEditProductPrice("");
//     setEditProductImage(null);
//     setPreviewImage("");
//     setEditProductDescription("");
//   };

//   // const updateHandler = async () => {
//   //   try {
//   //     const imageFormData = new FormData();
//   //     imageFormData.append("image",editProductImage)

//   //     const uploadRes = await uploadImage(imageFormData).unwrap()

//   //     const formData = new FormData();
//   //     formData.append("name", editProductName);
//   //     formData.append("quantity", editProductQuantity);
//   //     formData.append("category", editProductCategory);
//   //     formData.append("brand", editProductBrand);
//   //     formData.append("countInStock", editProductStock);
//   //     formData.append("price", editProductPrice);
//   //     formData.append("description", editProductDescription);

//   //     if (editProductImage) {
//   //       formData.append("image", uploadRes.image);
//   //     }

//   //     const {data} = await updateProduct({productId: editProductId, formData }).unwrap()

//   //     toast.success("Product updated successfully");
//   //     closeModal();
//   //     refetch();
//   //   } catch (error) {
//   //     toast.error(error?.data?.message || error.message);
//   //     console.log(error);
//   //   }
//   // };

//   // const updateHandler = async () => {
//   //   try {
//   //     let imagePath = editProductImage; // default to existing image

//   //     // Upload only if a new file was selected
//   //     if (editProductImage instanceof File) {
//   //       const imageFormData = new FormData();
//   //       imageFormData.append("image", editProductImage);

//   //       const uploadRes = await uploadImage(imageFormData).unwrap();
//   //       imagePath = uploadRes.image; // depends on your backend response
//   //     }

//   //     // Prepare product data
//   //     const formData = new FormData();
//   //     formData.append("name", editProductName);
//   //     formData.append("quantity", editProductQuantity);
//   //     formData.append("category", editProductCategory);
//   //     formData.append("brand", editProductBrand);
//   //     formData.append("countInStock", editProductStock);
//   //     formData.append("price", editProductPrice);
//   //     formData.append("description", editProductDescription);

//   //     if (imagePath) {
//   //       formData.append("image", imagePath);
//   //     }

//   //     await updateProduct({ productId: editProductId, formData }).unwrap();

//   //     toast.success("Product updated successfully");
//   //     closeModal();
//   //     refetch();
//   //   } catch (error) {
//   //     toast.error(error?.data?.message || error.message);
//   //     console.log(error);
//   //   }
//   // };

//   const updateHandler = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", editProductName);
//       formData.append("quantity", editProductQuantity);
//       formData.append("category", editProductCategory);
//       formData.append("brand", editProductBrand);
//       formData.append("countInStock", editProductStock);
//       formData.append("price", editProductPrice);
//       formData.append("description", editProductDescription);

//       // Only append new image file if selected, otherwise keep existing
//       if (editProductImage instanceof File) {
//         formData.append("image", editProductImage);
//       }

//       await updateProduct({ productId: editProductId, formData }).unwrap();

//       toast.success("Product updated successfully");
//       closeModal();
//       refetch();
//     } catch (error) {
//       toast.error(error?.data?.message || error.message);
//       console.error("Update error:", error);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditProductImage(file);
//       setPreviewImage(URL.createObjectURL(file)); // ✅ preview new image
//     }
//   };

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   const [deleteProduct] = useDeleteProductMutation();
//   const deleteHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await deleteProduct(id).unwrap();
//         toast.success("product deleted successfully");
//         refetch();
//       } catch (error) {
//         toast.error(error?.data?.message || error.message);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="p-4">
//         <div>
//           <h1 className="text-2xl font-semibold mb-4 ml-[20rem]">
//             Product Lists
//           </h1>
//           <Link to="/admin/createproduct">
//             <button className="bg-black text-white fixed right-3 h-10 w-30 rounded-xl ">
//               Create Product
//             </button>
//           </Link>
//         </div>

//         <div className="flex flex-col md:flex-row">
//           <table className="w-full md:w-4/5 mx-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left">Image</th>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Quantity</th>
//                 <th className="px-4 py-2 text-left">Cateogory</th>
//                 <th className="px-4 py-2 text-left">Brand</th>
//                 <th className="px-4 py-2 text-left">In Stock</th>
//                 <th className="px-4 py-2 text-left">Price</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-b border-gray-700">
//                   <td className="px-4 py-2">
//                     <img
//                       src={product.image}
//                       alt=""
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="px-4 py-2">{product.name}</td>
//                   <td className="px-4 py-2">{product.quantity}</td>
//                   <td className="px-4 py-2">{product.category?.name}</td>
//                   <td className="px-4 py-2">{product.brand?.name}</td>
//                   <td className="px-4 py-2">{product.countInStock}</td>
//                   <td className="px-4 py-2">${product.price}</td>

//                   <td className="px-4 py-2">
//                     <div className="flex gap-2">
//                       <button
//                         className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex items-center"
//                         onClick={() => openModal(product)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center"
//                         onClick={() => deleteHandler(product._id)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {modal && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-[#1a1a1a] rounded-lg p-6 w-[28rem] max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-white">Update Product</h2>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             {/* Image Preview */}
//             {previewImage || editProductImage ? (
//               <div className="mb-4 flex justify-center">
//                 <img
//                   src={previewImage || editProductImage}
//                   alt="Preview"
//                   className="w-32 h-32 object-cover rounded border border-gray-600"
//                 />
//               </div>
//             ) : null}

//             {/* Image Upload */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Image</label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="text-white"
//               />
//             </div>

//             {/* Name */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Name</label>
//               <input
//                 type="text"
//                 value={editProductName}
//                 onChange={(e) => setEditProductName(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-pink-500 focus:outline-none"
//               />
//             </div>

//             {/* Quantity */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Quantity</label>
//               <input
//                 type="number"
//                 value={editProductQuantity}
//                 onChange={(e) => setEditProductQuantity(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-pink-500 focus:outline-none"
//               />
//             </div>

//             {/* Category */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Category</label>
//               <select
//                 id="category"
//                 className="p-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={editProductCategory}
//                 onChange={(e) => setEditProductCategory(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Choose Category
//                 </option>
//                 {categories?.map((c) => (
//                   <option key={c._id} value={c._id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Brand */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Brand</label>
//               <select
//                 id="brand"
//                 className="p-3 w-full border rounded-lg bg-[#101011] text-white"
//                 value={editProductBrand}
//                 onChange={(e) => setEditProductBrand(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Choose Brand
//                 </option>
//                 {brands?.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Description</label>
//               <input
//                 type="text"
//                 value={editProductDescription}
//                 onChange={(e) => setEditProductDescription(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-pink-500 focus:outline-none"
//               />
//             </div>

//             {/* Stock */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Count In Stock</label>
//               <input
//                 type="number"
//                 value={editProductStock}
//                 onChange={(e) => setEditProductStock(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-pink-500 focus:outline-none"
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-4">
//               <label className="block text-white mb-2">Price</label>
//               <input
//                 type="number"
//                 value={editProductPrice}
//                 onChange={(e) => setEditProductPrice(e.target.value)}
//                 className="w-full p-3 border rounded-lg bg-[#101011] text-white border-gray-600 focus:border-pink-500 focus:outline-none"
//               />
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 onClick={updateHandler}
//                 className="flex-1 py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Productlist;

import { useEffect, useState } from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../redux/api/productApiSlice";
import { Link } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaPlus,
  FaBox,
  FaImage,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice";
import { useFetchBrandQuery } from "../../redux/api/brandApiSlice";
import Loader from "../../components/Loader";

const Productlist = () => {
  const { data, refetch, isLoading } = useGetAllProductsQuery();
  const products = data?.products ?? [];
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: categories } = useFetchCategoryQuery();
  const { data: brands } = useFetchBrandQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState("");
  const [editProductQuantity, setEditProductQuantity] = useState("");
  const [editProductCategory, setEditProductCategory] = useState("");
  const [editProductBrand, setEditProductBrand] = useState("");
  const [editProductStock, setEditProductStock] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductDescription, setEditProductDescription] = useState("");
  const [editProductImage, setEditProductImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const openModal = (product) => {
    setModal(true);
    setEditProductId(product._id);
    setEditProductName(product.name);
    setEditProductQuantity(product.quantity);
    setEditProductCategory(product.category?._id || product.category);
    setEditProductBrand(product.brand?._id || product.brand);
    setEditProductStock(product.countInStock);
    setEditProductPrice(product.price);
    setEditProductImage(product.image);
    setEditProductDescription(product.description);
    setPreviewImage("");
  };

  const closeModal = () => {
    setModal(false);
    setEditProductId(null);
    setEditProductName("");
    setEditProductQuantity("");
    setEditProductCategory("");
    setEditProductBrand("");
    setEditProductStock("");
    setEditProductPrice("");
    setEditProductImage(null);
    setPreviewImage("");
    setEditProductDescription("");
  };

  const updateHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editProductName);
      formData.append("quantity", editProductQuantity);
      formData.append("category", editProductCategory);
      formData.append("brand", editProductBrand);
      formData.append("countInStock", editProductStock);
      formData.append("price", editProductPrice);
      formData.append("description", editProductDescription);

      if (editProductImage instanceof File) {
        formData.append("image", editProductImage);
      }

      await updateProduct({ productId: editProductId, formData }).unwrap();
      toast.success("Product updated successfully");
      closeModal();
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      console.error("Update error:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name &&
      product.brand?.name &&
      product.category?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? product.category?._id === filterCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black lg:ml-20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <FaBox className="text-pink-500" />
              Product Management
            </h1>
            <p className="text-gray-400">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <Link to="/admin/createproduct">
            <button className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/50">
              <FaPlus />
              Create Product
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl">
            <FaBox className="mx-auto text-gray-600 text-6xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-700/50 transition-colors"
                    style={{
                      animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-700 hover:border-pink-500 transition-colors"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {product.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Qty: {product.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {product.category?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                        {product.brand?.name || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-bold">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.countInStock > 10
                            ? "bg-green-500/20 text-green-400"
                            : product.countInStock > 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {product.countInStock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => deleteHandler(product._id)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaEdit />
                Update Product
              </h2>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Image Preview */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Product Image
                </label>
                <div className="flex flex-col items-center gap-4">
                  {(previewImage || editProductImage) && (
                    <img
                      src={previewImage || editProductImage}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-lg border-2 border-gray-600"
                    />
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors">
                    <FaImage />
                    Choose Image
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editProductName}
                    onChange={(e) => setEditProductName(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={editProductPrice}
                    onChange={(e) => setEditProductPrice(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={editProductQuantity}
                    onChange={(e) => setEditProductQuantity(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={editProductStock}
                    onChange={(e) => setEditProductStock(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    value={editProductCategory}
                    onChange={(e) => setEditProductCategory(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    <option value="">Choose Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Brand *
                  </label>
                  <select
                    value={editProductBrand}
                    onChange={(e) => setEditProductBrand(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                  >
                    <option value="">Choose Brand</option>
                    {brands?.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={editProductDescription}
                  onChange={(e) => setEditProductDescription(e.target.value)}
                  rows="4"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={updateHandler}
                  disabled={isUpdating}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Productlist;
