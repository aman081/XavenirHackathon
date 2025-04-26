import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const providerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        rating: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0 } 
        }
    },
    { timestamps: true },
);

providerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

export const Provider =
    mongoose.models.Provider || model("Provider", providerSchema);
