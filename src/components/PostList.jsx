import React, { useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10); // 5, 10, 20
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (alive) setPosts(data);
      } catch (e) {
        if (alive) setError(e.message || "Error desconocido");
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  // Filtrado por texto
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
    );
  }, [posts, query]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  useEffect(() => {
    // si cambias el query o pageSize, vuelve a página 1
    setPage(1);
  }, [query, pageSize]);

  if (loading) {
    return (
      <div className="row g-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="col-12 col-md-6" key={i}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="placeholder-glow">
                  <span className="placeholder col-8 mb-2"></span>
                  <span className="placeholder col-10 mb-2"></span>
                  <span className="placeholder col-6"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error al cargar publicaciones: <strong>{error}</strong>
      </div>
    );
  }

  return (
    <>
      {/* Controles */}
      <div className="d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between mb-3">
        <div className="input-group" style={{ maxWidth: 420 }}>
          <span className="input-group-text">Buscar</span>
          <input
            className="form-control"
            placeholder="título o contenido…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          <label className="text-secondary small">Por página</label>
          <select
            className="form-select form-select-sm"
            style={{ width: 96 }}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <span className="text-secondary small ms-2">
            {filtered.length} resultados
          </span>
        </div>
      </div>

      {/* Lista */}
      {current.length === 0 ? (
        <div className="alert alert-warning">No hay publicaciones.</div>
      ) : (
        <div className="row g-3">
          {current.map((post) => (
            <div className="col-12 col-md-6" key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      <nav className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={safePage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ← Anterior
        </button>

        <span className="text-secondary">
          Página {safePage} de {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={safePage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Siguiente →
        </button>
      </nav>
    </>
  );
}
