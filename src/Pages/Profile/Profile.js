import React from 'react';
import CreatePost from '../Home/CreatePost';

const Profile = () => {
    return (
        <div className='flex justify-center mt-8'>
            <div>
                <div className="avatar flex justify-center">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src="https://placeimg.com/192/192/people" />
                    </div>
                </div>
                <h2 className='text-center font-bold text-xl mt-3'>Ariful Islam</h2>
                <CreatePost></CreatePost>
            </div>
        </div>
    );
};

export default Profile;