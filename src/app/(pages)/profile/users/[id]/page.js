"use client"

import UserForm from "@/components/layout/UserForm"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EditUserPage({params}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isRedirect, setIsRedirect] = useState(false)

    const {id} = params

    useEffect(() => {
        setLoading(true)
        getUser()
    }, [])

    const getUser = () => {
        fetch("/api/users/" + id)
            .then(res => res.json())
            .then(data => setUser(data))
            .finally(() => setLoading(false))
    }

    const handleSaveUserInfo = (e, data) => {
        e.preventDefault();
        
        const updateProfilePromise = new Promise(async (resolve, reject) => {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({...data, _id: id})
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            updateProfilePromise,
            {
                loading: 'در حال ذخیره سازی ...',
                success: 'پروفایل کاربر با موفقیت آپدیت شد.',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )

        setIsRedirect(true)
    }

    if(isRedirect) {
        return redirect("/profile/users")
    }

    if(loading) {
        return "منتظر بمانید..."
    }

    return (
        <div className="mt-8">
            <UserForm user={user} onSave={handleSaveUserInfo}/>
        </div>
    )
}