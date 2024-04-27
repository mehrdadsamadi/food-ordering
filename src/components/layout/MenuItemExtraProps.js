"use client"

import { useState } from "react";
import ChevronDown from "../icons/chevronDown";
import ChevronUp from "../icons/chevronUp";
import Plus from "../icons/plus";
import Trash from "../icons/trash";

export default function MenuItemExtraProps({ extraName, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false)

    const addProp = () => {
        setProps(oldProps => {
            return [...oldProps, { name: "", price: 0 }]
        })
    }

    const editProp = (e, index, prop) => {
        const newValue = e.target.value
        setProps(prevProps => {
            const newSizes = [...prevProps]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }

    const removeProp = (index) => {
        setProps(prev => prev.filter((v, i) => i !== index))
    }

    return (
        <div className="bg-gray-200 p-2 rounded-2xl mb-4">
            <button onClick={() => setIsOpen(prev => !prev)} type="button" className="p-1 border-0 justify-start">
                {
                    isOpen ? <ChevronUp /> : <ChevronDown />
                }

                <h3 className="text-gray-700 flex gap-1">
                    {extraName}
                    <span>({props?.length})</span>
                </h3>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} border-t border-t-gray-300 pt-2 mt-2`}>
                {
                    props?.length > 0 &&
                    props.map((size, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div>
                                <label>نام</label>
                                <input className="!bg-gray-50" value={size.name} onChange={e => editProp(e, index, 'name')} type="text" placeholder="نام سایز" />
                            </div>
                            <div>
                                <label>قیمت اضافه</label>
                                <input className="!bg-gray-50" value={size.price} onChange={e => editProp(e, index, 'price')} type="text" placeholder="قیمت سایز" />
                            </div>
                            <div>
                                <button type="button" onClick={() => removeProp(index)} className="bg-white mt-2 px-2">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    ))
                }
                <button type="button" onClick={addProp} className="bg-white border-none items-center">
                    <Plus className="w-5 h-5" />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    )
}