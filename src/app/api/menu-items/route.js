import { MenuItem } from "@/models/menuItem.model"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const data = await req.json()

    if (await isAdmin()) {
        const menuItemDoc = await MenuItem.create(data)

        return Response.json(menuItemDoc)
    } else {
        return Response.json({})
    }
}

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const { _id, ...data } = await req.json()

    if (await isAdmin()) {
        await MenuItem.findByIdAndUpdate(_id, data)

        return Response.json("آیتم منو با موفقیت ویرایش شد.")
    } else {
        return Response.json(null)
    }
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL)

    return Response.json(
        await MenuItem.find().populate("category")
    )
}

export async function DELETE(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    if (await isAdmin()) {
        await MenuItem.deleteOne({ _id })
        return Response.json("آیتم از منو با موفقیت حذف شد.")
    } else {
        return Response.json(null)
    }
}