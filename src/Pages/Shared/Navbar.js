import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../assets/icons/house-chimney-solid.svg'
import notification from '../../assets/icons/bell-solid.svg'
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const [user, loading, error] = useAuthState(auth);

    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <div className="navbar bg-base-200 sticky px-2 lg:px-8 pb-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content  mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                        <li ><Link to={'/'}><label className="">
                            <div className=" btn btn-ghost">
                                Home
                            </div>
                        </label></Link></li>
                        <li ><Link to={'/profile'}><label className="">
                            <div className=" btn btn-ghost">
                                Profile
                            </div>
                        </label></Link></li>

                        <li><Link to={'/notification'}><label className="">
                            <div className=" btn btn-ghost">
                                Notification
                            </div>
                        </label></Link></li>
                    </ul>

                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl">my<span className='text-primary'>Book</span></Link>
            </div>
            <div className='navbar-end pl-5 flex items-center'>
                <div className=" hidden  lg:flex ">
                    <ul className="menu menu-horizontal  ">
                        <li ><Link to={'/'}><label className="">
                            <div className="   rounded-full ">
                                <img className="w-6" src={home} alt="" />
                            </div>
                        </label></Link></li>

                        <li><Link to={'/notification'}><label className="">
                            <div className=" rounded-full">
                                <img className="w-6" src={notification} alt="" />
                            </div>
                        </label></Link></li>
                        <li>
                            <Link to={'/profile'}>
                                <label className="avatar">
                                    {user?.photoURL && <div className="w-8 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>}
                                    {!user?.photoURL && <div className="w-8 rounded-full">
                                        <FontAwesomeIcon className='w-6 mr-1' icon={faUser} />
                                    </div>}

                                </label>
                            </Link>
                        </li>
                        <li className='list-none'>{user ?
                            <button onClick={handleSignOut} className="btn btn-ghost text-red-500">Signout</button>
                            :
                            <Link className='text-primary' to='/login'>Login</Link>
                        }</li>
                    </ul>

                </div>



            </div>

        </div>
    );
};

export default Navbar;