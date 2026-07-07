import React, { useEffect, useState } from "react";
import {
  selectPostsQuery,
  selectProductsQuery,
  setCategory,
  setPostsQuery,
  setProductsQuery,
} from "../features/slice/searchFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../features/api/productsApi";
import { CircleXIcon, Search } from "lucide-react";
import { useLocation } from "react-router";

const SearchProduct = () => {
  const { data: products } = useGetProductsQuery();

  const isProductsPage = !Boolean(useLocation().pathname.split("/")[1]);

  const productsQuery = useSelector(selectProductsQuery);
  const postsQuery = useSelector(selectPostsQuery);
  const dispatch = useDispatch();

  const categories = products
    ? [...new Set(products.map((p) => p.category))]
    : [];

  const searchQuery = isProductsPage ? productsQuery : postsQuery;

  const [searchInputvalue, setQuery] = useState(searchQuery);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isProductsPage) {
        dispatch(setProductsQuery(searchInputvalue));
      } else {
        dispatch(setPostsQuery(searchInputvalue));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInputvalue, dispatch, isProductsPage]);

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          value={searchInputvalue}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={`Search ${isProductsPage ? "products" : "posts"}..`}
          className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 outline-none transition focus:border-zinc-900"
        />
        {searchInputvalue && (
          <CircleXIcon
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer transition hover:text-red-500"
            onClick={() => setQuery("")}
          />
        )}
      </div>

      {/* Category */}
      {isProductsPage && (
        <select
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};;

export default SearchProduct;
