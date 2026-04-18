import type { Category } from "../types/category";
import type { ProductForm } from "../types/productForm";

type Props = {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  categories: Category[];
  preview: string[];
  onFileChange: (files: File[]) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function UpsertProductCard({
  form,
  setForm,
  categories,
  preview,
  onFileChange,
  onSubmit,
  onCancel,
  isEdit,
}: Props) {
  return (
    <div className="card p-3 d-flex flex-column justify-content-between _card shadow cursor-pointer">
      <input
        className="form-control mt-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
      />

      <select
        className="form-control mt-2"
        value={form.categoryId}
        onChange={(e) => setForm((p) => ({ ...p, categoryId: +e.target.value }))}
      >
        <option value={0}>Select Category</option>
        {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
      </select>

      <div className="row align-items-center mt-2">
        <div className="col-3"><label className="mb-0">Quantity:</label></div>
        <div className="col-9">
          <input
            type="number"
            className="form-control"
            placeholder="Qty"
            value={form.quantity}
            onChange={(e) =>
              setForm((p) => ({ ...p, quantity: +e.target.value }))
            }
          />
        </div>
      </div>

      <div className="row align-items-center mt-2">
        <div className="col-3"><label className="mb-0">Price:</label></div>
        <div className="col-9">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: +e.target.value }))
            }
          />
        </div>
      </div>

      <input
        className="form-control mt-2"
        type="file"
        multiple
        onChange={(e) =>
          onFileChange(Array.from(e.target.files || []))
        }
      />

      <div>
        {preview.length > 0 && preview.map((img) => (
          <img className="_previewImage px-1" src={img} />
        ))}
      </div>

      <div className="d-flex gap-1 w-100 justify-content-center">
        <button className="btn btn-primary btn-sm w-100" onClick={onSubmit}>
          {isEdit ? "Update" : "Add New Product"}
        </button>
        <button className="btn btn-secondary btn-sm w-100" onClick={onCancel}>
          {isEdit ? "Cancel" : "Reset"}
        </button>
      </div>
    </div>
  );
}