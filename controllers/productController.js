import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  // try {
  //   const { name, number } = req.body;
  //   const productExists = await Product.findOne({ name });

  //   if (productExists)
  //     return res.status(400).json({ error: "Product already exists" });
  //   if (name === "" || number === "")
  //     return res
  //       .status(400)
  //       .json({ error: "Product name and price are required" });

  //   const product = new Product({
  //     name,
  //     price,
  //   });
  //   const savedProduct = await person.save();
  //   return res.status(201).json(savedProduct);
  // } catch (error) {
  //   console.log(error);
  // }

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
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
