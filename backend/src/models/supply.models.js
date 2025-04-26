import mongoose, { Schema, model } from "mongoose";

const supplySchema = new Schema(
    {
        supplier: { type: Schema.Types.ObjectId, ref: "Provider" },
        recepients: [{ type: Schema.Types.ObjectId, ref: "Distributor" }],
        receiver: { type: Schema.Types.ObjectId, ref: "Distributor" },
        food: [
            {
                name: { type: String, required: true },
                category: {
                    type: String,
                    required: true,
                    enum: ["Veg", "Non-veg"],
                },
                quantity: { type: Number, required: true },
            },
        ],
        location: { type: String },
        providerSupplyPhoto: { type: String, required: true },
        distributorSupplyPhotos: [{ type: String }],
    },
    { timestamps: true },
);



export const Supply = mongoose.models.Supply || model("Supply", supplySchema);
