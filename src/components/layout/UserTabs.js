'use client'

import { useProfile } from "@/app/hooks/useProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs() {

    const {user, loading} = useProfile()

    const path = usePathname()

    if(loading) {
        return 'منتظر بمانید...'
    }

    return (
        <div className="flex justify-center gap-2 tabs flex-wrap">
            <Link className={path === "/profile" ? 'active' : ''} href={'/profile'}>پروفایل</Link>
            <Link className={path === "/profile/orders" ? 'active' : ''} href={'/profile/orders'}>سفارشات</Link>
            {
                user?.admin && (
                    <>
                        <Link className={path === "/profile/categories" ? 'active' : ''} href={'/profile/categories'}>دسته بندی ها</Link>
                        <Link className={path.includes('menu-items') ? 'active' : ''} href={'/profile/menu-items'}>منو غذا ها</Link>
                        <Link className={path.includes('users') ? 'active' : ''} href={'/profile/users'}>کاربران</Link>
                    </>
                )
            }
        </div>
    )
}