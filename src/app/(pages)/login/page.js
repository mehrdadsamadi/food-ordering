"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {signIn} from "next-auth/react"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoginInProgress(true)

        await signIn('credentials', {email, password, callbackUrl:'/'})

        setLoginInProgress(false)
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">ورود</h1>

            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" disabled={loginInProgress}
                    value={email} onChange={e => setEmail(e.target.value)} />

                <input type="password" name="password" placeholder="password" disabled={loginInProgress}
                    value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={loginInProgress}>ورود</button>

                <div className="my-4 text-center text-gray-500">یا ورود با موارد زیر </div>

                <button type="button" onClick={() => signIn("google", {callbackUrl: '/'})} className="flex gap-4 justify-center items-center">
                    <span>Google</span>
                    <Image src={'/icons/google.png'} alt="google" width={24} height={24} />
                </button>
                <div className="text-center my-4 border-t pt-4">
                    حساب کاربری ندارید؟
                    {" "}
                    <Link className="underline text-primary" href={"/register"}>ثبت نام کنید</Link>
                </div>

            </form>
        </section>
    )
}