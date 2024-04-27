import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Order } from "@/models/order.model";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url)
    
    const orderId = url.searchParams.get("_id")
    if(orderId) {
        return Response.json(await Order.findById(orderId))
    }
    
    const {user : {email}} = await getServerSession(options)

    if(email) {

        if(await isAdmin()) {
            return Response.json(await Order.find())
        }

        return Response.json(await Order.find({userEmail : email}))
    }

}