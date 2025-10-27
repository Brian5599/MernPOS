import { useState } from "react";
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice";
import { useNavigate } from "react-router-dom";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { useFetchBrandQuery } from "../../redux/api/brandApiSlice";
// import AdminMenu from './AdminMenu';
const Productlist = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [uploadImage] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoryQuery();
  const { data: brands } = useFetchBrandQuery();

  // Add missing resetForm function
  const resetForm = () => {
    setImage("");
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setQuantity("");
    setBrand("");
    setStock(0);
    setImageUrl(null);
    setImagePath("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!image || !name || !price || !category || !description) {
      toast.error("Please fill all required fields and select an image");
      return;
    }

    try {
      // Step 1: Upload image first
      const imageFormData = new FormData();
      imageFormData.append("image", image); // File object from state

      const uploadRes = await uploadImage(imageFormData).unwrap();

      // Step 2: Create product with FormData including uploaded image path
      const productData = new FormData();
      productData.append("image", uploadRes.image); // Use uploaded image path
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity || 0);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/productlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  // Simple file handler - just stores the file for later upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store File object
      setImageUrl(URL.createObjectURL(file)); // Preview
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, WebP)");
        return;
      }

      setImage(file); // save file for backend
      setImageUrl(URL.createObjectURL(file)); // preview URL
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl font-bold mb-4">Create Product</div>
          {/* <AdminMenu/> */}

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="product preview"
                className="block mx-auto max-h-[200px] rounded-lg border"
              />
            </div>
          )}

          <div className="mb-3">
            <p>Image</p>
            <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:bg-gray-800 transition-colors hover:text-white">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                disabled={isLoading}
                required
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="name" className="block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="price" className="block mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  min="1"
                  step="0.01"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => {
                    const enterPrice = Number(e.target.value);

                    if (enterPrice < 1) {
                      toast.error(`Price should not be 0`);
                    } else {
                      setPrice(enterPrice);
                    }
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="quantity" className="block mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  required
                  min={1}
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => {
                    const enterQty = Number(e.target.value);

                    if (enterQty < 1) {
                      toast.error(`Quantity should be at least 1`);
                      setQuantity();
                    } else {
                      setQuantity(enterQty);
                    }
                  }}
                  disabled={isLoading}
                />
              </div>
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="brand" className="block mb-2">
                  Brand
                </label>
                <select
                  id="brand"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Choose Brand
                  </option>
                  {brands?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">
                Description *
              </label>
              <textarea
                id="description"
                rows="4"
                className="p-4 w-full border rounded-lg bg-[#101011] text-white resize-vertical"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="stock" className="block mb-2">
                  Count In Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  min={1}
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => {
                    const enterStock = Number(e.target.value);

                    if (enterStock < 1) {
                      toast.error(`Stock should be at least 1`);
                      setStock();
                    } else {
                      setStock(enterStock);
                    }
                  }}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="category" className="block mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  disabled={isLoading}
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="py-4 px-10 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
