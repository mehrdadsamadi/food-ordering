"use client"
import SectionHeaders from "@/components/layout/SectionHeaders"
import MenuItem from "@/components/menu/MenuItem"
import { useEffect, useState } from "react"

export default function MenuPage() {

    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        fetch("/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data))

        fetch("/api/menu-items")
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .finally(() => setLoading(false))

    }, [])

    if (loading) {
        return "منتظر بمانید..."
    }

    return (
        <section className="mt-8">
            {
                categories?.length > 0 &&
                categories.map(c => (
                    <div key={c._id}>
                        <SectionHeaders mainHeader={c.name} />
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mb-12">
                            {
                                menuItems?.length > 0 &&
                                menuItems.filter(m => m.category._id === c._id).map(item => (
                                    <MenuItem key={item._id} {...item} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </section>
    )
}