import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import fs from "fs";
import path from "path";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "name is required" });
      case !description:
        return res.json({ error: "description is required" });
      case !price:
        return res.json({ error: "price is required" });
      case !category:
        return res.json({ error: "category is required" });
      case !quantity:
        return res.json({ error: "quantity is required" });
      case !brand:
        return res.json({ error: "brand is required" });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// const updateProduct = asyncHandler(async (req, res) => {
//     try {
//       const { name, description, price, category, quantity, brand } = req.fields;

//       switch (true) {
//         case !name:
//           return res.status(400).json({ error: "name is required" });
//         case !description:
//           return res.status(400).json({ error: "description is required" });
//         case !price:
//           return res.status(400).json({ error: "price is required" });
//         case !category:
//           return res.status(400).json({ error: "category is required" });
//         case !quantity:
//           return res.status(400).json({ error: "quantity is required" });
//         case !brand:
//           return res.status(400).json({ error: "brand is required" });
//       }

//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         { name, description, price, category, quantity, brand },
//         { new: true, runValidators: true }
//       );

//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       res.json(product);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock,
    } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ error: "name is required" });
      case !description:
        return res.status(400).json({ error: "description is required" });
      case !price:
        return res.status(400).json({ error: "price is required" });
      case !category:
        return res.status(400).json({ error: "category is required" });
      case !quantity:
        return res.status(400).json({ error: "quantity is required" });
      case !brand:
        return res.status(400).json({ error: "brand is required" });
    }

    // Prepare update data
    const updateData = {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      countInStock: countInStock || 0,
    };

    // Handle image upload if new image provided
    if (req.files && req.files.image) {
      const image = req.files.image;

      // Move the file to uploads directory

      const extname = path.extname(image.name);
      const filename = `image-${Date.now()}${extname}`;
      const imagePath = path.join("uploads", filename);

      // Move file from temp location to uploads
      fs.renameSync(image.path, imagePath);

      updateData.image = `/${imagePath}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({ error: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json("delete successfully");
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("brand", "name");
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 999999;

    const product = await Product.find({})
      .populate("category", "name")
      .populate("brand", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments();
    res.json({
      products: product,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $option: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const product = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      product,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({})
      .populate("brand", "name")
      .sort({ rating: -1 })
      .limit(4);
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const addProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getFilteredProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = { $in: checked };
    }

    if (radio.length > 0) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const product = await Product.find(args);
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  fetchProducts,
  getTopProducts,
  getNewProducts,
  getFilteredProducts,
  addProductReviews,
};
