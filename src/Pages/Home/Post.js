import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faMessage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { useState } from 'react';


const Post = ({ postDetail }) => {

    const [like, setLike] = useState(false);
    const [comment, seComment] = useState(false);
    const { picture, name, post } = postDetail;

    const handleLike = () => {
        if (like) {
            setLike(false);
        }
        else {
            setLike(true);
        }
    }

    const handleComment = () => {
        if (comment) {
            seComment(false);
        }
        else {
            seComment(true);
        }
    }

    return (
        <div className=" w-96 bg-base-100 my-8 ">
            <div>
                <div className='flex'>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={picture} />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold ml-2">{name}</h2>
                </div>
                <p className='my-2'>{post}</p>
                <hr />
                <div className='flex justify-between mt-2 mb-4'>
                    <div onClick={handleLike} className={`${like ? 'text-primary' : 'text-black'} flex items-center`}>
                        <FontAwesomeIcon className='w-6 mr-1' icon={faThumbsUp} />
                        <span>Like</span>
                    </div>
                    <div onClick={handleComment} className=' flex  items-center'>
                        <FontAwesomeIcon className='w-6 mr-1' icon={faMessage} />
                        <span>Comment</span>
                    </div>
                </div>

            </div>

            {comment &&
                <div className='flex pt-2 mb-4 sm:px-3 items-center'>
                    <div className=' '>
                        <div className="avatar online mr-5">
                            <div className="w-8 rounded-full">
                                <img src="https://placeimg.com/192/192/people" />
                            </div>
                        </div>
                    </div>
                    <input type="text" placeholder="write a comment" className="input input-bordered input-primary w-full max-w-xs" />

                    <FontAwesomeIcon className='w-6 ml-1' icon={faPaperPlane} />
                </div>
            }

            <div className=' border-t-4 border-gray-700'></div>

        </div>
    );
};

export default Post;