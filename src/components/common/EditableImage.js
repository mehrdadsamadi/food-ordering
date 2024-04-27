"use client"

import Image from "next/image"
import toast from "react-hot-toast"

export default function EditableImage({ link, setLink, folder = 'avatars' }) {
    const handleFileUpload = async (e) => {
        const files = e.target.files
        if (files.length > 0) {

            const data = new FormData()
            data.append("file", files[0])

            const fileUploadPromise = new Promise(async (resolve, reject) => {
                const res = await fetch(`/api/upload?folder=${folder}`, {
                    method: "POST",
                    body: data
                })

                res.ok ? resolve(res) : reject()
            })

            toast.promise(
                fileUploadPromise,
                {
                    loading: 'در حال آپلود ...',
                    success: 'با موفقیت آپلود شد.',
                    error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
                }
            )
                .then(res => res.json())
                .then(linkPath => {
                    setLink(linkPath)
                })

        }
    }

    return (
        <>
            {
                link && (
                    <Image src={link} alt="avatar" className="rounded-lg w-full h-full mb-1" quality={100} width={120} height={120} />
                )
            }
            <label className="">
                <input type="file" className="hidden" onChange={handleFileUpload} />
                <span className="border border-gray-300 cursor-pointer block p-2 text-center text-gray-900 rounded-lg">ویرایش تصویر</span>
            </label>
        </>
    )
}