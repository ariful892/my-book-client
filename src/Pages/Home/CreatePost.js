import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const CreatePost = ({ refetch }) => {

    const postRef = useRef('');
    const [user, loading, error] = useAuthState(auth);

    const errorMessage = () => {
        <div className="alert alert-success">
            <div>
                <span>Failed to post</span>
            </div>
        </div>
    }
    const successMessage = () => {
        <div className="alert alert-success">
            <div>
                <span>Post successfully done</span>
            </div>
        </div>
    }

    const handlePost = (event) => {

        event.preventDefault();
        const postText = event.target.post.value;

        const postDetail = {
            name: user.displayName,
            email: user.email,
            post: postText,
            picture: user.photoURL,
            likes: [],
            comments: []
        }

        console.log(postDetail);

        // send review to database
        fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(postDetail)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    refetch();
                    successMessage()
                }
                else (
                    errorMessage()
                )
            })
    }

    return (
        <div className=' mx-24'>
            <form className='flex pt-8 sm:px-3' onSubmit={handlePost}>
                <div className=' h-24 '>
                    <div className="avatar online mr-5">
                        {user?.photoURL && <div className="w-8 rounded-full">
                            <img src={user?.photoURL} />
                        </div>}
                        {!user?.photoURL && <div className="w-8 rounded-full">
                            <FontAwesomeIcon className='w-6 mr-1' icon={faUser} />
                        </div>}
                    </div>
                </div>
                <textarea type="text" name="post" placeholder="What's on your mind?" className="input input-bordered input-primary w-full h-20 max-w-xs" />

                <input className="btn btn-primary btn-sm ml-5" type="submit" value="Post" />
            </form>
            <hr />
        </div>
    );
};

export default CreatePost;