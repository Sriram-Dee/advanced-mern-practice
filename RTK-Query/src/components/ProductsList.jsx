import React, { useMemo } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../features/api/productsApi";
import { selectCategory, selectProductsQuery } from "../features/slice/searchFilterSlice";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct";
import { useNavigate } from "react-router";

const ProductsList = () => {
  const query = useSelector(selectProductsQuery);
  const category = useSelector(selectCategory);

  const { data: products, isLoading, isError } = useGetProductsQuery();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    let filtered = products || [];

    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    return filtered;
  }, [products, query, category]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading products.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black tracking-tight text-zinc-900">
            Products
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage and browse your product catalog
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <SearchProduct />

          <div className="mt-4 text-sm text-zinc-500">
            {filteredProducts.length} products found
          </div>
        </div>

        {/* Products */}
        <ul className="space-y-3">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-20 w-20 rounded-2xl bg-zinc-100 object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {product.title}
                      </h3>

                      <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs capitalize text-zinc-600">
                        {product.category}
                      </span>
                    </div>

                    <p className="max-w-[50ch] mt-1 text-sm text-zinc-500 line-clamp-1">
                      {product.description}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-xl font-bold text-zinc-900">
                        ${product.price}
                      </span>

                      <span className="text-sm text-yellow-600">
                        ⭐ {product.rating}
                      </span>

                      <span
                        className={`text-sm font-medium ${
                          product.stock > 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsList;
