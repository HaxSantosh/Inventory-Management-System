import { useEffect, useState } from "react";
import { getCounts } from "../api/dashboardApi";
import type { Counts } from "../types/counts";
export default function Home() {

   const [count, setCount] = useState<Counts | null>(null);

  const loadCounts = async() => {
    try {
      const data : Counts = await getCounts();
      setCount(data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    loadCounts();
  },[])

  return (
    <div className="container mt-4">

      <div className="text-center mb-5">
        <h1 className="fw-bold">Inventory Management System</h1>
        <p className="text-muted fs-5">
          Manage your products, categories, and stock efficiently in one place.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3 text-center">
            <h5 className="fw-semibold">📦 Product Management</h5>
            <p className="text-muted">
              Add, update, and track all your products with images, pricing, and quantity.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3 text-center">
            <h5 className="fw-semibold">🗂 Category Organization</h5>
            <p className="text-muted">
              Organize products into categories for better structure and filtering.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100 p-3 text-center">
            <h5 className="fw-semibold">⚡ Fast & Simple UI</h5>
            <p className="text-muted">
              Clean interface with inline editing and smooth user experience.
            </p>
          </div>
        </div>

      </div>

      <div className="row text-center mt-5">
        <div className="col-md-4">
          <h3 className="fw-bold">{count?.productCount}+</h3>
          <p className="text-muted">Products Managed</p>
        </div>

        <div className="col-md-4">
          <h3 className="fw-bold">{count?.categoryCount}+</h3>
          <p className="text-muted">Categories Created</p>
        </div>

        <div className="col-md-4">
          <h3 className="fw-bold">24/7</h3>
          <p className="text-muted">Availability</p>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="fs-5">Start managing your inventory now 🚀</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="/products" className="btn btn-primary">
            Go to Products
          </a>
          <a href="/categories" className="btn btn-outline-secondary">
            Manage Categories
          </a>
        </div>
      </div>

    </div>
  );
}