import React from "react";
const BrandForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 "
        placeholder="Enter brand name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {buttonText}
        </button>

        {handleDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-pink-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default BrandForm;
