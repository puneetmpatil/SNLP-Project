import { useState, useEffect } from 'react';
import { close, logo } from '../assets';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            setIsLoggedIn(true);
        }
    }, [])

    const handleClick = () =>{
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/")
        
    }

    return (
        <header className="bg-black">
            <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
                <span className='flex items-center'><img src={logo} width={76} height={76} alt="logo" />
                <h1 className='text-2xl font-bold sm:text-3xl'>MeetMeBot</h1></span>
                {/* <FiMenu className="lg:hidden block h-3 w-6 cursor-pointer" onClick={() => setOpen(!open)} /> */}
                <img src={close} className="lg:hidden block h-3 w-6 cursor-pointer" onClick={() => setOpen(!open)}  />
                <nav className={`lg:flex lg:items-center lg:w-auto w-full ${open ? "block" : "hidden"} mt-5 lg:mt-0`}>
                    <ul className="text-base text-gray-600 lg:flex lg:justify-center text-center">
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-white font-semibold" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-white font-semibold" to="/about">About</Link>
                        </li>
                        <li>
                            <Link className="lg:px-5 py-2 block hover:text-white font-semibold" to="/contact">Contact</Link>
                        </li>
                        {isLoggedIn ? 
                            <>
                                <li>
                                    <Link className="lg:px-5 py-2 block hover:text-white font-semibold" to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link className="lg:px-3 py-2 block bg-blue-700 text-white rounded-xl font-semibold" onClick={handleClick}>Logout</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link className="lg:px-5 py-2 block hover:text-white font-semibold" to="/signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link className="lg:px-3 py-2 block hover:bg-white border hover:text-black border-white text-white rounded-xl font-semibold" to="signup">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;