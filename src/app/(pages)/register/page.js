'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setCreatingUser(true)

        const registerPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            })

            res.ok ? resolve() : reject()
        })

        toast.promise(
            registerPromise,
            {
                loading: 'در حال ثبت نام...',
                success: <div className="my-4 text-center leading-5">
                    ثبت نام انجام شد
                    <br />
                    <Link className="underline text-primary" href={"/login"}>وارد</Link>
                    {" "}
                    شوید.
                </div>,
                error: 'خطایی رخ داده، بعدا امتحان کنید.',
            }
        );

        setCreatingUser(false)
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">ثبت نام</h1>
            
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>

                <input type="email" placeholder="email" disabled={creatingUser}
                    value={email} onChange={e => setEmail(e.target.value)} />

                <input type="password" placeholder="password" disabled={creatingUser}
                    value={password} onChange={e => setPassword(e.target.value)} />

                <button type="submit" disabled={creatingUser}>ثبت نام</button>

                <div className="my-4 text-center text-gray-500">یا ورود با موارد زیر </div>

                <button type="button" onClick={() => signIn("google", { callbackUrl: '/' })} className="flex gap-4 justify-center items-center">
                    <span>Google</span>
                    <Image src={'/icons/google.png'} alt="google" width={24} height={24} />
                </button>
                <div className="text-center my-4 border-t pt-4">
                    حساب کاربری دارید؟
                    {" "}
                    <Link className="underline text-primary" href={"/login"}>وارد شوید</Link>
                </div>
            </form>
        </section>
    )
}