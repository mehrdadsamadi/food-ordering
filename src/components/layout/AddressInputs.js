export default function AddressInputs({ addressProps, setAddressProps, disabled = false }) {

    const { phone, province, city, street, postalCode } = addressProps
    const { setPhone, setProvince, setCity, setStreet, setPostalCode } = !disabled && setAddressProps
    
    return (
        <>
            <label htmlFor="">شماره موبایل</label>
            <input disabled={disabled} type="tel" placeholder="شماره موبایل" dir="rtl" value={phone} onChange={e => setPhone(e.target.value)} />

            <label htmlFor="">استان</label>
            <input disabled={disabled} type="text" placeholder="استان" value={province} onChange={e => setProvince(e.target.value)} />

            <label htmlFor="">شهر</label>
            <input disabled={disabled} type="text" placeholder="شهر" value={city} onChange={e => setCity(e.target.value)} />

            <div className="flex justify-between gap-2">
                <div>
                    <label htmlFor="">خیابان</label>
                    <input disabled={disabled} type="text" placeholder="خیابان" value={street} onChange={e => setStreet(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="">کد پستی</label>
                    <input disabled={disabled} type="text" placeholder="کد پستی" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </div>
            </div>

        </>

    )
}