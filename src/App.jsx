import React from "react";
import PostList from "./components/PostList";

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">JSONPlaceholder – Posts</span>
        </div>
      </nav>

      <main className="container py-4">
        <div className="row">
          {/* ancho cómodo y centrado */}
          <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h1 className="h3 mb-0">Publicaciones</h1>
              <span className="text-secondary small">useState • useEffect • fetch</span>
            </div>

            <PostList />
          </div>
        </div>
      </main>
    </div>
  );
}
