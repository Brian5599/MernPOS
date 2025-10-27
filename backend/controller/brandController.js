import asyncHandler from "../middlewares/asyncHandler.js";
import Brand from "../models/BrandModel.js";

const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingBrand = await Brand.findOne({ name });

    if (existingBrand) {
      return res.json({ error: "Already exists" });
    }

    const brand = await new Brand({ name }).save();
    res.json(brand);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  try {
    if (brand) {
      brand.name = req.body.name || brand.name;

      const updatedBrand = await brand.save();

      res.json({ message: "update successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find({});
    res.json(brand);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const getBrandById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    return res.json(brand);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export { createBrand, updateBrand, deleteBrand, getAllBrand, getBrandById };
