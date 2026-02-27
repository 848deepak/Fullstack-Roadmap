import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice.js";

const ProductsPanel = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Products (Redux + Async)</h3>
        <button className="ghost" onClick={() => dispatch(fetchProducts())}>
          Refresh
        </button>
      </div>

      {status === "loading" && <p className="muted">Loading products...</p>}
      {status === "failed" && <p className="error">{error}</p>}

      {status === "succeeded" && (
        <div className="products-grid">
          {items.map((item) => (
            <article key={item.id} className="product-card">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p className="muted">${item.price}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPanel;
