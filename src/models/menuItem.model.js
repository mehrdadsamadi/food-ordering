import { Schema, models, model, Types } from "mongoose";

const extraSchema = new Schema({
    name: { type: String },
    price: { type: Number }
})

const menuItemSchema = new Schema({
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: Types.ObjectId, ref: "category" },
    basePrice: { type: Number },
    sizes: { type: [extraSchema] },
    ingredients: { type: [extraSchema] },
}, { timestamps: true, versionKey: false })

export const MenuItem = models?.menuItem || model("menuItem", menuItemSchema)