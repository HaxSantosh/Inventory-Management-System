import { useEffect, useMemo, useState } from "react";
import {getCategories, createCategory, updateCategory, deleteCategory} from "../api/categoryApi";
import type { Category } from "../types/category";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  // Load categories
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data: Category[] = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error loading categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Sorted categories - DESC by id
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.id - a.id);
  }, [categories]);

  // Add category
  const handleAdd = async () => {
    if (!newName.trim()) return;
    await createCategory({ name: newName });
    setNewName("");
    loadCategories();
  };

  // Delete category
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  // Start editing only one row allowed
  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Update category
  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;
    await updateCategory(id, { name: editingName });
    setEditingId(null);
    setEditingName("");
    loadCategories();
  };

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Categories</h3>

      {/* ================= TOP ROW (ADD CATEGORY) ================= */}
      <div className="row mb-3">
        <div className="col-11">
          <input
            className="form-control"
            placeholder="Enter category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>

        <div className="col-1">
          <button className="btn btn-success w-100" onClick={handleAdd}>Add</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {/* ================= LIST ================= */}
      <div className="list-group">
        {!loading && sortedCategories.length === 0 && (
          <div className="list-group-item text-muted">No categories found</div>
        )}

        {sortedCategories.map((c) => {
          const isEditing = editingId === c.id;

          return (
            <div
              key={c.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="flex-grow-1">
                {isEditing ? (
                  <input
                    className="form-control"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  <span>{c.name}</span>
                )}
              </div>

              <div className="d-flex gap-2 ms-3">
                {isEditing ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(c.id)}
                    >
                      Update
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={editingId !== null}
                      onClick={() => handleEdit(c)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}