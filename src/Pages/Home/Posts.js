import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Post from './Post';

const Posts = () => {

    const { isLoading, error, data: posts } = useQuery('posts', () =>
        fetch(`http://localhost:5000/post`).then(res =>
            res.json()
        ));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className=' mx-24 sm:px-2'>
            {
                posts.map(post => <Post
                    key={post._id}
                    postDetail={post}
                ></Post>)
            }
        </div>
    );
};

export default Posts;