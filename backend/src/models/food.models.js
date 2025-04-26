import mongoose,{ Schema, model } from "mongoose";

const foodSchema = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true, enum: ["Veg", "Non-veg"] },
        quantity: {typeof: Number, required: true },   
    },
    { timestamps: true },
);

export const Food =
    mongoose.models.Food || model("Food", foodSchema);
