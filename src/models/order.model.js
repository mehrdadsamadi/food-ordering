import { Schema, models, model } from "mongoose";

const orderSchema = new Schema({
    userEmail: { type: String },
    phone: { type: String },
    province: { type: String },
    city: { type: String },
    street: { type: String },
    postalCode: { type: String },
    cartProducts: { type: Array },
    paid: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false })

export const Order = models?.order || model("order", orderSchema)