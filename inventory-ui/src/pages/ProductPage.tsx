import { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImages } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import type { Product } from "../types/product";
import type { Category } from "../types/category";
import type { ProductForm } from "../types/productForm";
import ProductCard from "../components/ProductCard";
import UpsertProductCard from "../components/UpsertProductCard";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // ADD STATE
  const [addForm, setAddForm] = useState<ProductForm>({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
  });
  const [addFiles, setAddFiles] = useState<File[]>([]);
  const [addPreview, setAddPreview] = useState<string[]>([]);

  // EDIT STATE
  const [editForm, setEditForm] = useState<ProductForm>({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
  });
  const [editFiles, setEditFiles] = useState<File[]>([]);
  const [editPreview, setEditPreview] = useState<string[]>([]);

  // LOAD
  const loadData = async () => {
    const prod = await getProducts();
    const cat = await getCategories();
    setProducts(prod);
    setCategories(cat);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADD
  const handleAdd = async () => {
    const images = await uploadProductImages(addFiles);
    await createProduct({ ...addForm, images });

    setAddForm({ name: "", price: 0, quantity: 0, categoryId: 0 });
    setAddFiles([]);
    setAddPreview([]);
    loadData();
  };

  // EDIT START
  const startEdit = (p: Product) => {
    setEditId(p.id);

    setEditForm({
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      categoryId: p.categoryId,
    });

    setEditPreview(p.images || []);
    setEditFiles([]);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editId) return;

    const images = await uploadProductImages(editFiles);

    await updateProduct(editId, {
      ...editForm,
      images,
    });

    setEditId(null);
    loadData();
  };

  // DELETE
  const handleDelete = async (id: number) => {
    if (!confirm("Delete product?")) return;
    await deleteProduct(id);
    loadData();
  };

  return (
    <div className="d-flex flex-wrap gap-3 mt-3">
      {/* ADD CARD */}
      <UpsertProductCard
        form={addForm}
        setForm={setAddForm}
        categories={categories}
        preview={addPreview}
        onFileChange={(files) => {
          setAddFiles(files);
          setAddPreview(files.map((f) => URL.createObjectURL(f)));
        }}
        onSubmit={handleAdd}
        onCancel={() => {
          setAddForm({ name: "", price: 0, quantity: 0, categoryId: 0 });
          setAddFiles([]);
          setAddPreview([]);
        }}
      />

      {/* PRODUCTS */}
      {products.map((p) =>
        editId === p.id ? (
          <UpsertProductCard
            key={p.id}
            form={editForm}
            setForm={setEditForm}
            categories={categories}
            preview={editPreview}
            onFileChange={(files) => {
              setEditFiles(files);
              setEditPreview(files.map((f) =>
                URL.createObjectURL(f)
              ));
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditId(null)}
            isEdit
          />
        ) : (
          <ProductCard
            key={p.id}
            product={p}
            categories={categories}
            onEdit={() => startEdit(p)}
            onDelete={() => handleDelete(p.id)}
          />
        )
      )}
    </div>
  );
}