import React, { useEffect, useState } from "react";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
} from "../features/api/postsApi";
import { useGetUsersQuery } from "../features/api/usersApi";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectUser } from "../features/slice/auth";

const PostDetails = () => {
  const { id } = useParams();
  const isCreateMode = !id;
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const [
    createPost,
    {
      isLoading: isCreatingPost,
      isError: isErrorCreatingPost,
      error: errorCreatingPost,
    },
  ] = useCreatePostMutation();

  console.log(errorCreatingPost?.data?.errors)
  const [
    deletePost,
    { isLoading: isDeleting, isError: isErrorDeleting, error: errorDeleting },
  ] = useDeletePostMutation();
  const [
    editPost,
    {
      isLoading: isEditingPost,
      isError: isErrorEditingPost,
      error: errorEditingPost,
    },
  ] = useEditPostMutation();
  const {
    data,
    isLoading: isGettingPost,
    isError: isErrorGettingPost,
    error: errorGettingPost,
  } = useGetPostByIdQuery(id, {
    skip: isCreateMode,
  });
  const post = data?.post || null;
  const user = useSelector(selectUser);
  const isOwner = post?.userId === user._id;
  const isAdmin = useSelector(selectIsAdmin);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  useEffect(() => {
    if (isCreateMode) {
      setIsEditing(true);

      setFormData({
        title: "",
        body: "",
      });
    }
  }, [isCreateMode]);

  if (isLoading || isGettingPost) {
    return <div>Loading...</div>;
  }

  if (isError || isErrorGettingPost) {
    return <div>Error: {error?.message || errorGettingPost?.message}</div>;
  }

  const ifDataChanged = async () => {
    if (post?.title !== formData.title || post?.body !== formData.body) {
      await editPost(formData).unwrap();
      setIsEditing(false);
    }
    return;
  };

  const handleEditBtnClick = async () => {
    //To edit click
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    // to save click
    try {
      await ifDataChanged();
    } catch (error) {
      console.error(error);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-100"
          >
            <ArrowLeft size={18} />
          </button>
          {!isCreateMode && (
            <div>
              <p className="text-xs text-zinc-500">Post Details</p>
              <h1 className="font-medium text-zinc-900">{post.title}</h1>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        {formData && (
          <form className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="
                w-full rounded-xl border border-zinc-300
                px-4 py-3 text-zinc-900
                focus:border-violet-500
                focus:outline-none
                disabled:bg-zinc-50
              "
                />
                {errorCreatingPost && (
                  <p className="text-red-500">
                    {errorCreatingPost.data.errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Content
                </label>
                <textarea
                  rows={4}
                  value={formData.body}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className="
                w-full rounded-xl border border-zinc-300
                px-4 py-3 text-zinc-900
                focus:border-violet-500
                focus:outline-none
                disabled:bg-zinc-50
              "
                />
                {errorCreatingPost && (
                  <p className="text-red-500">
                    {errorCreatingPost.data.errors.body}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              {isCreateMode ? (
                <button
                  type="button"
                  disabled={isCreatingPost}
                  onClick={async () => {
                    try {
                      await createPost(formData).unwrap();
                      navigate("/posts");
                    } catch (err) {
                      console.error("Failed to create post:", err);
                    }
                  }}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Create Post
                </button>
              ) : (
                (isOwner || isAdmin) && (
                  <>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => {
                        deletePost(id);
                      }}
                      className="
                            rounded-xl border border-red-200
                            px-4 py-2 text-red-600
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            "
                    >
                      Delete
                    </button>

                    <button
                      disabled={isEditingPost}
                      type="button"
                      onClick={() => handleEditBtnClick()}
                      className="
              rounded-xl bg-violet-600
              px-5 py-2 text-white
              hover:bg-violet-700
            "
                    >
                      {isEditing
                        ? isEditingPost
                          ? "Saving..."
                          : "Save Changes"
                        : "Edit Post"}
                    </button>
                  </>
                )
              )}
            </div>
          </form>
        )}
      </main>
      {isErrorDeleting && (
        <p className="text-red-400">{errorDeleting?.data?.message}</p>
      )}
      {isErrorEditingPost && (
        <p className="text-red-400">{errorEditingPost?.data?.message}</p>
      )}
    </div>
  );
};

export default PostDetails;
