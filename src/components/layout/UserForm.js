import { useEffect, useState } from "react";
import EditableImage from "../common/EditableImage";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {

    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [province, setProvince] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [avatar, setAvatar] = useState('/placeholders/user-placeholder.jpg')

    useEffect(() => {
        setUsername(user?.name || '')
        setPhone(user?.phone || '')
        setProvince(user?.province || '')
        setCity(user?.city || '')
        setStreet(user?.street || '')
        setPostalCode(user?.postalCode || '')
        setAvatar(user?.image || '/placeholders/user-placeholder.jpg')
    }, [user])

    return (
        <div className="flex gap-4">
            <div className="p-2 relative max-w-[200px] max-h-[200px] hidden sm:block">
                <EditableImage link={avatar} setLink={setAvatar} />
            </div>

            <form
                onSubmit={(e) => onSave(e, { name: username, image: avatar, phone, province, city, street, postalCode })}
                className="grow"
            >
                <label htmlFor="">نام و نام خانوادگی</label>
                <input type="text" placeholder="نام و نام خانوادگی" value={username} onChange={e => setUsername(e.target.value)} />

                <label htmlFor="">ایمیل</label>
                <input type="email" placeholder="ایمیل" value={user?.email} disabled />

                <AddressInputs
                    addressProps={{phone, province, city, street, postalCode}}
                    setAddressProps={{setPhone, setProvince, setCity, setStreet, setPostalCode}}
                />
                <button type="submit">ذخیره</button>
            </form>
        </div>
    )
}