'use client'

import { useProfile } from "@/app/hooks/useProfile"
import Alert from "@/components/common/Alert"
import ArrowLeftCircle from "@/components/icons/arrow-left-circle"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MenuPage() {

    const [menuItems, setMenuItems] = useState([])
    const [orderedMenuItems, setOrderedMenuItems] = useState({})
    const [loadingData, setLoadingData] = useState(false)

    const { loading, user } = useProfile()

    useEffect(() => {
        setLoadingData(true)

        fetch('/api/menu-items')
            .then(res => res.json())
            .then(items => {
                setMenuItems(items)

                let ordered = {}
                items.map(item => {
                    if (!ordered[item?.category?.name]) {
                        ordered[item?.category?.name] = []
                    }
                    ordered[item?.category?.name]?.push(item)
                })

                delete ordered['undefined']
                setOrderedMenuItems(ordered)

                setLoadingData(false)
            })
    }, [])

    if (loading || loadingData) {
        return 'منتظر بمانید...'
    }

    if (!user?.admin) {
        return "شما دسترسی به این بخش را ندارید."
    }

    return (
        <>
            <div className="mt-8">
                <Link className="button mx-auto !w-fit hover:bg-gray-100" href='/profile/menu-items/new'>
                    <span>
                        ایجاد آیتم جدید
                    </span>
                    <ArrowLeftCircle />
                </Link>
            </div>
            <div className="mt-8">
                <h2 className="text-sm text-gray-500 mb-2">ویرایش آیتم منو:</h2>
                {
                    menuItems?.length === 0 && (
                        <Alert text={"آیتمی برای نمایش ایجاد نشده است"} />
                    )
                }
                {
                    Object.keys(orderedMenuItems).length > 0 &&
                    Object.keys(orderedMenuItems).map((catName, index) => (
                        <div className="mt-4" key={index}>
                            <h3 className="mb-1"> {catName}</h3>
                            <div className="grid md:grid-cols-3 grid-cols-2 gap-1">
                                {
                                    orderedMenuItems[catName].map(item => (
                                        <Link
                                            href={'/profile/menu-items/edit/' + item._id}
                                            key={item._id}
                                            className="button !justify-start items-center !border-gray-200 hover:!border-gray-300 bg-gray-200 !rounded-xl"
                                        >
                                            <div className="relative">
                                                <Image className="rounded-full h-[50px]" src={item.image} alt={item.name} width={50} height={50} />
                                            </div>
                                            <span>{item.name}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}