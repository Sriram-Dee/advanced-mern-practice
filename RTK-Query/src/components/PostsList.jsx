import React, { useEffect, useMemo, useState } from "react";
import {
  selectCategory,
  selectPostsQuery,
} from "../features/slice/searchFilterSlice";
import { useSelector } from "react-redux";
import SearchProduct from "./SearchProduct";
import { Link, useNavigate } from "react-router";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../features/api/postsApi";
import { PlusIcon } from "lucide-react";
import PostAuthor from "./PostAuthor";
import Pagination from "./Pagination";

const PostsList = () => {
  const query = useSelector(selectPostsQuery);
  const category = useSelector(selectCategory);

  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetPostsQuery({
    page,
    limit: 10,
    sort: {
      createdAt: -1,
  },
  query,
}
  );

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const navigate = useNavigate();

  const posts = data?.posts ?? []

  useEffect(()=>{
    if(query){
      setPage(1)
    }
  },[query])
  

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Posts...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error loading posts.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-zinc-900">
              Posts
            </h1>

            <p className="mt-2 text-zinc-500">Manage and browse your Posts</p>
          </div>
          <Link
            to="/posts/create"
            className="w-fit flex items-center gap-2 bg-blue-500 text-zinc-100 hover:bg-blue-600 hover:shadow-lg rounded-2xl px-4 py-2 transition duration-300"
          >
            <PlusIcon size={20} />
            Add Post
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <SearchProduct />

          <div className="mt-4 text-sm text-zinc-500">
            {posts.length} posts found
          </div>
        </div>

        {/* Products */}
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              onClick={() => navigate(`/posts/${post._id}`)}
              className="group cursor-pointer rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-zinc-900">
                        {post.title}
                      </h3>
                    </div>
                    <p className="max-w-[50ch] mt-1 text-sm text-zinc-500 line-clamp-1">
                      {post.body}
                    </p>
                    <PostAuthor prefix={"By"} userId={post.userId} />
                  </div>
                </div>

                <button
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post._id);
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
      {/* Pagination */}
      <Pagination pages={data.totalPages} currentPage={data.page} onPageChange={setPage} />
    </div>
  );
};

export default PostsList;
