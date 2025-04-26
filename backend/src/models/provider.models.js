import { Schema } from "mongoose";

const providerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        location: { type: String, required: true },
        rating: { type: Number, default: 0 },
    },
    { timestamps: true },
);

export const Provider =
    mongoose.models.Provider || model("Provider", providerSchema);
