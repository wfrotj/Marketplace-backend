import express from "express";
import productController from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductByID);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
