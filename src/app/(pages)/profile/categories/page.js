'use client'

import { useProfile } from "@/app/hooks/useProfile"
import Alert from "@/components/common/Alert"
import ConfirmBtn from "@/components/common/ConfirmBtn"
import Edit from "@/components/icons/edit"
import Trash from "@/components/icons/trash"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function CategorisPage() {

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [editingCategory, setEditingCategory] = useState(null)
    const [catLoading, setCatLoading] = useState(true)

    const { user, loading } = useProfile()

    useEffect(() => {
        setCatLoading(true)
        fetchCategories()
    }, [])

    const resetStates = () => {
        setCategoryName("")
        setEditingCategory(null)
    }

    const fetchCategories = () => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setCatLoading(false))
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        const createCategoryPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editingCategory) {
                data._id = editingCategory._id
            }

            const res = await fetch("/api/categories", {
                method: editingCategory ? "PUT" : "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            resetStates()
            fetchCategories()
            res.ok ? resolve() : reject()
        })

        await toast.promise(
            createCategoryPromise,
            {
                loading: editingCategory ? 'در حال ویرایش ...' : 'در حال ایجاد ...',
                success: editingCategory ? 'با موفقیت ویرایش شد.' : 'با موفقیت ایجاد شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
    }

    const handleDeleteCategory = async (_id) => {
        const deleteCategoryPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/categories?_id=" + _id, {
                method: "DELETE"
            })
            res.ok ? resolve() : reject()
        })

        await toast.promise(
            deleteCategoryPromise,
            {
                loading: 'در حال حذف دسته بندی ...',
                success: 'با موفقیت حذف شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )

        fetchCategories()
    }

    if (loading || catLoading) {
        return 'منتظر بمانید...'
    }

    if (!user?.admin) {
        return "شما دسترسی به این بخش را ندارید."
    }

    return (
        <>
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex items-end gap-2">
                    <div className="grow">
                        <label>نام دسته بندی</label>
                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                    </div>
                    <div className="pb-4 flex gap-2" >
                        <button type="submit">{editingCategory ? 'ویرایش' : 'ایجاد'}</button>
                        {
                            editingCategory && (
                                <button onClick={resetStates} type="button">انصراف</button>
                            )
                        }
                    </div>
                </div>
            </form>
            <div className="mt-8">
                <h2 className="text-sm text-gray-500 mb-1">دسته بندی های موجود:</h2>
                {
                    categories?.length === 0 && (
                        <Alert text={"دسته بندی برای نمایش ایجاد نشده است"}/>
                    )
                }
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1">
                    {
                        categories.length > 0 &&
                        categories.map((c) => (
                            <div
                                key={c._id}
                                className="flex justify-between items-center bg-gray-200 rounded-xl py-2 px-4"
                            >
                                <span>{c.name}</span>
                                <div className="flex gap-1 items-center">
                                    <button onClick={() => {
                                        setEditingCategory(c);
                                        setCategoryName(c.name)
                                    }} type="button" className="p-1 hover:bg-gray-500 hover:text-white">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <ConfirmBtn className="p-1 hover:bg-gray-500 hover:text-white" onConfirm={() => handleDeleteCategory(c._id)}>
                                        <Trash className="w-5 h-5" />
                                    </ConfirmBtn>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}