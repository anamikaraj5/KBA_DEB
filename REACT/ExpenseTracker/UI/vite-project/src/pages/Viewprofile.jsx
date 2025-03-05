import React from 'react';
import { Link } from 'react-router-dom';
import useProfile from '../hooks/Userprofile.js'; // Using the custom hook
import Nav from '../components/Nav.jsx';
import Sidebar from '../components/Sidebar.jsx';

const Viewprofile = () => {
    const { profile } = useProfile(); // Fetching profile using the hook

    return (
        <div className="bg-gray-100 min-h-screen">
            <Nav />

            <div className="md:flex">
                <Sidebar />

                <div className="mt-[50px] md:ml-[550px]">
                    <p className="md:text-7xl text-5xl text-purple-950 font-bold text-center">
                        Profile
                    </p>

                    <div className="flex flex-col md:gap-10 gap-5 text-2xl md:text-3xl text-purple-950 
                        mt-[50px]  p-6 bg-purple-300 border-[10px] border-purple-900 
                        shadow-lg shadow-purple-600 md:w-[550px] h-auto min-h-[200px] md:min-h-[350px] md:px-[30px] md:py-[40px]">

                        {profile ? (
                            <>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Name:</p>
                                    <p>{profile.fullname}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Email:</p>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Phone:</p>
                                    <p>{profile.phone}</p>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="flex gap-10 justify-center mt-10">
                        <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl  
                            border-4 border-purple-950 hover:bg-purple-400">
                            <Link to="/home">CANCEL</Link>
                        </button>
                        <button className="h-[50px] w-[130px] rounded-lg text-center text-purple-950 text-xl  
                            border-4 border-purple-950 hover:bg-purple-400">
                            <Link to="/editprofile">EDIT</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewprofile;

