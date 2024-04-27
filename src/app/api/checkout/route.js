import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Order } from "@/models/order.model";

export async function POST (req) {
    await mongoose.connect(process.env.MONGO_URL)

    const {userInfo, cartProducts} = await req.json()
    const session = await getServerSession(options)
    const userEmail = session?.user?.email

    const orderDoc = await Order.create({
        userEmail,
        ...userInfo,
        cartProducts,
        paid: false
    })

    return Response.json(`/orders/${orderDoc._id.toString()}?clear-cart=1`)
}