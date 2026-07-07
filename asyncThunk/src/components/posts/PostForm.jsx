import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPostsError, postsStatus } from '../../features/slices/postSlice';

const PostForm = () => {
    const [postData, setPostData] =  useState({
        title: "",
        body: ""
    })

    const status = useSelector(postsStatus);
    const error = useSelector(getPostsError);

    const dispatch = useDispatch();

    const onPostDataChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
        setPostData({
            title: "",
            body: ""
        });
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 border rounded mb-8'>
            <input type="text" name="title" value={postData.title} onChange={onPostDataChange} className='block w-full p-2 border rounded mb-4' placeholder='Title' />
            <textarea name="body" value={postData.body} onChange={onPostDataChange} className='block w-full p-2 border rounded' rows={3} placeholder='Body' />
            <button type="submit" disabled={status === "loading" || (!postData.title || !postData.body)}className={`mt-4 mx-auto px-4 py-2 text-white rounded ${(status === "loading" || !postData.title || !postData.body) ? "bg-gray-500" : "bg-blue-500"}`}>Create Post</button>
        </form>
    </div>
  )
}

export default PostForm
