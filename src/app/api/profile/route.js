import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import User from "@/models/user.model"
import { UserInfo } from "@/models/userInfo.model"

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL)
    
    const { _id, name, image, ...otherUserInfo } = await req.json()

    let query = {}

    if (_id) {
        query = {_id}
    } else {
        const { user } = await getServerSession(options)
        const email = user.email
        query= {email}
    }
    const user = await User.findOneAndUpdate(query, { name, image })
    await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true })

    return Response.json("پروفایل با موفقیت آپدیت شد.")
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL)

    const session = await getServerSession(options)
    const email = session?.user?.email

    if (!email) {
        return Response.json({})
    }

    const user = await User.findOne({ email }).lean()
    const userInfo = await UserInfo.findOne({ email }).lean()

    return Response.json({ ...user, ...userInfo })
}