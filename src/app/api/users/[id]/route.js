import User from "@/models/user.model";
import { UserInfo } from "@/models/userInfo.model";
import mongoose from "mongoose";

export async function GET(_, {params}) {
    await mongoose.connect(process.env.MONGO_URL)

    const {id} = params

    const user = await User.findOne({ _id:id }).lean()
    const userInfo = await UserInfo.findOne({ email: user.email }).lean()

    return Response.json({ ...user, ...userInfo })
}

export async function PUT(req, {params}) {
    await mongoose.connect(process.env.MONGO_URL)
    
    const {admin} = await req.json()
    const {id} = params

    await User.updateOne({ _id:id }, {admin: !admin})

    return Response.json("کاربر با موفقیت ادمین شد.")
}