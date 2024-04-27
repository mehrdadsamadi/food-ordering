import User from "@/models/user.model"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL)

    if(await isAdmin()) {
        return Response.json(
            await User.find()
        )
    } else {
        return Response.json([])
    }
}