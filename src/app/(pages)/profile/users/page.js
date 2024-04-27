"use client"

import { useProfile } from "@/app/hooks/useProfile"
import ConfirmBtn from "@/components/common/ConfirmBtn"
import Edit from "@/components/icons/edit"
import Trash from "@/components/icons/trash"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function UsersPage() {

    const [users, setUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(true)

    const { user, loading } = useProfile()

    const getUsers = () => {
        setUsersLoading(true)
        fetch("/api/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setUsersLoading(false))
    }

    const toggleAdmin = (id, admin) => {
        const toggleAdminPromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/users/"+id, {
                method: "PUT",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({admin})
            })

            getUsers()

            res.ok ? resolve() : reject()
        })

        toast.promise(
            toggleAdminPromise,
            {
                loading: 'در حال ذخیره سازی ...',
                success: 'کاربر با موفقیت آپدیت شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (loading || usersLoading) {
        return 'منتظر بمانید...'
    }

    if (!user?.admin) {
        return "شما دسترسی به این بخش را ندارید."
    }

    return (
        <div className="mt-8">
            {
                users?.length > 0 &&
                users.map(user => (
                    <div key={user?._id} className="bg-gray-100 rounded-lg mb-2 p-2 px-4 flex flex-col md:flex-row items-center">
                        <div className="flex gap-4 grow">
                            <div className="text-gray-900">
                                {
                                    !!user?.name ? (<span>{user.name}</span>) : (<span className="italic">نام ندارد</span>)
                                }
                            </div>
                            <span className="text-gray-500">{user?.email}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <label htmlFor="adminCheckbox" className="button cursor-pointer !py-1 !px-3 text-gray-600 text-sm !gap-1 items-center">
                                <input id="adminCheckbox" type="checkbox" checked={user?.admin} onChange={(e) => toggleAdmin(user?._id, user?.admin || false)} value={user?._id} className="w-4 h-4 cursor-pointer" />
                                <span>ادمین</span>
                            </label>
                            <Link href={'/profile/users/' + user?._id} type="button" className="p-1 border border-gray-300 hover:bg-gray-500 hover:text-white rounded-full">
                                <Edit className="w-5 h-5" />
                            </Link>
                            <ConfirmBtn className="p-1 hover:bg-gray-500 hover:text-white" onConfirm={() => handleDeleteCategory(c._id)}>
                                <Trash className="w-5 h-5" />
                            </ConfirmBtn>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}