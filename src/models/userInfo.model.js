import { Schema, models, model } from "mongoose";

const userInfoSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phone: {type: String},
    province: {type: String},
    city: {type: String},
    street: {type: String},
    postalCode: {type: String},
}, { timestamps: true,versionKey: false })

export const UserInfo = models?.userInfo || model("userInfo", userInfoSchema)