import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title text-primary mb-2">
          {post.title}
        </h2>
        <p className="card-text text-secondary clamp-2">
          {post.body}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="badge text-bg-light">Post #{post.id}</span>
          <a
            className="btn btn-sm btn-outline-primary"
            href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Ver detalle
          </a>
        </div>
      </div>
    </div>
  );
}
