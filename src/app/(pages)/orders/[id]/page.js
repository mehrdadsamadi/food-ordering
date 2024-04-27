"use client"
import { CartContext, cartProductPrice } from "@/components/AppProviders";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { comma } from "@/helpers/comma";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {

    const [order, setOrder] = useState(null)
    const [loadingOrders, setLoadingOrders] = useState(true)

    const { id } = useParams()

    const { clearCart } = useContext(CartContext)

    useEffect(() => {
        if (typeof window !== undefined) {
            if (window.location.href.includes("clear-cart=1")) {
                clearCart({ hasToast: false })
            }
        }

        if (id) {
            setLoadingOrders(true)
            fetch("/api/orders?_id=" + id)
                .then(res => res.json())
                .then(orderData => setOrder(orderData))
                .finally(() => setLoadingOrders(false))
        }
    }, [])

    let total = 0;
    if(order) {
        for (const p of order.cartProducts) {
            total += cartProductPrice(p)
        }
    }

    if(loadingOrders) {
        return "منتظر بمانید..."
    }

    return (
        <section className="mx-auto mt-8">
            <SectionHeaders mainHeader="سفارش شما" />

            {
                order && (
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            {order.cartProducts.map(product => (
                                <CartProduct product={product} />
                            ))}
                            <div className="text-left my-2 grid grid-cols-2">
                                <span className="text-gray-500">
                                    جمع سبد خرید:
                                </span>
                                <span className="font-semibold mr-1">
                                    {comma(total)} تومان
                                </span>
                            </div>
                            <div className="text-left grid grid-cols-2">
                                <span className="text-gray-500">
                                    هزینه ارسال:
                                </span>
                                <span className="font-semibold mr-1">
                                    {comma("10000")} تومان
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-center border-b pb-2 mb-2 font-semibold">آدرس ارسالی</h2>
                            <AddressInputs addressProps={...order} disabled={true}/>
                        </div>
                    </div>
                )
            }
        </section>
    )
}