import { useState } from "react"

export default function ConfirmBtn({ children, onConfirm, className }) {
    const [showConfirm, setShowConfirm] = useState(false)

    if (showConfirm) {
        return (
            <div className="fixed bg-black/30 inset-0 flex items-center justify-center h-full">
                <div className="w-72 bg-white p-4 rounded-lg">
                    <div className="text-center">برای حذف مطمعن هستید؟</div>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setShowConfirm(false)} className="border-gray-200 hover:border-gray-300">انصراف</button>
                        <button type="button" onClick={() => { onConfirm(); setShowConfirm(false) }} className="bg-primary text-white border-none">حذف</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button className={className} onClick={() => setShowConfirm(true)} type="button">{children}</button>
    )
}