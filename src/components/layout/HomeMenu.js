"use client"

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {

    const [bestSelles, setBestSelles] = useState([])

    useEffect(() => {
        fetch("/api/menu-items")
            .then(res => res.json())
            .then(data => {
                setBestSelles(data.slice(-3))
            })
    }, [])

    return (
        <section className="">
            <div className="relative">
                <div className="absolute -top-28 left-0 -z-10">
                    <Image src={'/icons/sallad1.png'} alt="sallad" width={109} height={189} />
                </div>
            </div>
            <SectionHeaders subHeader={'بررسی'} mainHeader={'محبوب ترین ها'}/>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    bestSelles?.length > 0 &&
                        bestSelles.map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))
                }
            </div>
        </section>
    )
}