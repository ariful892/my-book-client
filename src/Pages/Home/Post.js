import React from 'react';

const Post = () => {
    return (
        <div className='min-h-screen mx-24'>
            <div className='flex  justify-left pt-8 ml-5'>
                <div className=' h-24 '>
                    <div className="avatar online mr-5">
                        <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                </div>
                <textarea type="text" placeholder="What's on your mind?" className="input input-bordered input-success w-full h-20 max-w-xs" />

                <button className="btn btn-success btn-sm ml-5">Post</button>
            </div>
        </div>
    );
};

export default Post;