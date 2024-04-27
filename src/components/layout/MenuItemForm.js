import { useEffect, useState } from "react";
import EditableImage from "../common/EditableImage";
import MenuItemExtraProps from "./MenuItemExtraProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [menuItemImage, setMenuItemImage] = useState('/placeholders/food-placeholder.png')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [sizes, setSizes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    const fetchCategories = () => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
                menuItem ? setCategory(menuItem.category) : setCategory(data[0]._id)
            })
    }

    useEffect(() => {
        fetchCategories()
        if(menuItem) {
            setMenuItemImage(menuItem?.image || '/placeholders/food-placeholder.png')
            setName(menuItem?.name)
            setDescription(menuItem?.description)
            setBasePrice(menuItem?.basePrice)
            setSizes(menuItem?.sizes || [])
            setIngredients(menuItem?.ingredients || [])
        }
    }, [menuItem])

    const resetState = () => {
        setMenuItemImage('/placeholders/food-placeholder.png')
        setName('')
        setDescription('')
        setBasePrice('')
        setCategory(categories[0]._id)
        setSizes([])
        setIngredients([])
    }

    return (
        <form onSubmit={e => {onSubmit(e, {image: menuItemImage, name, description, basePrice: Number(basePrice), sizes, ingredients, category}), resetState()}} className="mt-8">
            <div
                className="sm:flex items-start gap-4"
            >
                <div >
                    <EditableImage link={menuItemImage} setLink={setMenuItemImage} folder={'menu-items'} />
                </div>
                <div className="grow">
                    <label>نام آیتم در منو</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />

                    <label>توضیحات آیتم</label>
                    <textarea rows="5" value={description} onChange={e => setDescription(e.target.value)} ></textarea>

                    <label>دسته بندی</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {
                            categories?.length > 0 &&
                                categories.map(c => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))
                        }
                    </select>

                    <label>قیمت اولیه آیتم</label>
                    <input type="text" value={basePrice} onChange={e => setBasePrice(e.target.value.replace(',', ''))} />

                    <MenuItemExtraProps extraName='سایز ها' addLabel='ایجاد سایز برای آیتم' props={sizes} setProps={setSizes}/>
                    <MenuItemExtraProps extraName='مخلفات' addLabel='ایجاد مخلفات برای آیتم' props={ingredients} setProps={setIngredients}/>

                    <button type="submit">ذخیره</button>
                </div>

            </div>
        </form>
    )
}