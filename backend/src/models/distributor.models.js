import mongoose, { model, Schema } from "mongoose";

const distributorSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        uniqueIdentifier: { type: String, required: true, unique: true },
        isVerified: { type: Boolean, default: false },
        rating: {
            average: { type: Number, default: 0, min: 0, max: 5 },
            count: { type: Number, default: 0 } 
        }
    },
    { timestamps: true },
);

distributorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

export const Distributor =
    mongoose.models.Distributor || model("Distributor", distributorSchema);
