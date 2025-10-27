import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useFetchBrandQuery,
} from "../../redux/api/brandApiSlice";
import BrandForm from "../../components/BrandForm";
import Modal from "../../components/Modal";
const Brandlist = () => {
  const { data: brands, isLoading, error } = useFetchBrandQuery();
  const [createBrand] = useCreateBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand] = useDeleteBrandMutation();

  const [name, setName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modal, setModal] = useState(false);

  if (isLoading) return <Loader />;
  if (error)
    return <div className="text-red-600">Failed to load categories</div>;

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter a brand name");
      return;
    }

    try {
      const result = await createBrand({ name }).unwrap();
      toast.success(`${result.name} created successfully`);
      setName("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create brand");
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Brand name is required");
      return;
    }

    try {
      const result = await updateBrand({
        brandId: selectedBrand._id,
        updatedBrand: { name: updateName },
      }).unwrap();

      toast.success(
        `${
          result.name || result.brand?.name || updateName
        } updated successfully`
      );

      setSelectedBrand(null);
      setUpdateName("");
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update brand");
    }
  };

  const handleDeleteBrand = async () => {
    try {
      const confirmed = confirm("ARE YOU SURE?");
      if (!confirmed) {
        setModal(false);
        return;
      }
      const result = await deleteBrand(selectedBrand._id).unwrap();
      toast.success(`${result.name} deleted successfully`);
      setSelectedBrand(null);
      setModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete brand");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h2 className="text-xl font-bold mb-4">Manage Brand</h2>

        {/* Create Form */}
        <BrandForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateBrand}
        />
        <hr className="my-4" />

        {/* Brand List */}
        <div className="flex flex-wrap">
          {brands?.map((brand) => (
            <div key={brand._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none"
                onClick={() => {
                  setModal(true);
                  setSelectedBrand(brand);
                  setUpdateName(brand.name);
                }}
              >
                {brand.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modal} onClose={() => setModal(false)}>
          <BrandForm
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdateBrand}
            buttonText="Update"
            handleDelete={handleDeleteBrand}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Brandlist;
