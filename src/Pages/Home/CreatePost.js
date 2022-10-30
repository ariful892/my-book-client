import React, { useRef } from 'react';

const CreatePost = () => {

    const postRef = useRef('');

    const handlePost = (event) => {

        const post = event.target.email.value;

        console.log(post);

        // send review to database
        // fetch('https://frozen-gorge-46569.herokuapp.com/part', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(post)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             console.log('Post successfully done');
        //             // toast.success('Product is added');
        //             // reset();
        //         }
        //         else (
        //             console.log('Failed to post')
        //             // toast.error('Failed to add')
        //         )
        //     })
    }

    return (
        <div className=' mx-24'>
            <form className='flex pt-8 sm:px-3' onSubmit={handlePost}>
                <div className=' h-24 '>
                    <div className="avatar online mr-5">
                        <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                </div>
                <textarea ref={postRef} type="text" name="email" placeholder="What's on your mind?" className="input input-bordered input-primary w-full h-20 max-w-xs" />

                <input className="btn btn-primary btn-sm ml-5" type="submit" value="Login" />
            </form>
            <hr />
        </div>
    );
};

export default CreatePost;