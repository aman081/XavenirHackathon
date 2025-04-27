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
        providerLocation: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
                default: "Point",
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        distributorLocation: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
            },
        },
        liveLoc: [
            {
                type: {
                    type: String,
                    enum: ["Point"],
                    default: "Point",
                },
                coordinates: {
                    type: [Number],
                },
            },
        ],
        providerSupplyPhoto: { type: String, required: true },
        distributorSupplyPhotos: [{ type: String }],
        providerRating: { type: Number, default: null },
        distributorRatings: { type: Number, default: null },
    },
    { timestamps: true },
);

supplySchema.index({ providerLocation: "2dsphere" });
supplySchema.index({ distributorLocation: "2dsphere" });
supplySchema.pre("save", function (next) {
    if (
        this.distributorLocation &&
        (!this.distributorLocation.coordinates ||
            this.distributorLocation.coordinates.length !== 2)
    ) {
        this.distributorLocation = undefined;
    }
    next();
});

export const Supply = mongoose.models.Supply || model("Supply", supplySchema);
