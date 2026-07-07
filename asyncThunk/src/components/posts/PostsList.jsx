import React from 'react'
import { allPosts, fetchPosts, getPostsError, postsStatus } from '../../features/slices/postSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import PostForm from './postForm';

const PostsList = () => {
    const navigate = useNavigate();
    const posts = useSelector(allPosts);
    const dispatch = useDispatch();
    const status = useSelector(postsStatus);
    const error = useSelector(getPostsError);
    const handleFetchPosts = () => {
        dispatch(fetchPosts());
    }

    useEffect(() => {
        if (status === 'idle') {
        handleFetchPosts();
    }
    }, [dispatch, status]);
  return (
    <div>

      <PostForm />
      <h1 className="text-4xl my-16 text-center">Posts List</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul className="space-y-4 marker:disc list-inside max-w-2xl mx-auto ">
          {posts.map((post) => (
            <li
              key={post.id}
              className="block p-4 border rounded shadow divide-y divide-gray-200 cursor-pointer hover:border-2 hover:border-amber-400 hover:shadow-lg transition duration-300"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <h2 className="block w-full text-lg">{post.title}</h2>
              <p className='trunk'>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsList
