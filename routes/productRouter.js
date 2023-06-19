import express from "express";
import productController from "../controllers/productController.js";
import upload from "../utils/multer.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:dateCreated", productController.getProductsByDate);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post(
  "/",
  upload.single("image"),
  productController.createProduct
);
// productRouter.post("/", productController.createProduct);
export default productRouter;
