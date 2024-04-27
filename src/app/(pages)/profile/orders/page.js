"use client"
import { cartProductPrice } from "@/components/AppProviders"
import ConfirmBtn from "@/components/common/ConfirmBtn"
import Trash from "@/components/icons/trash"
import { comma } from "@/helpers/comma"
import { dbTimeForHuman } from "@/helpers/datetime"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OrdersPage() {

    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = () => {
        setLoadingOrders(true)
        fetch("/api/orders")
            .then(res => res.json())
            .then(ordersData => setOrders(ordersData.reverse()))
            .finally(() => setLoadingOrders(false))
    }

    const getTotalPrice = (order) => {
        return order.cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0)
    }

    if(loadingOrders) {
        return "منتظر بمانید..."
    }

    return (
        <>
            {
                orders?.length > 0 && orders.map(order => (
                    <Link href={'/orders/' + order?._id} key={order?._id} className={`bg-gray-100 rounded-lg mb-2 p-4 grid sm:grid-cols-3 justify-center sm:justify-normal gap-2 sm:gap-0 items-center border ${order.paid ? 'border-green-300' : 'border-red-300'}`}>
                        <div >
                            <div className="text-xs border-b mb-1 pb-1 text-gray-500">
                                {order.cartProducts.map(p => p.name).join(" , ")}
                            </div>
                            {order.userEmail}
                        </div>
                        <div dir="ltr" className="text-center sm:text-left">{dbTimeForHuman(order.createdAt)}</div>
                        <div className="flex items-center justify-center sm:justify-end gap-1">
                            {
                                comma(getTotalPrice(order))
                            }
                            <span>تومان</span>
                            <ConfirmBtn className="p-1 hover:bg-gray-500 hover:text-white w-fit mr-1">
                                <Trash className="w-5 h-5" />
                            </ConfirmBtn>
                        </div>
                    </Link>
                ))
            }
        </>
    )
}