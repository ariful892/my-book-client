import React from 'react';
import { useQuery } from 'react-query';

import auth from '../../firebase.init';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Home = () => {

    const { isLoading, error, data: posts, refetch } = useQuery('posts', () =>
        fetch(`http://localhost:5000/post`).then(res =>
            res.json()
        ));

    return (
        <div className='grid justify-center shadow-xl rounded-lg my-2 mx-3 lg:mx-60'>
            <CreatePost
                key={Math.random()}
                refetch={refetch}
            ></CreatePost>
            <Posts></Posts>
        </div>
    );
};

export default Home;