import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppProviders";
import MenuItemTile from "./MenuItemTile";
import { comma } from "@/helpers/comma";

export default function MenuItem(items) {
    const { image, name, description, basePrice, sizes, ingredients } = items

    const [showPopup, setShowPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0])
    const [selectedExtras, setSelectedExtras] = useState([])

    const { addToCart } = useContext(CartContext)

    const handleAddToCartButtonClick = () => {
        const hasOptions = sizes.length > 0 && ingredients.length > 0
        if(hasOptions && !showPopup) {
            setShowPopup(true)
            return;
        }

        addToCart(items, selectedSize, selectedExtras)
        setShowPopup(false)
    }

    const handleExtraThingClick = (e, extra) => {
        const checked = e?.target?.checked
        
        if(checked) {
            setSelectedExtras(prev => [...prev, extra])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e._id !== extra._id)
            })
        }
    }

    let selectedPrice = basePrice
    if(selectedSize) {
        selectedPrice +=selectedSize.price
    }
    if(selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price
        }
    }

    return (
        <>
            {
                showPopup && (
                    <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/30 flex items-center justify-center">
                        <div onClick={(e) => e.stopPropagation()} className="bg-white p-2 rounded-lg max-w-md">
                            <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(100vh - 100px)' }}>

                                <Image src={image} alt={name} width={300} height={200} className="mx-auto" />
                                <h2 className="text-lg font-bold text-center">{name}</h2>
                                <p className="text-center text-gray-500 text-sm my-2">{description}</p>
                                {
                                    sizes?.length > 0 && (
                                        <div className="bg-gray-100 rounded-md p-2 mb-2">
                                            <h3 className="text-center text-gray-700 mb-2">سایز را انتخاب کنید</h3>
                                            {
                                                sizes.map(size => (
                                                    <label key={size._id} className="flex items-center bg-gray-200 gap-1 p-4 border rounded-md mb-1">
                                                        <input type="radio" name="size" checked={selectedSize?.name === size?.name} onChange={() => setSelectedSize(size)} />
                                                        <div className="flex items-center gap-2">
                                                            <div>{size.name}</div>
                                                            <div className="text-gray-800 font-bold">{comma(basePrice + size.price)} تومان</div>
                                                        </div>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                {
                                    ingredients?.length > 0 && (
                                        <div className="bg-gray-100 rounded-md p-2">
                                            <h3 className="text-center text-gray-700 mb-2">اضافات را انتخاب کنید</h3>
                                            {
                                                ingredients.map(ingredient => (
                                                    <label key={ingredient._id} className="flex items-center bg-gray-200 gap-1 p-4 border rounded-md mb-1">
                                                        <input type="checkbox" name={ingredient.name} checked={selectedExtras.map(e => e._id).includes(ingredient._id)} onChange={(e) => handleExtraThingClick(e, ingredient)} />
                                                        <div className="flex items-center gap-2">
                                                            <div>{ingredient.name}</div>
                                                            <div className="text-gray-800 font-bold">{comma(ingredient.price)} تومان</div>
                                                        </div>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                <button type="button" onClick={handleAddToCartButtonClick} className="my-2 bg-primary text-white !rounded-md sticky bottom-0">افزودن به سبد خرید {comma(selectedPrice)} تومان</button>
                                <button type="button" onClick={() => setShowPopup(false)} className="!rounded-md">انصراف</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...items} />
        </>
    )
}