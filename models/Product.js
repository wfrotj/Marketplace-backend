import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    price: {
      type: String,
      required: true,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    photoInfo: {
      url: String,
      filename: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;

    // Format timestamps to a custom format
    returnedObject.dateVisited = new Date(
      returnedObject.createdAt
    ).toLocaleString();
    returnedObject.timeExited = new Date(
      returnedObject.updatedAt
    ).toLocaleString();

    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
