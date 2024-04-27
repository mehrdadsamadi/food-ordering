import { Schema, models, model } from "mongoose";

const categorySchema = new Schema({
    name: {type: String, required: true}
}, { timestamps: true,versionKey: false })

export const Category = models?.category || model("category", categorySchema)