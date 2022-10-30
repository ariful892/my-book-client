import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Post from './Post';

const Posts = () => {

    const { isLoading, error, data: posts, refetch } = useQuery('posts', () =>
        fetch(`https://lit-wildwood-52199.herokuapp.com/post`).then(res =>
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
                    refetch={refetch}
                ></Post>)
            }
        </div>
    );
};

export default Posts;