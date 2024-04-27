import { MenuItem } from "@/models/menuItem.model";
import mongoose from "mongoose";

export async function GET(_, {params}) {
    await mongoose.connect(process.env.MONGO_URL)
    
    return Response.json(
        await MenuItem.findOne({_id: params.id})
    )
}