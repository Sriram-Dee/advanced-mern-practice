import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { allPosts, updatePost } from '../../features/slices/postSlice';

const PostItem = () => {

    const [postData, setPostData] =  useState({
        title: "",
        body: ""
    })
    const { id } = useParams();

    const post = useSelector(allPosts).find((post) => post.id === parseInt(id));

    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [id])
    const savePost = () => {
        dispatch(updatePost(postData));
        setIsEditing(false);
    }

    const onPostDataChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
  return (
    <div>
      {post && (
        <>
        <form className='max-w-2xl mx-auto p-4 border rounded mb-8'>
            <input type="text" name="title" value={postData.title} onChange={onPostDataChange} readOnly={!isEditing} className='block w-full p-2 border rounded mb-4' />
            <textarea name="body" value={postData.body} onChange={onPostDataChange} readOnly={!isEditing} className='block w-full p-2 border rounded' rows={10} />
        </form>

        <button onClick={() => !isEditing ? setIsEditing(!isEditing) : savePost()}>{isEditing ? "Save" : "Edit"}</button> <button>Delete</button>
        </>
      )}
    </div>
  )
}

export default PostItem
