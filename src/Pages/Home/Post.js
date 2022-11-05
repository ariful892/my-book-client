import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp, faMessage, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';


const Post = ({ postDetail, refetch }) => {

    const [likeStatus, setLikeStatus] = useState(false);
    const [comment, setComment] = useState(false);
    const [postComment, setPostComment] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const commentRef = useRef('');
    let { _id, name, picture, post, likes, comments } = postDetail;
    let newLikes;
    let updatedPost;

    if (loading) {
        return <Loading></Loading>
    }

    // if (comments.length >= 1) {
    //     setPostComment(true);
    // }

    // if (likes.includes(user.email)) {
    //     setLikeStatus(true);
    // }

    // if (likes.length >= 1) {
    //     for (let i of likes) {
    //         if (i === user.email) {
    //             console.log(i)
    //             setLikeStatus(true);
    //             break;
    //         }
    //         else {
    //             setLikeStatus(false);
    //         }
    //     }
    // }

    const handleLike = () => {

        const userEmail = user.email;

        if (likes.length >= 1) {
            for (let i of likes) {
                if (i === user.email) {
                    newLikes = likes.filter(like => like !== userEmail);
                    likes = newLikes;
                    updatedPost = { ...postDetail, likes };
                    setLikeStatus(false);
                }
                else {
                    likes.push(userEmail);
                    updatedPost = { ...postDetail, likes };
                    console.log(updatedPost)
                    setLikeStatus(true);
                }
            }
        }
        else {
            likes.push(userEmail);
            updatedPost = { ...postDetail, likes };
            console.log(updatedPost)
            setLikeStatus(true);
        }


        fetch(`http://localhost:5000/post/like/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log('data ', data);

            })
    }

    const handleComment = () => {
        if (comment) {
            setComment(false);
        }
        else {
            setComment(true);
        }
    }

    const handlePostComment = (event) => {

        event.preventDefault();
        const commentText = commentRef.current.value;

        const commentDetail = {
            commenterName: user.displayName,
            commenterEmail: user.email,
            commenterImage: user.photoURL,
            comment: commentText
        }

        comments.push(commentDetail);

        updatedPost = { ...postDetail, comments };
        console.log(updatedPost);

        // send comment data to database
        fetch(`http://localhost:5000/post/comment/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                console.log('data ', data);

            })

        commentRef.current.value = '';
    }


    return (
        <div className=" w-96 bg-base-100 my-8 ">
            <div className='mb-2'>
                <div className='flex'>
                    <div className="avatar ">
                        {picture && <div className="w-8 rounded-full">
                            <img src={picture} />
                        </div>}
                        {!picture && <div className="w-8 rounded-full">
                            <FontAwesomeIcon className='w-6 mr-1' icon={faUser} />
                        </div>}
                    </div>
                    <h2 className="text-xl font-bold ml-2">{name}</h2>
                </div>
                <p className='my-2'>{post}</p>
                <hr />
                <div className='flex justify-between mt-2 '>
                    <div onClick={handleLike} className={`${likes.includes(user.email) ? 'text-primary' : 'text-black'} flex items-center`}>
                        <FontAwesomeIcon className='w-6 mr-1' icon={faThumbsUp} />
                        <span>Like</span>
                    </div>
                    <div onClick={handleComment} className=' flex  items-center'>
                        <FontAwesomeIcon className='w-6 mr-1' icon={faMessage} />
                        <span>Comment</span>
                    </div>
                </div>

            </div>



            {/* write comment */}
            {comment &&
                <div>
                    <div>
                        {comments.length > 0 &&

                            <div>
                                {
                                    comments.map(com =>
                                        <div className='flex items-center ml-4 mb-2'
                                            key={Math.random()}
                                        >
                                            <div className="avatar ">
                                                {com.commenterImage && <div className="w-6 rounded-full">
                                                    <img src={com.commenterImage} alt="" />
                                                </div>}
                                                {!com.commenterImage && <div className="w-6 rounded-full">
                                                    <FontAwesomeIcon className='w-6 mr-1' icon={faUser} />
                                                </div>}
                                            </div>
                                            <div className='ml-2 mt-4'>
                                                <h2 className="text-sm font-bold">{com.commenterName}</h2>
                                                <p >{com.comment}</p>
                                            </div>
                                        </div>
                                    )

                                }
                            </div>

                        }
                    </div>


                    <div className='flex pt-2 mb-4 sm:px-3 items-center' >
                        <div className=' '>
                            <div className="avatar online mr-5">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photoURL} alt="" />
                                </div>
                            </div>
                        </div>
                        <input ref={commentRef} type="text" name='comment' placeholder="write a comment" className="input input-bordered input-primary w-full max-w-xs" />
                        <FontAwesomeIcon onClick={handlePostComment} className='w-6 ml-1' icon={faPaperPlane} />

                    </div>
                </div>
            }

            <div className=' border-t-4 border-gray-700'></div>

        </div>
    );
};

export default Post;