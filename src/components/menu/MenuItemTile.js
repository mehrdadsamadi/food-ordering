import { comma } from "@/helpers/comma";
import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, description, name, basePrice, sizes, ingredients } = item

    const hasSizesOrExtras = sizes?.length > 0 || ingredients?.length > 0

    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-gray-100 hover:shadow-md hover:shadow-black/10 transition-all">
            <div className="text-center">
                <Image src={image} alt="pizza" className="block mx-auto" width={200} height={200} />
            </div>
            <h4 className="font-semibold my-3 text-xl">{name}</h4>
            <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
            <button onClick={onAddToCart} className="bg-primary text-white rounded-full px-8 py-2 mt-4">
                {
                    hasSizesOrExtras ? (
                        <span>
                            از {comma(basePrice)} تومان
                        </span>
                    ) : (
                        <span>
                            {comma(basePrice)} تومان
                        </span>
                    )
                }
            </button>
        </div>
    )
}