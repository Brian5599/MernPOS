import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

const Categorylist = () => {
  const { data: categories, isLoading, error } = useFetchCategoryQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modal, setModal] = useState(false);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Failed to load categories</div>;

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a category name");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      toast.success(`${result.name} created successfully`);
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create category");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updateName },
      }).unwrap();

      toast.success(
        `${
          result.name || result.category?.name || updateName
        } updated successfully`
      );

      setSelectedCategory(null);
      setUpdateName("");
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const confirmed = confirm("ARE YOU SURE");
      if (!confirmed) {
        setModal(false);
        return;
      }
      const result = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(
        `${
          result.name || result.category?.name || updateName
        }deleted successfully`
      );
      setSelectedCategory(null);
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

        {/* Create Form */}
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <hr className="my-4" />

        {/* Category List */}
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none"
                onClick={() => {
                  setModal(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <CategoryForm
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Categorylist;
