import Product from "../models/Product.js";
import { ref, uploadBytes } from "firebase/storage";
import storage from "../utils/firebaseConfig.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// const getProductByID = async (req, res) => {
//   try {
//     const { dateCreated } = req.params;
//     const product = await Product.findOne(dateCreated);
//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

const getProductsByDate = async (req, res) => {
  try {
    const { dateCreated } = req.params;

    // Parse the date string from the URL parameter
    const date = new Date(dateCreated);

    // Get the start and end of the specified date
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const products = await Product.find({
      createdAt: { $gte: start, $lt: end },
    });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// const createProduct = async (req, res) => {
//   try {
//     const { name, price } = req.body;
//     const product = new Product({
//       name,
//       price,
//     });
//     const savedProduct = await product.save();

//     res.status(200).json(savedProduct);
//   } catch (error) {
//     console.log(error);
//   }
// };

const createProduct = async (req, res, next) => {
  const storageRef = ref(storage, req.file.originalname);
  const metaData = {
    contentType: "image/jpeg",
  };

  const snapshot = await uploadBytes(storageRef, req.file.buffer, metaData);

  const photoUrl = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref.bucket}/o/${snapshot.ref.fullPath}?alt=media`;
  try {
    const { name, price } = req.body;
    const productExists = await Product.findOne({ name });

    if (productExists)
      return res.status(400).json({ error: "Product already exists" });
    if (name === "" || price === "")
      return res
        .status(400)
        .json({ error: "Product name and price are required" });

    const product = new Product({
      name,
      price,
      photoInfo: {
        url: photoUrl,
        filename: snapshot.ref.fullPath,
      },
    });
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(204).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(400)
        .json({ message: `cannot find product with id ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(204).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};

export default {
  getProducts,
  getProductsByDate,
  createProduct,
  updateProduct,
  deleteProduct,
};
