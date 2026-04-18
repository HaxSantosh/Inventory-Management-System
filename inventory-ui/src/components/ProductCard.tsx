import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import type { Category } from "../types/category";

type Props = {
    product: Product;
    categories: Category[];
    onEdit: () => void;
    onDelete: () => void;
};

export default function ProductCard({
    product,
    categories,
    onEdit,
    onDelete,
}: Props) {
    const [i, setI] = useState(0);

    useEffect(() => {
        if (!product.images?.length) return;
        const t = setInterval(() => {
            setI((p) => (p + 1) % product.images.length);
        }, 2000);
        return () => clearInterval(t);
    }, [product.images]);

    const categoryName =
        categories.find((c) => c.id === product.categoryId)?.name || "N/A";

    return (
        <div className="card shadow cursor-pointer border-0 _card">
            <div className="_imgContainer">
                {product.images?.length ? (
                    <img src={product.images[i]} className="_img" />
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100">No Image</div>
                )}

                <div className="_topBar d-flex justify-content-between align-items-center px-2">
                    <span className="_priceTag _headingQty">₹ {product.price}</span>
                    <div className="d-flex gap-1">
                        <button className="btn btn-light btn-sm mr-1 _iconBtn" onClick={onEdit} title="Edit">✏️</button>
                        <button className="btn btn-light btn-sm _iconBtn text-danger" onClick={onDelete} title="Delete">❌</button>
                    </div>
                </div>
            </div>
            <div className="card-body p-2 d-flex flex-column">
                <h6 className="_title px-1">{product.name}</h6>
                <p className="text-muted _desc px-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
                <div className="mt-auto pb-2 d-flex justify-content-between align-items-center">
                    <span className="_category">{categoryName}</span>
                    <span className="_quantity text-primary"><span className="_headingQty">Quantity:</span> {product.quantity}</span>
                </div>
            </div>
        </div>
    );
}