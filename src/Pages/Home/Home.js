import React from 'react';

import auth from '../../firebase.init';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Home = () => {



    return (
        <div className='grid justify-center shadow-xl rounded-lg my-2 mx-3 lg:mx-60'>
            <CreatePost></CreatePost>
            <Posts></Posts>
        </div>
    );
};

export default Home;