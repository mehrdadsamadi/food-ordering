'use client'

import { useProfile } from "@/app/hooks/useProfile"
import ConfirmBtn from "@/components/common/ConfirmBtn"
import ArrowLeftCircle from "@/components/icons/arrow-left-circle"
import MenuItemForm from "@/components/layout/MenuItemForm"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EditMenuItemPage() {

    const [menuItem, setMenuItem] = useState(null)
    const [isRedirect, setIsRedirect] = useState(false)

    const { loading, user } = useProfile()
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/menu-items/${id}`)
            .then(res => res.json())
            .then(item => {
                setMenuItem(item)
            })
    }, [])

    const handleMenuSubmit = async (e, data) => {
        e.preventDefault();

        data = { _id: id, ...data}

        const updateMenuItemsPromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/menu-items", {
                method: "PUT",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            updateMenuItemsPromise,
            {
                loading: 'در حال ذخیره سازی ...',
                success: 'آیتم در منو با موفقیت ویرایش شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )

        setIsRedirect(true)
    }

    const handleDeleteMenuItem = async () => {
        const delteMenuItemsPromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/menu-items?_id="+id, {
                method: "DELETE",
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            delteMenuItemsPromise,
            {
                loading: 'در حال حذف آیتم ...',
                success: 'آیتم در منو با موفقیت حذف شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )

        setIsRedirect(true)
    }

    if(isRedirect) {
        return redirect("/profile/menu-items")
    }

    if (loading) {
        return 'منتظر بمانید...'
    }

    if (!user?.admin) {
        return "شما دسترسی به این بخش را ندارید."
    }

    return (
        <>
            <div className="mt-8">
                <Link className="button mx-auto !w-fit hover:bg-gray-100" href='/profile/menu-items'>
                    <span>
                        برگشت به منو غذا ها
                    </span>
                    <ArrowLeftCircle />
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleMenuSubmit}/>
            <div className="mt-2 mx-auto max-w-md">
                <div className="max-w-xs mr-auto pr-4">
                    <ConfirmBtn onConfirm={handleDeleteMenuItem}>
                        <span>
                            حذف آیتم از منو 
                        </span>
                    </ConfirmBtn>
                </div>
            </div>
        </>
    )
}