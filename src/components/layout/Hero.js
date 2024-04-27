import Image from "next/image";
import ArrowLeftCircle from "../icons/arrow-left-circle";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero mt-4 mb-4 md:mb-0">
            <div className="md:py-12 text-center md:text-start">
                <h1 className="text-4xl font-semibold">همه چیز<br />بهتر میشه با<br />یک <span className="text-primary">پیتزا</span></h1>
                <p className="my-6 text-gray-500 text-sm">پیتزا همون تیکه گمشده هست که هر روز رو کامل میکنه ، یکی از همون چیزای خوشمزه کمی که برامون تو زندگی مونده</p>
                <div className="flex gap-4 text-sm justify-center md:justify-start">
                    <button className="bg-primary w-fit text-white flex items-center gap-2 px-4 py-2 rounded-full">
                        ثبت سفارش
                        <ArrowLeftCircle />
                    </button>
                    <Link href={''} className="py-2 text-gray-600 font-semibold">توضیحات</Link>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/icons/pizza.png'} alt={'pizza'} layout="fill" objectFit="contain" />
            </div>
        </section>
    )
}