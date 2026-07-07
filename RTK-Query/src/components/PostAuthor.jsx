import React from 'react'
import { useGetUsersQuery } from '../features/api/usersApi';

const PostAuthor = ({prefix, userId}) => {
    
    const {data:users, isLoading, isError, error} = useGetUsersQuery();    
    const author = users?.find((user) => user._id === userId);
    if (isLoading) return <p>Loading author...</p>;
    if (isError) return <p>Unknown author</p>;
  return (
    <p className='text-sm text-zinc-500 mt-4'>{prefix} {author?.name}</p>
  )
}
//memoize the component
export default React.memo(PostAuthor);