import { Schema } from "mongoose";

const distributorSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        location: { type: String, required: true },
        uniqueIdentifier: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        rating: { type: Number, default: 0, min: 0, max: 5 },
    },
    { timestamps: true },
);

export const distributor =
    mongoose.models.Distributor || model("Distributor", distributorSchema);
