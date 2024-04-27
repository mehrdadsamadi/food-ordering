"use client"
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice
    if(cartProduct.size) {
        price += cartProduct.size.price
    }
    if(cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price
        }
    }
    return price
}

export default function AppProviders({ children }) {

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if(localStorage.getItem('cart')) {
            setCartProducts(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    const clearCart = ({hasToast = true}) => {
        setCartProducts([])
        saveCartProductsToLocalStorage([])
        if(hasToast) {
            toast.success("سبد خرید با موفقیت پاک شد")
        }
    }

    const removeProductFromCart = (index) =>{
        setCartProducts(prevProducts => {
            const newCartProducts = prevProducts.filter((p, i) => i !== index)

            saveCartProductsToLocalStorage(newCartProducts)

            return newCartProducts
        })

        toast.success("محصول با موفقیت از سبد خرید حذف شد")
    }

    const saveCartProductsToLocalStorage = (cartProducts) => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }

    const addToCart = (product, size = null, extras = []) => {
        let p = JSON.parse(JSON.stringify(product));
        delete p.sizes
        delete p.ingredients

        setCartProducts(prevProducts => {
            const cartProduct = {...p, size, extras}
            const newProducts = [...prevProducts, cartProduct]
            saveCartProductsToLocalStorage(newProducts)
            return newProducts
        })
        toast.success("محصول با موفقیت به سبد خرید افزوده شد")
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                clearCart,
                removeProductFromCart
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}