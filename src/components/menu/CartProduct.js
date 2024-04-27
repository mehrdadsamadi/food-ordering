import Image from "next/image";
import ConfirmBtn from "../common/ConfirmBtn";
import Trash from "../icons/trash";
import { cartProductPrice } from "../AppProviders";
import { comma } from "@/helpers/comma";

export default function CartProduct({ product, onRemove }) {
    return (
        <div className="flex gap-4 items-center border-b py-4">
            <div className="w-24">
                <Image src={product.image} alt={product.name} width={240} height={240} />
            </div>
            <div className="grow">
                <h3 className="font-semibold">
                    {product.name}
                </h3>
                {
                    product.size && (
                        <div className="text-sm">
                            سایز: <span>{product.size.name}</span>
                        </div>
                    )
                }
                {
                    product.extras?.length > 0 && (
                        <div className="text-sm text-gray-500">
                            {
                                product.extras.map((extra, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <span>
                                            {extra.name}
                                        </span>
                                        <span>
                                            {comma(extra.price)}
                                        </span>
                                        <span>
                                            ت
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="flex items-center gap-1">
                <div>
                    {comma(cartProductPrice(product))}
                </div>
                <span className="text-sm text-gray-500 font-normal">تومان</span>
            </div>
            {
                !!onRemove && (
                    <div className="mr-2">
                        <ConfirmBtn className="p-2" onConfirm={onRemove}>
                            <Trash className="w-5 h-5" />
                        </ConfirmBtn>
                    </div>
                )
            }
        </div>
    )
}