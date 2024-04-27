"use client"

import UserForm from "@/components/layout/UserForm"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ProfilePage() {
    const { status, data } = useSession()

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (status === "authenticated") {

            fetch("/api/profile")
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                });
        }
    }, [status, data])


    if (status === "loading") {
        return "منتظر بمانید..."
    }

    if (status === "unauthenticated") {
        return redirect("/login")
    }

    const handleProfileInfoUpdate = async (e, data) => {
        e.preventDefault();

        const updateProfilePromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            updateProfilePromise,
            {
                loading: 'در حال ذخیره سازی ...',
                success: 'پروفایل با موفقیت آپدیت شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )
    }

    return (
        <UserForm user={user} onSave={handleProfileInfoUpdate}/>
    )
}