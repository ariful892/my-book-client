import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faMessage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const Post = ({ postDetail, refetch }) => {

    const [like, setLike] = useState(false);
    const [comment, seComment] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const { _id, name, post, likes } = postDetail;
    let newLikes = 0;

    if (loading) {
        return <Loading></Loading>
    }

    const handleLike = () => {

        if (!like) {
            newLikes = likes + 1;
            console.log(newLikes)
            setLike(true);
        }
        if (like) {
            newLikes = newLikes - 1;
            console.log(newLikes)
            setLike(false);
        }

        const currentLikes = { likes: likes };

        fetch(`http://localhost:5000/post/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentLikes)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log('data inside useToken', data);

            })
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
                    <div className="avatar ">
                        {user?.photoURL && <div className="w-8 rounded-full">
                            <img src={user?.photoURL} />
                        </div>}
                        {!user?.photoURL && <div className="w-8 rounded-full">
                            <FontAwesomeIcon className='w-6 mr-1' icon={faUser} />
                        </div>}
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
                                <img src={user?.photoURL} alt="" />
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