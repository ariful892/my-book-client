import React from 'react';
import CreatePost from '../Home/CreatePost';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Post from '../Home/Post';

const Profile = () => {

    const [user, loading, userError] = useAuthState(auth);
    const { isLoading, error, data: posts } = useQuery('posts', () =>
        fetch(`https://lit-wildwood-52199.herokuapp.com/post/${user.email}`).then(res =>
            res.json()
        ));

    if (loading || isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='flex justify-center mt-8'>
            <div>
                <div className="avatar flex justify-center">
                    {user?.photoURL && <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img className='w-24' src={user?.photoURL} alt="" />
                    </div>}
                    {!user?.photoURL && <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                        <FontAwesomeIcon className='w-24 my-8' icon={faUser} />
                    </div>}

                </div>
                <h2 className='text-center font-bold text-xl mt-3'>{user?.displayName}</h2>
                <CreatePost></CreatePost>
                <div className=' mx-24 sm:px-2'>
                    {
                        posts.map(post => <Post
                            key={post._id}
                            postDetail={post}
                        ></Post>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;