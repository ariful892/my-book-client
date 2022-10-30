import React from 'react';

const Comments = () => {
    return (
        <div>
            <div className='flex pt-8 sm:px-3'>
                <div className=' '>
                    <div className="avatar online mr-5">
                        <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                </div>
                <input type="text" placeholder="What's on your mind?" className="input input-bordered input-primary w-full h-20 max-w-xs" />

                <button className="btn btn-primary btn-sm ml-5">Post</button>
            </div>
        </div>
    );
};

export default Comments;