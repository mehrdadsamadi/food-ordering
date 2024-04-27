import { Category } from "@/models/category.model"
import mongoose from "mongoose"

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const {name} = await req.json()

    if(await isAdmin()) {
        const categoryRes = await Category.create({name})
    
        return Response.json(categoryRes)
    } else {
        return Response.json({})
    }

}

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const {_id, name} = await req.json()

    if(await isAdmin()) {
        await Category.updateOne({_id}, {name})
    
        return Response.json("دسته بندی با موفقیت ویرایش شد.")
    } else {
        return Response.json(null)
    }

}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL)

    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req) {
    await mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    if(await isAdmin()) {
        await Category.deleteOne({_id})
        
        return Response.json("دسته بندی با موفقیت حذف شد.")
    } else {
        return Response.json(null)
    }

}