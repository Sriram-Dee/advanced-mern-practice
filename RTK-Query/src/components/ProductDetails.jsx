import { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/api/productsApi";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load product.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">Product not found.</p>
      </div>
    );
  }

  const images =
    product.images?.length > 0 ? product.images : [product.thumbnail];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Product Details
            </p>
            <h1 className="font-semibold text-zinc-900">{product.title}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {/* Product Section */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[480px_1fr]">
            {/* Gallery */}
            <div>
              <div className="sticky top-24">
                <div className="flex gap-4">
                  {/* Thumbnails */}
                  <div className="flex max-h-112.5 flex-col gap-3 overflow-y-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`overflow-hidden rounded-xl border-2 transition ${
                          selectedImage === index
                            ? "border-zinc-900"
                            : "border-zinc-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-16 w-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex flex-1 items-center justify-center rounded-2xl bg-zinc-100 p-6">
                    <img
                      src={images[selectedImage]}
                      alt={product.title}
                      className="max-h-87.5 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {product.category}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-zinc-900">
                {product.title}
              </h2>

              <p className="mt-2 text-zinc-500">Brand: {product.brand}</p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>

                <span className="text-sm text-zinc-500">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <h3 className="text-4xl font-bold text-emerald-600">
                  ${product.price}
                </h3>
              </div>

              {/* Availability */}
              <div className="mt-4">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.availabilityStatus}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 leading-relaxed text-zinc-600">
                {product.description}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Product Info */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-xs text-zinc-500">SKU</p>
                  <p className="mt-1 text-sm font-medium">{product.sku}</p>
                </div>

                <div className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-xs text-zinc-500">Stock</p>
                  <p className="mt-1 text-sm font-medium">{product.stock}</p>
                </div>

                <div className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-xs text-zinc-500">Weight</p>
                  <p className="mt-1 text-sm font-medium">{product.weight} g</p>
                </div>

                <div className="rounded-xl border border-zinc-200 p-4">
                  <p className="text-xs text-zinc-500">Minimum Order</p>
                  <p className="mt-1 text-sm font-medium">
                    {product.minimumOrderQuantity}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="font-medium text-blue-900">Shipping</p>
                  <p className="mt-1 text-sm text-blue-700">
                    {product.shippingInformation}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="font-medium text-emerald-900">Warranty</p>
                  <p className="mt-1 text-sm text-emerald-700">
                    {product.warrantyInformation}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-100 p-4">
                  <p className="font-medium text-zinc-900">Return Policy</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold">Dimensions</h3>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-500">Width</p>
              <p className="mt-1 text-lg font-semibold">
                {product.dimensions?.width} cm
              </p>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-500">Height</p>
              <p className="mt-1 text-lg font-semibold">
                {product.dimensions?.height} cm
              </p>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-500">Depth</p>
              <p className="mt-1 text-lg font-semibold">
                {product.dimensions?.depth} cm
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Customer Reviews</h3>

            <div className="rounded-lg bg-yellow-50 px-4 py-2">
              ⭐ {product.rating} / 5
            </div>
          </div>

          <div className="space-y-4">
            {product.reviews?.length ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{review.reviewerName}</h4>

                      <p className="text-sm text-zinc-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-zinc-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500">
                No reviews available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
