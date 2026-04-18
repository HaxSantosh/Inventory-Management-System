export default function About() {
  return (
    <div className="container mt-4">

      <div className="text-center mb-5">
        <h2 className="fw-bold">About Inventory System</h2>
        <p className="text-muted">
          A modern solution to manage products, categories, and stock efficiently.
        </p>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <p className="mb-0">
          This Inventory Management System is built using 
          <strong> React (Frontend)</strong> and 
          <strong> .NET Web API (Backend)</strong>.
          It helps businesses track products, manage categories, and maintain stock
          with a simple and intuitive interface.
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-3 text-center">
            <h5 className="fw-semibold">📦 Product Management</h5>
            <p className="text-muted">
              Create, update, and manage products with images, pricing, and quantity.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-3 text-center">
            <h5 className="fw-semibold">🗂 Category Handling</h5>
            <p className="text-muted">
              Organize your products into categories for better structure and filtering.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-3 text-center">
            <h5 className="fw-semibold">⚡ Fast & User Friendly</h5>
            <p className="text-muted">
              Smooth UI with inline editing, instant updates, and responsive design.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-5">
        <h4 className="fw-bold mb-3">Tech Stack</h4>

        <div className="d-flex flex-wrap gap-3">
          <span className="badge bg-primary">React.js</span>
          <span className="badge bg-secondary">TypeScript</span>
          <span className="badge bg-success">.NET Web API</span>
          <span className="badge bg-dark">SQL Server</span>
          <span className="badge bg-info text-dark">Bootstrap</span>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center mt-5 text-muted">
        <small>HaxSantosh@gmail.com © {new Date().getFullYear()} Inventory App</small>
      </div>

    </div>
  );
}