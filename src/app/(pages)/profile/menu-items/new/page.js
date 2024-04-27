'use client'

import { useProfile } from "@/app/hooks/useProfile"
import ArrowLeftCircle from "@/components/icons/arrow-left-circle"
import MenuItemForm from "@/components/layout/MenuItemForm"
import Link from "next/link"
import toast from "react-hot-toast"

export default function NewMenuItemPage() {

    const { loading, user } = useProfile()

    const handleMenuSubmit = async (e, data) => {
        e.preventDefault();

        const saveMenuItemsPromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/menu-items", {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            saveMenuItemsPromise,
            {
                loading: 'در حال ذخیره سازی ...',
                success: 'آیتم در منو با موفقیت ذخیره شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
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
            <MenuItemForm menuItem={null} onSubmit={handleMenuSubmit}/>
        </>
    )
}