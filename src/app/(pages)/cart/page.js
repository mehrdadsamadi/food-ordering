"use client"
import { useProfile } from "@/app/hooks/useProfile";
import { CartContext, cartProductPrice } from "@/components/AppProviders";
import Alert from "@/components/common/Alert";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { comma } from "@/helpers/comma";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {

    const { user: profileData } = useProfile()

    const [phone, setPhone] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')

    const { cartProducts, removeProductFromCart } = useContext(CartContext)

    useEffect(() => {
        if(typeof window !== undefined) {
            if(window.location.href.includes("canceled=1")) {
                toast.error('پرداخت ناموفق بود، بار دیگر تلاش کنید')
            }
        }
    }, [])

    useEffect(() => {
        setPhone(profileData?.phone || '')
        setProvince(profileData?.province || '')
        setCity(profileData?.city || '')
        setStreet(profileData?.street || '')
        setPostalCode(profileData?.postalCode || '')
    }, [profileData])

    let total = 0;
    for (const p of cartProducts) {
        total += cartProductPrice(p)
    }

    const proceedToCheckout = async (e) => {
        e.preventDefault();

        const userInfo = { phone, province, city, street, postalCode }

        const checkoutPromise = new Promise(async (resolve, reject) => {

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInfo,
                    cartProducts
                })
            })

            const link = await res.json()

            if (res.ok) {
                resolve(link);
                window.location = link
            } else {
                reject()
            } 
        })

        await toast.promise(
            checkoutPromise
            ,
            {
                success: 'درحال آماده سازی پرداخت',
                loading: 'در حال انتقال به صفحه پرداخت ...',
                error: 'مشکلی به وجود آمده، بار دیگر امتحان کنید.',
            }
        )


    }

    return (
        <section className="mt-8">
            <SectionHeaders mainHeader="سبد خرید" />
            {
                cartProducts?.length === 0 ? (
                    <Alert text={"سبد خرید شما خالی است"} />
                ) : (
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div>
                            {
                                cartProducts?.map((product, index) => (
                                    <CartProduct key={index} product={product} onRemove={() => removeProductFromCart(index)}/>
                                ))
                            }
                            <div className="py-2 text-left pl-14">
                                <span className="text-gray-500">
                                    جمع سبد خرید:
                                </span>
                                <span className="font-semibold mr-1">
                                    {comma(total)} تومان
                                </span>
                            </div>
                            <div className="text-left pl-14">
                                <span className="text-gray-500">
                                    هزینه ارسال:
                                </span>
                                <span className="font-semibold mr-1">
                                    {comma("10000")} تومان
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-center border-b pb-2 mb-2 font-semibold">بررسی نهایی</h2>
                            <form onSubmit={proceedToCheckout}>
                                <AddressInputs
                                    addressProps={{ phone, province, city, street, postalCode }}
                                    setAddressProps={{ setPhone, setProvince, setCity, setStreet, setPostalCode }}
                                />
                                <button type="submit" className="rounded-md">پرداخت {comma(total + 10000)} تومان</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </section>
    )
}