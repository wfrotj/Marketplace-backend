import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
      // minlength: [3, "Minimum of 3 letters"],
    },
    price: {
      type: String,
      required: true,
     
       
    },
    image: {
      type: String,
      required: true,
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
    returnedObject.dateCreated = new Date(
      returnedObject.createdAt
    ).toLocaleString();
    returnedObject.updated_at = new Date(
      returnedObject.updatedAt
    ).toLocaleString();

    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
