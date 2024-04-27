"use client"

import Link from "next/link";
import { signOut, useSession } from "next-auth/react"
import { useContext, useState } from "react";
import { CartContext } from "../AppProviders";
import Cart from "../icons/cart";
import Bars from "../icons/bars";

const AuthLinks = ({ status, username }) => {
    return status === "authenticated" ? (
        <>
            <Link href={"/profile"} className="whitespace-nowrap hover:bg-white rounded-lg p-2 w-36 text-center md:p-0">سلام، {username}</Link>
            <button onClick={() => signOut({ redirect: true, callbackUrl: "/login" })} className="bg-primary rounded-full text-white px-8 py-2">خروج</button>
        </>
    ) : (
        <>
            <Link href={'/login'} className="">ورود</Link>
            <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">ثبت نام</Link>
        </>
    )
}

export default function Header() {

    const [navOpen, setNavOpen] = useState(false)

    const { status, data } = useSession()
    const userData = data?.user

    const { cartProducts } = useContext(CartContext)

    let username = userData?.name || userData?.email
    if (username && username.includes(" ")) {
        username = username.split(" ")[0]
    }

    return (
        <header>
            <div className="flex md:hidden justify-between items-center">
                <div className="flex gap-4 items-center">
                    <button className="p-2 w-fit" onClick={() => setNavOpen(prev => !prev)}>
                        <Bars />
                    </button>
                    {
                        status === "authenticated" && (
                            <Link href={"/cart"} className="flex items-center gap-1 relative">
                                <Cart />
                                <span>سبد خرید </span>
                                {
                                    cartProducts?.length > 0 && (
                                        <span className="absolute -top-2 -left-6 bg-primary text-white py-1 px-2 pt-2 rounded-full leading-3">{cartProducts.length}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                </div>
                <Link href={'/'} className="text-primary font-semibold text-2xl">ST PIZZA</Link>
            </div>
            {
                navOpen && (
                    <div onClick={() => setNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col items-center gap-2">
                        <Link className="button bg-white border-none !w-36 !rounded-lg" href={'/'}>خانه</Link>
                        <Link className="button bg-white border-none !w-36 !rounded-lg" href={'/menu'}>منو</Link>
                        <Link className="button bg-white border-none !w-36 !rounded-lg" href={'/#about'}>درباره ما</Link>
                        <Link className="button bg-white border-none !w-36 !rounded-lg" href={'/#contact'}>ارتباط با ما</Link>
                        <AuthLinks status={status} username={username} />
                    </div>
                )
            }
            <div className="hidden md:flex items-center justify-between">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link href={'/'} className="text-primary font-semibold text-2xl">ST PIZZA</Link>
                    <Link href={'/'}>خانه</Link>
                    <Link href={'/menu'}>منو</Link>
                    <Link href={'/#about'}>درباره ما</Link>
                    <Link href={'/#contact'}>ارتباط با ما</Link>
                    {
                        status === "authenticated" && (
                            <Link href={"/cart"} className="flex items-center gap-1 relative">
                                <Cart />
                                <span>سبد خرید </span>
                                {
                                    cartProducts?.length > 0 && (
                                        <span className="absolute -top-2 -left-6 bg-primary text-white py-1 px-2 pt-2 rounded-full leading-3">{cartProducts.length}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    <AuthLinks status={status} username={username} />
                </nav>
            </div>
        </header>
    )
}